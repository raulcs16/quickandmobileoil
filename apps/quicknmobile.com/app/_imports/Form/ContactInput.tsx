interface ContactInputProps {}

export default function ContactInput(props: ContactInputProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-4 p-5 rounded-2xl bg-bg-light border border-border shadow-primary text-left">
      <h2 className="text-sm font-semibold tracking-wide text-primary mb-2">
        Contact Information:
      </h2>

      {/* Full Name Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-secondary uppercase tracking-wide block">
          Full Name
        </label>
        <input
          type="text"
          name="contact.name"
          autoComplete="name"
          placeholder="John Doe"
          className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans"
        />
      </div>

      {/* Phone Number Field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-secondary uppercase tracking-wide block">
          Phone Number
        </label>
        <input
          type="tel"
          name="contact.phone"
          autoComplete="tel"
          placeholder="(555) 000-0000"
          className="w-full px-4 py-3 rounded-xl border border-border bg-bg-dark text-primary placeholder:text-secondary/50 focus:ring-2 focus:ring-highlight/30 focus:border-highlight outline-none transition duration-150 text-sm font-sans"
        />
      </div>
    </div>
  );
}
