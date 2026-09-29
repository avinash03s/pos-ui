import { Boxes, BarChart3, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: <Boxes className="h-6 w-6" />,
    title: "Complete Inventory",
    text: "Products, categories and stock management.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Business Analytics",
    text: "Understand sales and growth easily.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Secure Platform",
    text: "Enterprise level security and access.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Management",
    text: "Roles and permissions for employees.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#FAF8F4] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#14213D] sm:text-5xl">
            Everything your business needs
          </h2>
          <p className="mt-4 text-[#14213D]/50">
            Powerful tools built for modern retailers.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-[#14213D]/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[#E8862A]/30 hover:shadow-[0_20px_45px_-20px_rgba(20,33,61,0.15)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8862A]/10 text-[#E8862A] transition group-hover:bg-[#E8862A]/15">
                {f.icon}
              </div>

              <h3 className="mt-5 font-bold text-[#14213D]">{f.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-[#14213D]/55">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}