"use client";

import { useEffect, useState } from "react";
import DateTimeSlots from "./DateTimeSlots";
import CarInput from "./CarInput";
import AddressInput from "./AddressInput";
import ContactInput from "./ContactInput";

const STEPS = ["Location", "VIN", "Availability", "Contact"];

interface ScheduleFormProps {}
export default function ScheduleForm(props: ScheduleFormProps) {
  const [nextAllowed, setNextAllowed] = useState(false);
  const [prevAllowed, setPrevAllowed] = useState(false);
  const [section, setSection] = useState(0);

  // function nextSection() {
  //   setSection(section + 1);
  //   setPrevAllowed(true);
  // }
  // useEffect(() => {
  //   setNextAllowed(false);
  //   if (section <= 0) setPrevAllowed(false);
  // }, [section]);
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const address = {
      street: formData.get("address.street")?.toString(),
      city: formData.get("address.city")?.toString(),
      state: formData.get("address.state")?.toString(),
      zip: formData.get("address.zip")?.toString(),
      apt: formData.get("address.apt")?.toString(),
    };
    const car = {
      vin: formData.get("car.vin")?.toString(),
      make: formData.get("car.make")?.toString(),
      model: formData.get("car.model")?.toString(),
      year: formData.get("car.year")?.toString(),
    };
    const contact = {
      name: formData.get("contact.name")?.toString(),
      phone: formData.get("contact.phone")?.toString(),
    };
    console.log({
      address,
      car,
      contact,
    });
  }
  return (
    <form className="space-y-6" onSubmit={(event) => handleSubmit(event)}>
      {/* <FormProgress currentStep={section} steps={STEPS} /> */}
      <AddressInput
        onCompleted={(state) => setNextAllowed(state)}
      ></AddressInput>
      <CarInput onComplete={() => setNextAllowed(true)}></CarInput>
      <div>
        <label>Select Your Availability</label>
        <DateTimeSlots
          onComplete={(state) => setNextAllowed(state)}
          days={["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"]}
          timeslots={[
            { start: { hour: 8, ampm: "am" }, end: { hour: 12, ampm: "pm" } },
            { start: { hour: 12, ampm: "pm" }, end: { hour: 3, ampm: "pm" } },
            { start: { hour: 3, ampm: "am" }, end: { hour: 6, ampm: "pm" } },
          ]}
        ></DateTimeSlots>
      </div>
      <ContactInput></ContactInput>

      {/* <div className="flex w-full justify-between">
        <button
          type="button"
          onClick={() => setSection(section - 1)}
          disabled={!prevAllowed}
          className={`${
            nextAllowed ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50"
          } text-primary font-bold py-4 rounded-xl shadow-md transition-all mt-4 px-2 w-[10ch]`}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!nextAllowed}
          onClick={() => nextSection()}
          className={`${
            nextAllowed ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600/50"
          } text-primary font-bold py-4 rounded-xl shadow-md transition-all mt-4 px-2 w-[10ch]`}
        >
          Next
        </button>
      </div> */}
      <button type="submit" className="w-full p-2 bg-blue-600">
        Submit
      </button>
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
      {/* Step Numbers & Labels */}
      <div className="flex justify-between items-center relative">
        {/* Background Connecting Line */}
        <div className="absolute left-0 top-3.5 h-0.5 w-full bg-border -z-10" />

        {/* Active Progress Filling Line */}
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
