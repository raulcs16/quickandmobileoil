export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  apt?: string;
};

export type CarInfo = {
  vin: string;
  make: string;
  model: string;
  year: number;
  cylinders: number;
};

export type OilInfo = {
  type: string;
  liters: number;
  current_mileage?: number;
  service_mileage?: number;
};

export type Customer = {
  name: string;
  phone: string;
};

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Availability = {
  day: Day;
  time: string;
};

export enum ServiceStatus {
  Unsheduled = "Unscheduled",
  Scheduled = "Scheduled",
  Declined = "Declined",
  Completed = "Completed",
}

export type OilServiceRequest = {
  address: Address;
  carInfo: CarInfo;
  customer: Customer;
  availability: string[]; //to be parsed
};

export type OilServiceRecord = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: ServiceStatus;
  carInfo: CarInfo;
  oilInfo: OilInfo;
  customer: Customer;
  location: Address;
  availability: string[];
  scheduledFor: Date | null;
};
