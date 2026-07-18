import express, { Application, Request, Response } from "express";
import { admin, onRequest } from "../../packages/firebase/admin";
import { ServiceBookingPayload } from "../../packages/core/oilservice";
import cors from "cors";

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express + Firebase!");
});
app.post("/oil-form", async (req: Request, res: Response) => {
  try {
    const payload = req.body as ServiceBookingPayload;

    const { address, car, contact, availability } = payload;

    if (!contact?.name || !contact?.phone) {
      return res
        .status(400)
        .json({ error: "Missing contact name or phone number." });
    }
    if (!car?.vin || !car?.make || !car?.model) {
      return res.status(400).json({
        error: "Missing essential vehicle specifications (VIN, Make, Model).",
      });
    }
    if (!address?.street || !address?.zip) {
      return res
        .status(400)
        .json({ error: "A valid street address and ZIP code are required." });
    }
    if (!availability?.slots || availability.slots.length === 0) {
      return res
        .status(400)
        .json({ error: "Please select at least one available time slot." });
    }

    const cleanedBooking = {
      address: {
        street: address.street.trim(),
        city: address.city?.trim() || "Unknown City", // Fallback for empty city input
        state: address.state.trim().toUpperCase(),
        zip: address.zip.trim(),
        apt: address.apt?.trim() || "",
      },
      car: {
        vin: car.vin.trim().toUpperCase(),
        make: car.make.trim().toUpperCase(),
        model: car.model.trim().toUpperCase(),
        year: parseInt(car.year, 10),
        cylinders: car.cylinders ? parseInt(car.cylinders, 10) : null,
      },
      contact: {
        name: contact.name.trim(),
        phone: contact.phone.replace(/\D/g, ""), // Strips non-digits from phone number
      },
      availability: {
        slots: availability.slots, // E.g. ['TUE-3am-6pm', 'WED-8am-12pm']
      },
      status: "pending", // System workflow state
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Firestore database server time
    };
    const mapAddressQuery = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddressQuery)}`;

    // 2. Format your Google Search Query
    const searchQuery = `${car.year} ${car.make} ${car.model} ${car.cylinders || ""} cylinder oil type`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    // 3. Build the Message Body using HTML Tags
    const messageBody = [
      `🛠️ <b>NEW LEAD: Oil Service</b>`,
      `-------------------------`,
      `👤 <b>CUSTOMER:</b>`,
      `•${contact.name}`,
      `•${contact.phone}`, // Telegram automatically hyperlinks standard phone numbers
      `\n📍 <b>LOCATION:</b>`,
      `• <a href="${googleMapsUrl}">${address.street}${address.apt ? `, ${address.apt}` : ""}, ${address.city}, ${address.state} ${address.zip}</a>`,
      `\n🚗 <b>VEHICLE:</b>`,
      `• ${car.year} ${car.make} ${car.model}`,
      `• VIN: <code>${car.vin}</code>`, // Wrapping in <code> makes it easy to copy-paste with one tap
      car.cylinders ? `• Engine: ${car.cylinders} Cylinders` : null,
      `\n📅 <b>AVAILABILITY:</b>`,
      ...availability.slots.map((slot) => `• ${slot}`),
      `\n🔍 <b>Oil Search:</b>`,
      `•<a href="${googleSearchUrl}">${car.year} ${car.make} ${car.model} Oil Type</a>`,
    ]
      .filter(Boolean)
      .join("\n");

    if (!token || !chatId) {
      throw new Error("Missing Telegram environment variables.");
    }

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageBody,
        parse_mode: "HTML",
      }),
    });
    if (response.ok) {
      res.status(201).json({
        createdAt: cleanedBooking.createdAt,
        message: "Your Booking has been added to the Queue",
      });
    } else {
      throw new Error("Telegram Error");
    }
  } catch (error) {
    console.error("❌ Error processing booking route:", error);
    return res.status(500).json({
      error: "Internal server error occurred while processing your request.",
    });
  }
});

app.get("/health", async (req: Request, res: Response) => {
  try {
    const collections = await admin.firestore().listCollections();
    res.json({ status: "healthy", collectionsCount: collections.length });
  } catch (error) {
    res.status(500).json({ error: "Database unreachable" });
  }
});

const PORT = process.env.PORT || 8001;

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(
      `🚀 Standalone Express server running locally at http://localhost:${PORT}`
    );
  });
}

export const api = onRequest({ cors: true, invoker: "public" }, app);
