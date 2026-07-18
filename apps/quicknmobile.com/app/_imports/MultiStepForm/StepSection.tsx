export interface StepSectionProps {
  step: string;
  render: boolean;
}
export default function StepSection(props: StepSectionProps) {
  return (
    <div
      className={`${props.render ? "visible" : "hidden"} w-full max-w-md mx-auto space-y-4 p-5 rounded-2xl bg-bg-light border border-border shadow-primary text-left`}
    >
      <h1>{"StepSection"}</h1>
    </div>
  );
}
