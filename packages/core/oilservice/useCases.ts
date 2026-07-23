import { Notifier } from "../notification/types";
import OilServiceRepo from "./repo";
import { OilServiceRecord, OilServiceRequest, ServiceStatus } from "./types";

export type ProcessOilServiceResponse = {
  ok: boolean;
  recordId: string;
  message: string;
};
export class ProcessOilServiceRequest {
  private m_repo: OilServiceRepo;
  private m_notifier: Notifier;
  constructor(repo: OilServiceRepo, notifier: Notifier) {
    this.m_repo = repo;
    this.m_notifier = notifier;
  }
  public async execute(
    request: OilServiceRequest
  ): Promise<ProcessOilServiceResponse> {
    //validte request
    const date = new Date(Date.now());
    let record: OilServiceRecord = {
      id: (-Date.now()).toString(),
      createdAt: date,
      updatedAt: date,
      status: ServiceStatus.Unsheduled,
      carInfo: request.carInfo,
      oilInfo: {
        type: "",
        liters: 0,
        current_mileage: 0,
        service_mileage: 0,
      },
      customer: request.customer,
      location: request.address,
      availability: request.availability,
      scheduledFor: null,
    };
    const id = await this.m_repo.saveRecord(record);
    const mapAddressQuery = `${record.location.street}, ${record.location.city}, ${record.location.state} ${record.location.zip}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddressQuery)}`;

    const searchQuery = `${record.carInfo.year} ${record.carInfo.make} ${record.carInfo.model} ${record.carInfo.cylinders || ""} cylinder oil type`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    const messageBody = [
      `🛠️ <b>NEW LEAD: Oil Service</b>`,
      `👤 <b>CUSTOMER:</b>`,
      `${record.customer.name}`,
      `${record.customer.phone}`,
      `\n📍 <b>LOCATION:</b>`,
      `<a href="${googleMapsUrl}">${record.location.street}${record.location.apt ? `, ${record.location.apt}` : ""}, ${record.location.city}, ${record.location.state} ${record.location.zip}</a>`,
      `\n🚗 <b>VEHICLE:</b>`,
      ` ${record.carInfo.year} ${record.carInfo.make} ${record.carInfo.model}`,
      `VIN: <code>${record.carInfo.vin}</code>`, // Wrapping in <code> makes it easy to copy-paste with one tap
      record.carInfo.cylinders
        ? `Engine: ${record.carInfo.cylinders} Cylinders`
        : null,
      `\n📅 <b>AVAILABILITY:</b>`,
      ...record.availability.map((slot) => `• ${slot}`),
      `\n🔍 <b>Oil Search:</b>`,
      `<a href="${googleSearchUrl}">Google Oil Type</a>`,
    ]
      .filter(Boolean)
      .join("\n");
    const success = await this.m_notifier.notify(messageBody);
    let message = "success";
    if (!success) message = "notification failed";

    return { ok: success, recordId: id, message };
  }
}
