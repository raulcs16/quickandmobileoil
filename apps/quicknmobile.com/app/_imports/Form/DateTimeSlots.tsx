import { useEffect, useState } from "react";

export type Days = "MON" | "TUES" | "WED" | "THUR" | "FRI" | "SUN";
export type ampm = "am" | "pm";

export type Hour = {
  hour: number;
  ampm: ampm;
};

export type TimeRange = {
  start: Hour;
  end: Hour;
};

interface TimeSlotProps {
  selected: boolean;
  timeRange: TimeRange;
  onClicked: () => void;
}

interface DaySectionProps {
  open: boolean;
  label: string;
  hasSelections: boolean; // New prop to track if this day has selected items
  timeSlots: TimeRange[];
  renderSlot: (timeRange: TimeRange) => React.ReactNode;
  toggleOpen: () => void;
}

interface DateTimeSlotsProps {
  days: string[];
  timeslots: TimeRange[];
  onComplete: (status: boolean) => void;
}

export default function DateTimeSlots(props: DateTimeSlotsProps) {
  const [open, setOpen] = useState<boolean[]>(props.days.map(() => false));
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const handleSlotToggle = (slotIdentifier: string) => {
    setSelectedSlots((prev) => {
      if (prev.includes(slotIdentifier)) {
        return prev.filter((id) => id !== slotIdentifier);
      }
      return [...prev, slotIdentifier];
    });
  };
  useEffect(() => {
    props.onComplete(selectedSlots.length >= 1);
  }, [selectedSlots]);

  return (
    <div className="space-y-2 p-4">
      {props.days.map((day, index) => {
        // Check if any string inside selectedSlots starts with the current day's label
        const hasSelections = selectedSlots.some((id) =>
          id.startsWith(`${day}-`)
        );

        return (
          <DaySection
            key={day}
            label={day}
            open={open[index]}
            hasSelections={hasSelections} // Pass down the boolean status
            timeSlots={props.timeslots}
            toggleOpen={() => {
              setOpen((prev) =>
                prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
              );
            }}
            renderSlot={(timeRange) => {
              const slotIdentifier = `${day}-${timeRange.start.hour}${timeRange.start.ampm}-${timeRange.end.hour}${timeRange.end.ampm}`;
              const isSelected = selectedSlots.includes(slotIdentifier);

              return (
                <TimeSlot
                  selected={isSelected}
                  timeRange={timeRange}
                  onClicked={() => handleSlotToggle(slotIdentifier)}
                />
              );
            }}
          />
        );
      })}
    </div>
  );
}

function TimeSlot(props: TimeSlotProps) {
  return (
    <div
      onClick={props.onClicked}
      className={`border flex gap-5 justify-center rounded-lg p-3 text-xs font-medium transition-all duration-150 cursor-pointer select-none ${
        props.selected
          ? "bg-blue-600 border-blue-900 text-white shadow-sm"
          : "bg-bg-dark border-border text-secondary hover:text-primary hover:border-highlight"
      }`}
    >
      <p className="flex gap-0.5">
        <span className="text-nowrap">{props.timeRange.start.hour}:00</span>
        <span className="text-nowrap uppercase text-[10px] self-center opacity-80">
          {props.timeRange.start.ampm}
        </span>
      </p>

      <p className="opacity-50">-</p>

      <p className="flex gap-0.5">
        <span className="text-nowrap">{props.timeRange.end.hour}:00</span>
        <span className="text-nowrap uppercase text-[10px] self-center opacity-80">
          {props.timeRange.end.ampm}
        </span>
      </p>
    </div>
  );
}

export function DaySection(props: DaySectionProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-3 overflow-hidden rounded-xl border border-border bg-bg-light shadow-primary transition-all duration-200">
      {/* Dropdown Header/Trigger */}
      <button
        onClick={props.toggleOpen}
        type="button"
        className="flex w-full items-center justify-between p-4 text-left font-sans font-medium text-primary bg-primary-gradient hover:bg-hover-gradient transition-all cursor-pointer group select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm tracking-wide">{props.label}</span>

          {/* Status Indicator Dot */}
          {props.hasSelections && (
            <span
              className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-200 animate-pulse"
              title="Has selected slots"
            />
          )}
        </div>

        {/* Pure Text/CSS Caret Indicator */}
        <span
          className={`text-xs text-secondary group-hover:text-highlight transition-transform duration-300 ease-out inline-block ${
            props.open ? "rotate-180 text-primary" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* Dropdown Content Area */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          props.open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden bg-bg-dark">
          <div className="p-4 space-y-2.5 border-t border-border">
            {props.timeSlots.map((slot, index) => (
              <div
                key={index}
                className="transition-transform duration-200 hover:scale-[1.01]"
              >
                {props.renderSlot(slot)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
