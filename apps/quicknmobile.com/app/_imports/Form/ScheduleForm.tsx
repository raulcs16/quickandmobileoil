"use client";

import { useState } from "react";
import CarInput from "./CarInput";
import AddressInput from "./AddressInput";
import ContactInput from "./ContactInput";
import { ServiceBookingPayload } from "@repo/core/oilservice";
import DateSelectionStep from "./DateSelectionStep";
import SubmittedCard from "./SubmittedCard";

const STEPS = ["Location", "VIN", "Availability", "Contact"];

interface ScheduleFormProps {}
export default function ScheduleForm(props: ScheduleFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [nextAllowed, setNextAllowed] = useState(false);
  const [prevAllowed, setPrevAllowed] = useState(false);
  const [section, setSection] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);

  function nextSection() {
    setSection(section + 1);
    setNextAllowed(false);
    setPrevAllowed(true);
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setCanSubmit(false);
    const formData = new FormData(event.currentTarget);
    const selectedTimeSlots = formData.getAll("slots").map((s) => s.toString());
    if (selectedTimeSlots.length === 0) {
      console.error("No Slots Detected!");
    }
    const payload: ServiceBookingPayload = {
      address: {
        street: formData.get("address.street")?.toString() || "",
        city: formData.get("address.city")?.toString() || "",
        state: formData.get("address.state")?.toString() || "",
        zip: formData.get("address.zip")?.toString() || "",
        apt: formData.get("address.apt")?.toString() || "",
      },
      car: {
        vin: formData.get("car.vin")?.toString() || "",
        make: formData.get("car.make")?.toString() || "",
        model: formData.get("car.model")?.toString() || "",
        year: formData.get("car.year")?.toString() || "",
        cylinders: formData.get("car.cylinders")?.toString() || "",
      },
      contact: {
        name: formData.get("contact.name")?.toString() || "",
        phone: formData.get("contact.phone")?.toString() || "",
      },
      availability: {
        slots: selectedTimeSlots,
      },
    };
    const res = await fetch("http://localhost:8000/oil-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.error);
    } else {
      setSubmitted(true);
    }
  }
  if (submitted) return <SubmittedCard></SubmittedCard>;
  else
    return (
      <form className="space-y-6" onSubmit={(event) => handleSubmit(event)}>
        <FormProgress currentStep={section} steps={STEPS} />
        <AddressInput
          step={0}
          currentStep={section}
          onCompleted={(state) => setNextAllowed(state)}
        ></AddressInput>
        <CarInput
          step={1}
          currentStep={section}
          onComplete={() => setNextAllowed(true)}
        ></CarInput>
        <DateSelectionStep
          step={2}
          currentStep={section}
          onComplete={(state) => {
            setNextAllowed(state);
          }}
        ></DateSelectionStep>
        <ContactInput
          step={3}
          currentStep={section}
          onComplete={(state) => setCanSubmit(state)}
        ></ContactInput>

        <div className="flex w-full justify-between">
          <button
            type="button"
            onClick={() => setSection(section - 1)}
            disabled={!prevAllowed}
            className={`${
              prevAllowed ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50"
            } text-primary font-bold py-4 rounded-xl shadow-md transition-all mt-4 px-2 w-[10ch]`}
          >
            Previous
          </button>
          <button
            type="button"
            hidden={!(section < STEPS.length - 1)}
            disabled={!nextAllowed}
            onClick={() => nextSection()}
            className={`${
              nextAllowed ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50"
            } text-primary font-bold py-4 rounded-xl shadow-md transition-all mt-4 px-2 w-[10ch]`}
          >
            Next
          </button>
          <button
            disabled={!canSubmit}
            hidden={!(section === STEPS.length - 1)}
            type="submit"
            className={`${
              canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50"
            } text-primary font-bold py-4 rounded-xl shadow-md transition-all mt-4 px-2 w-[10ch]`}
          >
            Submit
          </button>
        </div>
      </form>
    );
}
interface FormProgressProps {
  currentStep: number;
  steps: string[];
}

export function FormProgress({ currentStep, steps }: FormProgressProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6 px-2">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-3.5 h-0.5 w-full bg-border -z-10" />
        <div
          className="absolute left-0 top-3.5 h-0.5 bg-blue-600 -z-10 transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center flex-1 group">
              {/* Node Indicator Dot */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono border transition-all duration-300 ${
                  isCompleted
                    ? "bg-blue-600 border-blue-700 text-white"
                    : isActive
                      ? "bg-bg-dark border-blue-500 text-primary ring-4 ring-blue-500/20"
                      : "bg-bg-dark border-border text-secondary"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              {/* Optional Step Text Label Below */}
              <span
                className={`text-[10px] font-medium tracking-wide mt-1.5 uppercase select-none transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-secondary/60"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
