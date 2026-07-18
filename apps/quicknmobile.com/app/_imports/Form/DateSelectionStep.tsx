import DateTimeSlots from "./DateTimeSlots";

interface DateSelectionStepProps {
  step: number;
  currentStep: number;
  onComplete: (completed: boolean) => void;
}
export default function DateSelectionStep(props: DateSelectionStepProps) {
  return (
    <div
      className={`${props.step === props.currentStep ? "visible" : "hidden"} w-full max-w-md mx-auto space-y-4 p-5 rounded-2xl bg-bg-light border border-border shadow-primary text-left`}
    >
      <label>Select Your Availability</label>
      <DateTimeSlots
        onComplete={(state) => props.onComplete(state)}
        days={["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"]}
        timeslots={[
          { start: { hour: 8, ampm: "am" }, end: { hour: 12, ampm: "pm" } },
          { start: { hour: 12, ampm: "pm" }, end: { hour: 3, ampm: "pm" } },
          { start: { hour: 3, ampm: "am" }, end: { hour: 6, ampm: "pm" } },
        ]}
      ></DateTimeSlots>
    </div>
  );
}
