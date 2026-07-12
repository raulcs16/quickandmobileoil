import { useEffect, useState } from "react";

interface AddressInputProps {
  onCompleted: (state: boolean) => void;
}

export default function AddressInput(props: AddressInputProps) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    let completed = true;
    if (street === "") completed = false;
    else if (city === "") completed = false;
    else if (state === "") completed = false;
    else if (zip === "" || zip.length !== 5) completed = false;
    props.onCompleted(completed);
  }, [street, city, state, zip]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-5 rounded-2xl bg-bg-light border border-border shadow-primary text-left">
      <h2 className="text-sm font-semibold tracking-wide text-primary mb-2">
        Address Where Car Will Be Serviced At
      </h2>

      {/* Street & Apt Field Row */}
      <div className="flex gap-3">
        <div className="flex-3 space-y-1.5">
          <label className="text-xs font-medium text-secondary uppercase tracking-wide block">
            Street Address
          </label>
          <input
            type="text"
            name="address.street"
            autoComplete="address-line1"
            placeholder="123 Main St"
            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans"
            value={street}
            onChange={(e) => setStreet(e.currentTarget.value)}
          />
        </div>

        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-medium text-secondary uppercase tracking-wide block">
            Apt / Suite
          </label>
          <input
            type="text"
            name="address.apt"
            autoComplete="address-line2"
            placeholder="Apt 4B"
            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans"
          />
        </div>
      </div>

      {/* City Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-secondary uppercase tracking-wide block">
          City
        </label>
        <input
          type="text"
          name="address.city"
          autoComplete="address-level2"
          placeholder="New York"
          className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
        />
      </div>

      {/* State & Zip Code Row */}
      <div className="flex gap-3">
        <div className="w-1/2 space-y-1.5">
          <label className="text-xs font-medium text-secondary uppercase tracking-wide block">
            State
          </label>
          <input
            type="text"
            name="address.state"
            autoComplete="address-level1"
            placeholder="NY"
            maxLength={2} // Keeps it to 2-letter state codes
            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans uppercase"
            value={state}
            onChange={(e) => setState(e.currentTarget.value)}
          />
        </div>

        <div className="w-1/2 space-y-1.5">
          <label className="text-xs font-medium text-secondary uppercase tracking-wide block">
            ZIP Code
          </label>
          <input
            type="text"
            name="address.zip"
            autoComplete="postal-code"
            placeholder="10001"
            maxLength={5}
            className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans"
            value={zip}
            onChange={(e) => setZip(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
}
