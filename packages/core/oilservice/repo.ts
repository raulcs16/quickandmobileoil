import { OilServiceRecord, ServiceStatus } from "./types";

export default interface OilServiceRepo {
  saveRecord(record: OilServiceRecord): Promise<string>;
  getRecordByStatus(status: ServiceStatus): Promise<OilServiceRecord[]>;
  getRecordsByCreatedDate(date: Date): Promise<OilServiceRecord[]>;
  updateRecord(
    id: string,
    updates: Partial<OilServiceRecord>
  ): Promise<boolean>;
}
