import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "499",
    tagline: "For single-branch shops getting started",
    features: ["1 Branch", "Billing", "Inventory"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "1299",
    tagline: "For growing multi-branch retailers",
    features: ["5 Branches", "Analytics", "AI Assistant"],
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#FAF8F4] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#14213D] sm:text-5xl">Simple Pricing</h2>
          <p className="mt-4 text-[#14213D]/50">
            Pick a plan that fits your business today, upgrade any time.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border p-8 transition hover:-translate-y-1 ${
                p.highlighted
                  ? "border-[#E8862A]/40 bg-white shadow-[0_20px_50px_-20px_rgba(232,134,42,0.3)]"
                  : "border-[#14213D]/10 bg-white"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#E8862A] px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-[#14213D]">{p.name}</h3>
              <p className="mt-1 text-sm text-[#14213D]/50">{p.tagline}</p>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-mono text-5xl font-black tabular-nums text-[#14213D]">
                  ₹{p.price}
                </span>
                <span className="text-sm text-[#14213D]/50">/month</span>
              </div>

              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#14213D]/70">
                    <Check className="h-4 w-4 shrink-0 text-[#E8862A]" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-full py-3 font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#E8862A]/40 focus:ring-offset-2 focus:ring-offset-[#FAF8F4] ${
                  p.highlighted
                    ? "bg-[#E8862A] text-white hover:bg-[#DB7A1F]"
                    : "border border-[#14213D]/15 bg-white text-[#14213D] hover:bg-[#14213D]/[0.03]"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}