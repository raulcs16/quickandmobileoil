"use client";

import { useState } from "react";

interface CarInputProps {
  onComplete: () => void;
}

export default function CarInput(props: CarInputProps) {
  const [searchReady, setSearchReady] = useState(false);
  const [confirmReady, setConfirmReady] = useState(false);
  const [vin, setVin] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  function resetAll() {
    setSearchReady(false);
    setConfirmReady(false);
    setVin("");
    setYear("");
    setMake("");
    setModel("");
  }
  function updateVin(text: string) {
    setVin(text);
    setSearchReady(text.length === 17);
    setConfirmReady(false);
  }
  async function decodeVIN() {
    if (vin.length !== 17) return;
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const make = data.Results[7].Value;
    const model = data.Results[9].Value;
    const year = data.Results[10].Value;
    const cyclinders = data.Results[25].Value;
    if (!make || !model || !year || !cyclinders) {
      return;
    }
    setYear(year);
    setModel(model);
    setMake(make);
    setSearchReady(false);
    setConfirmReady(true);
  }
  return (
    <div className="w-full max-w-md mx-auto space-y-5 p-5 rounded-2xl bg-bg-light border border-border shadow-primary">
      {/* VIN Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium tracking-wide text-secondary uppercase block">
          Enter your vehicle's VIN
        </label>
        <input
          type="text"
          name="car.vin"
          placeholder="Enter 17-digit VIN"
          className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans"
          value={vin}
          onChange={(e) => updateVin(e.currentTarget.value)}
        />
      </div>

      <button
        type="button"
        disabled={!searchReady}
        className={`w-full mt-2 px-4 py-3 rounded-xl
            ${
              searchReady
                ? "bg-blue-600 hover:bg-blue-500 active:scale-[0.99] shadow-md hover:shadow-lg transition-all duration-150"
                : "bg-blue-600/50"
            }
              text-white font-sans font-medium text-sm tracking-wide  cursor-pointer`}
        onClick={() => decodeVIN()}
      >
        Search Vehicle
      </button>

      {/* Hidden Fields Panel */}
      <div className="flex gap-3 flex-wrap text-sm">
        <input
          placeholder="yyyy"
          type="text"
          disabled={true}
          name="car.year"
          className="bg-bg-dark w-[6ch] py-1 px-2"
          value={year}
        />
        <input
          placeholder="make"
          type="text"
          disabled={true}
          name="car.make"
          className="bg-bg-dark w-[10ch] py-1 px-2"
          value={make}
        />
        <input
          placeholder="model"
          type="text"
          disabled={true}
          name="car.model"
          className="bg-bg-dark w-[10ch] py-1 px-2"
          value={model}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          disabled={!confirmReady}
          onClick={() => resetAll()}
          className={`p-2 border-2 rounded-lg w-[10ch]
            ${confirmReady ? "bg-red-600" : "bg-red-500/50"}
            text-primary border-bg-light`}
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => props.onComplete()}
          disabled={!confirmReady}
          className={`p-2 border-2 rounded-lg w-[10ch]
            ${confirmReady ? "bg-green-600" : "bg-green-500/50"}
            text-primary border-bg-light`}
        >
          Confrim
        </button>
      </div>
    </div>
  );
}
