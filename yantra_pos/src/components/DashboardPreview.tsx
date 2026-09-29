import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Users, Package, CreditCard } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="relative bg-[#FAF8F4] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[32px] border border-[#14213D]/10 bg-white p-6 shadow-[0_25px_60px_-20px_rgba(20,33,61,0.15)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#14213D]">Yantra Business Dashboard</h2>
              <p className="mt-2 text-[#14213D]/50">Real-time store performance</p>
            </div>
            <div className="rounded-full bg-[#2F6F5E]/10 px-4 py-2 text-sm font-semibold text-[#2F6F5E]">
              ● Online
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <Stat icon={<TrendingUp />} title="Revenue" value="₹12.4L" />
            <Stat icon={<ShoppingBag />} title="Orders" value="8,942" />
            <Stat icon={<Users />} title="Customers" value="3,210" />
            <Stat icon={<Package />} title="Products" value="5,860" />
          </div>

          {/* Main Area */}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Chart */}
            <div className="rounded-3xl border border-[#14213D]/10 bg-[#FAF8F4] p-6 lg:col-span-2">
              <div className="flex justify-between">
                <h3 className="font-semibold text-[#14213D]">Sales Analytics</h3>
                <TrendingUp className="text-[#E8862A]" />
              </div>

              <div className="mt-10 flex h-48 items-end gap-3">
                {[40, 60, 45, 80, 70, 95, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex-1 rounded-t-lg bg-[#E8862A]/80"
                  />
                ))}
              </div>
            </div>

            {/* Recent Payment */}
            <div className="rounded-3xl border border-[#14213D]/10 bg-[#FAF8F4] p-6">
              <CreditCard className="text-[#E8862A]" />
              <h3 className="mt-5 font-semibold text-[#14213D]">Latest Payment</h3>
              <p className="mt-4 font-mono text-3xl font-bold tabular-nums text-[#14213D]">₹48,500</p>
              <p className="mt-2 text-sm font-medium text-[#2F6F5E]">Successful transaction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#14213D]/10 bg-[#FAF8F4] p-5">
      <div className="text-[#E8862A]">{icon}</div>
      <p className="mt-4 text-sm text-[#14213D]/50">{title}</p>
      <h3 className="mt-1 font-mono text-2xl font-bold tabular-nums text-[#14213D]">{value}</h3>
    </div>
  );
}