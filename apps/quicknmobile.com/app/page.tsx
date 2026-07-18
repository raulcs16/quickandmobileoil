import Logo from "./_imports/Logo";
import CompanyTitle from "./_imports/CompanyTitle";
import ScheduleForm from "./_imports/Form/ScheduleForm";
import MultiStepForm from "./_imports/MultiStepForm/MultiStepInput";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark text-primary antialiased font-sans pb-12">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-border backdrop-blur-md bg-bg px-6 py-4  shadow-primary">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-primary">
            <Logo width={36}></Logo>
            <CompanyTitle></CompanyTitle>
          </div>
          <a
            href="#form-section"
            className="bg-blue-600 hover:bg-blue-700 text-primary font-bold px-2 py-3 rounded-xl shadow-lg shadow-white/5 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-nowrap"
          >
            Schedule Service
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-slide"></div>
        <div className="hero-slide"></div>
        <div className="hero-slide"></div>
        <div className="hero-slide"></div>
        <section className="max-w-4xl mx-auto text-center px-6 py-20 md:py-28 flex flex-col items-center hero-content">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm mb-3 bg-bg-light px-3 py-1 rounded-full">
            Oil Change to Your Door
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary tracking-tight leading-tight mb-6">
            Expert Oil Changes, Right in Your Driveway or Office Parking Lot
          </h1>
          <p className="text-lg md:text-xl text-secondary max-w-2xl mb-10 leading-relaxed">
            No waiting rooms, no wasted Saturdays. Just premium service while
            you get things done.
          </p>
        </section>
      </div>

      {/* Why Choose Us */}
      <section className="bg-bg border-y border-border py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">
            Why Choose Quick And Mobile Oil?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-bg-dark border border-bg-light text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold text-xl mb-2 text-primary">
                Ultimate Convenience
              </h3>
              <p className="text-secondary text-sm">
                We meet you wherever you are. Zero disruption to your busy day.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-bg-dark border border-bg-light text-center">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-bold text-xl mb-2 text-primary">
                Highly Reviewed
              </h3>
              <p className="text-secondary text-sm">
                Experienced, trusted mechanics delivering a seamless premium
                experience.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-bg-dark border border-bg-light text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-bold text-xl mb-2 text-primary">
                Zero Mess Guarantee
              </h3>
              <p className="text-secondary text-sm">
                Our modern vacuum capture systems guarantee your driveway stays
                pristine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto py-20 px-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-bg-light text-primary border border-border flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h3 className="font-bold text-xl mb-2 text-secondary">
              Book Online
            </h3>
            <p className="text-secondary">
              Fill out our quick form with your VIN and basic details.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-bg-light text-primary border border-border flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h3 className="font-bold text-xl mb-2 text-secondary">
              We Schedule You In
            </h3>
            <p className="text-secondary">
              We slot you into an arrival window and notify you instantly.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-bg-light text-primary border border-border flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h3 className="font-bold text-xl mb-2 text-primary">
              We Change Your Oil
            </h3>
            <p className="text-secondary">
              Our fully equipped mobile shop arrives right at your spot.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-bg-light text-primary py-16 px-6 max-w-5xl mx-auto my-12 shadow-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            What Our Customers Say
          </h2>
          <blockquote className="text-xl md:text-2xl italic font-medium mb-4">
            "Awesome experience. They changed my oil right in my office parking
            lot while I was on a call. Completely hassle-free!"
          </blockquote>
          <cite className="text-highlight font-semibold not-italic block">
            — John Doe
          </cite>
        </div>
      </section>

      {/* CTA Booking Form */}
      <section
        id="form-section"
        className="max-w-xl mx-auto   border-border rounded-3xl p-8 md:p-10 shadow-primary scroll-mt-24"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-primary text-center mb-2">
          Schedule Your Mobile Oil Change
        </h2>
        <p className="text-secondary text-sm text-center mb-8">
          Fast setup. No payment required until the job is done.
        </p>

        <ScheduleForm></ScheduleForm>

        <p className="text-xs text-secondary mt-6 text-center leading-relaxed">
          🔒 Your information is secure. We only use your VIN to ensure we bring
          the exact correct oil grade and custom oil filter tailored
          specifically for your vehicle.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-bg mt-5">
        <h2 className="text-3xl font-bold text-primary text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="bg-bg-dark p-6 rounded-2xl border border-border">
            <h3 className="font-bold text-lg text-primary mb-2">
              Do I need to be present for the service?
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Not at all! As long as we have access to your keys and the vehicle
              is parked in an accessible location, you can go about your day
              inside while we take care of everything.
            </p>
          </div>
          <div className="bg-bg-dark p-6 rounded-2xl border border-border">
            <h3 className="font-bold text-lg text-primary mb-2">
              How do you look up my car with just the VIN?
            </h3>
            <p className="text-secondary text-sm leading-relaxed">
              Your VIN decodes the exact year, make, model, and engine variant
              of your vehicle. This eliminates guesswork, ensuring our dispatch
              vehicle brings the precise manufacturer-spec filter and oil
              capacity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-secondary text-xs border-t border-border pt-8 max-w-5xl mx-auto">
        &copy; 2026 Quick And Mobile Oil Services. All Rights Reserved.
      </footer>
    </main>
  );
}
