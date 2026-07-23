// index.ts
import express from "express";

// ../../packages/firebase/admin.ts
import admin from "firebase-admin";
import { getApps } from "firebase-admin/app";
import { onRequest } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";
if (!getApps().length) {
  if (process.env.NODE_ENV === "development") {
    process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "demo-project"
    });
  } else {
    admin.initializeApp();
  }
}

// index.ts
import cors from "cors";

// ../../packages/core/oilservice/useCases.ts
var ProcessOilServiceRequest = class {
  m_repo;
  m_notifier;
  constructor(repo, notifier2) {
    this.m_repo = repo;
    this.m_notifier = notifier2;
  }
  async execute(request) {
    const date = new Date(Date.now());
    let record = {
      id: (-Date.now()).toString(),
      createdAt: date,
      updatedAt: date,
      status: "Unscheduled" /* Unsheduled */,
      carInfo: request.carInfo,
      oilInfo: {
        type: "",
        liters: 0,
        current_mileage: 0,
        service_mileage: 0
      },
      customer: request.customer,
      location: request.address,
      availability: request.availability,
      scheduledFor: null
    };
    const id = await this.m_repo.saveRecord(record);
    const mapAddressQuery = `${record.location.street}, ${record.location.city}, ${record.location.state} ${record.location.zip}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddressQuery)}`;
    const searchQuery = `${record.carInfo.year} ${record.carInfo.make} ${record.carInfo.model} ${record.carInfo.cylinders || ""} cylinder oil type`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    const messageBody = [
      `\u{1F6E0}\uFE0F <b>NEW LEAD: Oil Service</b>`,
      `\u{1F464} <b>CUSTOMER:</b>`,
      `${record.customer.name}`,
      `${record.customer.phone}`,
      `
\u{1F4CD} <b>LOCATION:</b>`,
      `<a href="${googleMapsUrl}">${record.location.street}${record.location.apt ? `, ${record.location.apt}` : ""}, ${record.location.city}, ${record.location.state} ${record.location.zip}</a>`,
      `
\u{1F697} <b>VEHICLE:</b>`,
      ` ${record.carInfo.year} ${record.carInfo.make} ${record.carInfo.model}`,
      `VIN: <code>${record.carInfo.vin}</code>`,
      // Wrapping in <code> makes it easy to copy-paste with one tap
      record.carInfo.cylinders ? `Engine: ${record.carInfo.cylinders} Cylinders` : null,
      `
\u{1F4C5} <b>AVAILABILITY:</b>`,
      ...record.availability.map((slot) => `\u2022 ${slot}`),
      `
\u{1F50D} <b>Oil Search:</b>`,
      `<a href="${googleSearchUrl}">Google Oil Type</a>`
    ].filter(Boolean).join("\n");
    const success = await this.m_notifier.notify(messageBody);
    let message = "success";
    if (!success) message = "notification failed";
    return { ok: success, recordId: id, message };
  }
};

// ../../packages/firebase/oil_service_repo.ts
var FSOilServiceRepo = class {
  m_fireStore;
  m_collection = "oil_service";
  constructor(store) {
    this.m_fireStore = store;
  }
  async saveRecord(record) {
    const doc = this.m_fireStore.collection(this.m_collection).doc();
    record.id = doc.id;
    await doc.set(record);
    return record.id;
  }
  getRecordByStatus(status) {
    throw new Error("Method not implemented.");
  }
  getRecordsByCreatedDate(date) {
    throw new Error("Method not implemented.");
  }
  updateRecord(id, updates) {
    throw new Error("Method not implemented.");
  }
};

// ../../packages/core/notification/telegram.ts
var TelegramNotifier = class {
  m_token;
  m_chatId;
  m_url;
  constructor(token2, chatId2) {
    this.m_token = token2;
    this.m_chatId = chatId2;
    this.m_url = `https://api.telegram.org/bot${token2}/sendMessage`;
  }
  async notify(message) {
    const response = await fetch(this.m_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: this.m_chatId,
        text: message,
        parse_mode: "HTML"
      })
    });
    return response.ok;
  }
};

// controllers/oil-service-controller.ts
var OilServiceController = class {
  m_processOilRequestUseCase;
  constructor(processOilRequestUseCase) {
    this.m_processOilRequestUseCase = processOilRequestUseCase;
  }
  async processOilRequest(req, res) {
    try {
      const oilServiceRequest = req.body;
      const response = await this.m_processOilRequestUseCase.execute(oilServiceRequest);
      if (response.ok) {
        res.status(201).json({ message: "form submitted!" });
      } else {
        res.status(404).json({ message: response.message });
      }
    } catch (error) {
      console.error("\u274C Error processing booking route:", error);
      return res.status(500).json({
        error: "Internal server error occurred while processing your request."
      });
    }
  }
};

// container.ts
var token = process.env.TELEGRAM_BOT_TOKEN || "";
var chatId = process.env.TELEGRAM_CHAT_ID || "";
var fireStore = getFirestore();
var oilRepo = new FSOilServiceRepo(fireStore);
var notifier = new TelegramNotifier(token, chatId);
var processOilServiceUseCase = new ProcessOilServiceRequest(
  oilRepo,
  notifier
);
var oilServiceController = new OilServiceController(processOilServiceUseCase);
var container = {
  oilServiceController
};

// index.ts
var app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
  })
);
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express + Firebase!");
});
app.post(
  "/oil-form",
  (req, res) => container.oilServiceController.processOilRequest(req, res)
);
var PORT = process.env.PORT || 8001;
if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(
      `\u{1F680} Standalone Express server running locally at http://localhost:${PORT}`
    );
  });
}
var api = onRequest({ cors: true, invoker: "public" }, app);
export {
  api
};
