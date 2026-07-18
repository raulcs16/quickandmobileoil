export interface ServiceBookingPayload {
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    apt?: string;
  };
  car: {
    vin: string;
    make: string;
    model: string;
    year: string;
    cylinders?: string;
  };
  contact: {
    name: string;
    phone: string;
  };
  availability: {
    slots: string[];
  };
}
