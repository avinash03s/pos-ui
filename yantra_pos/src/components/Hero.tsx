import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Building2, ShoppingCart, BarChart3 } from "lucide-react";

export default function Hero() {
  return (
    <section id="product" className="relative overflow-hidden bg-[#FAF8F4] pt-32 pb-24">
      {/* Subtle warmth, no heavy glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#E8862A]/[0.06] blur-[140px]" />
        <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-[#2F6F5E]/[0.05] blur-[180px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-12">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="rounded-full border border-[#E8862A]/25 bg-[#E8862A]/10 px-4 py-2 text-sm font-semibold text-[#C36A1A]">
            Next Generation Retail Platform
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-[#14213D] lg:text-7xl">
            Run Every Store
            <br />
            <span className="text-[#E8862A]">From One Platform</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#14213D]/60">
            Yantra gives retailers complete control over inventory, billing, branches,
            analytics and AI insights in one clear, dependable platform.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="group flex items-center gap-3 rounded-full bg-[#E8862A] px-8 py-4 font-semibold text-white shadow-[0_15px_35px_rgba(232,134,42,.3)] transition hover:scale-105 hover:bg-[#DB7A1F]"
            >
              Start Free
              <ArrowRight size={20} className="transition group-hover:translate-x-1" />
            </Link>

            <button className="flex items-center gap-3 rounded-full border border-[#14213D]/15 bg-white px-8 py-4 font-semibold text-[#14213D] transition hover:bg-[#14213D]/[0.03]">
              <Play size={18} />
              Watch Demo
            </button>
          </div>

          {/* Stats — ledger strip signature */}
          <div className="mt-14 border-t border-[#14213D]/10 pt-8">
            <div className="grid grid-cols-3 divide-x divide-[#14213D]/10">
              <div className="pr-6">
                <h2 className="font-mono text-3xl font-bold tabular-nums text-[#14213D]">100+</h2>
                <p className="mt-2 text-sm text-[#14213D]/50">Stores Managed</p>
              </div>
              <div className="px-6">
                <h2 className="font-mono text-3xl font-bold tabular-nums text-[#14213D]">25K+</h2>
                <p className="mt-2 text-sm text-[#14213D]/50">Orders Processed</p>
              </div>
              <div className="pl-6">
                <h2 className="font-mono text-3xl font-bold tabular-nums text-[#14213D]">99.9%</h2>
                <p className="mt-2 text-sm text-[#14213D]/50">Cloud Uptime</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="rounded-[32px] border border-[#14213D]/10 bg-white p-8 shadow-[0_25px_60px_-15px_rgba(20,33,61,0.15)]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#14213D]">Business Overview</h3>
                <p className="text-[#14213D]/50">Live Retail Analytics</p>
              </div>
              <div className="rounded-full bg-[#2F6F5E]/10 px-4 py-2 text-sm font-semibold text-[#2F6F5E]">
                ● Live
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl border border-[#14213D]/10 bg-[#FAF8F4] p-5">
                <Building2 className="text-[#E8862A]" />
                <p className="mt-5 text-[#14213D]/50">Branches</p>
                <h2 className="mt-1 font-mono text-3xl font-bold tabular-nums text-[#14213D]">12</h2>
              </div>

              <div className="rounded-2xl border border-[#14213D]/10 bg-[#FAF8F4] p-5">
                <ShoppingCart className="text-[#E8862A]" />
                <p className="mt-5 text-[#14213D]/50">Orders</p>
                <h2 className="mt-1 font-mono text-3xl font-bold tabular-nums text-[#14213D]">4,862</h2>
              </div>

              <div className="col-span-2 rounded-2xl border border-[#14213D]/10 bg-[#FAF8F4] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#14213D]/50">Revenue</p>
                    <h2 className="mt-2 font-mono text-4xl font-bold tabular-nums text-[#14213D]">₹8.42L</h2>
                  </div>
                  <BarChart3 size={50} className="text-[#E8862A]" />
                </div>

                <div className="mt-8 h-2 rounded-full bg-[#14213D]/10">
                  <div className="h-2 w-[72%] rounded-full bg-[#E8862A]" />
                </div>

                <p className="mt-3 text-sm font-medium text-[#2F6F5E]">▲ 18% Growth this month</p>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-6 top-12 rounded-2xl border border-[#E8862A]/25 bg-white px-5 py-4 shadow-[0_15px_35px_-10px_rgba(20,33,61,0.2)]"
          >
            <p className="text-sm text-[#C36A1A]">AI Enabled</p>
            <h3 className="font-bold text-[#14213D]">Smart Insights</h3>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}