import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Users,
  Undo2,
  ArrowUpRight,
  Sparkles,
  Store,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAdminProfile } from "../../context/AdminProfileContext";
import { useBranch, ALL_BRANCHES } from "../../context/BranchContext";

// ⚠️ Mock data — replace with real branch-wise API data once
// orders/stats endpoints support a branchId filter.
const allStats = [
  {
    label: "Total Revenue",
    value: "₹4,82,300",
    delta: "+12.4%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Orders Today",
    value: "184",
    delta: "+6.1%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    label: "Low Stock Items",
    value: "23",
    delta: "-3.2%",
    trend: "down",
    icon: Package,
  },
  {
    label: "Active Customers",
    value: "3,912",
    delta: "+8.7%",
    trend: "up",
    icon: Users,
  },
];

const allRevenueData = [
  { day: "Mon", revenue: 32000 },
  { day: "Tue", revenue: 41000 },
  { day: "Wed", revenue: 38500 },
  { day: "Thu", revenue: 47000 },
  { day: "Fri", revenue: 55200 },
  { day: "Sat", revenue: 61800 },
  { day: "Sun", revenue: 49300 },
];

const allOrders = [
  { id: "#ORD-2481", customer: "Aarav Mehta", branch: "Koregaon Park", amount: "₹3,240", status: "Paid" },
  { id: "#ORD-2480", customer: "Sneha Kulkarni", branch: "Baner", amount: "₹1,180", status: "Pending" },
  { id: "#ORD-2479", customer: "Rohan Deshmukh", branch: "Koregaon Park", amount: "₹6,750", status: "Paid" },
  { id: "#ORD-2478", customer: "Isha Patil", branch: "Hinjewadi", amount: "₹890", status: "Refunded" },
  { id: "#ORD-2477", customer: "Kabir Shah", branch: "Baner", amount: "₹2,410", status: "Paid" },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-[#2F6F5E]/10 text-[#2F6F5E] ring-1 ring-[#2F6F5E]/20",
  Pending: "bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20",
  Refunded: "bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20",
};

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

// Deterministic pseudo-scale so each branch shows a visibly different
// (but consistent) slice of the mock numbers until real branch-wise
// stats are wired up on the backend.
function scaleForBranch(branchId: string | null) {
  if (!branchId) return 1;
  const seed = Array.from(branchId).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return 0.35 + (seed % 50) / 100; // ~0.35–0.84
}

export default function AdminDashboard() {
  const { profile, loading, error } = useAdminProfile();
  const { selectedBranchId, selectedBranch } = useBranch();
  const greeting = getGreeting();

  const isAllBranches = selectedBranchId === ALL_BRANCHES;
  const scale = scaleForBranch(isAllBranches ? null : selectedBranchId);

  const stats = isAllBranches
    ? allStats
    : allStats.map((s) => {
        const numeric = Number(s.value.replace(/[^\d.]/g, ""));
        const scaled = Math.round(numeric * scale);
        const prefix = s.value.startsWith("₹") ? "₹" : "";
        return { ...s, value: prefix + scaled.toLocaleString("en-IN") };
      });

  const revenueData = isAllBranches
    ? allRevenueData
    : allRevenueData.map((d) => ({ ...d, revenue: Math.round(d.revenue * scale) }));

  const recentOrders = isAllBranches
    ? allOrders
    : allOrders.filter((o) => o.branch === selectedBranch?.name);

  return (
    <div className="relative space-y-8">
      {/* Ambient background glow — matches Hero treatment */}
      <div className="pointer-events-none fixed -top-40 right-0 h-96 w-96 rounded-full bg-[#E8862A]/[0.06] blur-[140px]" />
      <div className="pointer-events-none fixed bottom-0 left-1/4 h-96 w-96 rounded-full bg-[#2F6F5E]/[0.05] blur-[140px]" />

      {/* Header */}
      <div className="relative flex flex-col gap-1">
        {loading ? (
          <div className="h-9 w-72 animate-pulse rounded-lg bg-[#14213D]/5" />
        ) : (
          <div className="flex items-center gap-2.5">
            <h1 className="text-[28px] font-black tracking-tight text-[#14213D]">
              {greeting}, {profile?.ownerName ?? "Admin"}
            </h1>
            <Sparkles className="h-5 w-5 text-[#E8862A]" />
          </div>
        )}
        <p className="text-sm text-[#14213D]/50">
          {loading ? (
            <span className="mt-1 inline-block h-4 w-48 animate-pulse rounded bg-[#14213D]/5 align-middle" />
          ) : error ? (
            "Here's what's happening across your branches today."
          ) : (
            <>
              <span className="font-medium text-[#14213D]/70">{profile?.businessName}</span> —{" "}
              {isAllBranches ? (
                <>here&apos;s what&apos;s happening across your branches today.</>
              ) : (
                <>here&apos;s what&apos;s happening at {selectedBranch?.name} today.</>
              )}
            </>
          )}
        </p>

        {!isAllBranches && selectedBranch && (
          <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#E8862A]/20 bg-[#E8862A]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#E8862A]">
            <Store className="h-3.5 w-3.5" />
            Viewing: {selectedBranch.name}
            {selectedBranch.city && ` · ${selectedBranch.city}`}
          </div>
        )}
      </div>

      {/* Stat cards */}
      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const up = s.trend === "up";
          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-[28px] border border-[#14213D]/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(20,33,61,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E8862A]/30 hover:shadow-[0_25px_60px_-20px_rgba(20,33,61,0.18)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#E8862A]/[0.08] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8862A]/10 text-[#E8862A] ring-1 ring-[#E8862A]/10">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    up
                      ? "bg-[#2F6F5E]/10 text-[#2F6F5E] ring-1 ring-[#2F6F5E]/20"
                      : "bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20"
                  }`}
                >
                  {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {s.delta}
                </span>
              </div>
              <p className="relative mt-6 text-[28px] font-black tracking-tight text-[#14213D]">
                {s.value}
              </p>
              <p className="relative mt-1 text-sm text-[#14213D]/50">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + recent orders */}
      <div className="relative grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <div className="relative overflow-hidden rounded-[28px] border border-[#14213D]/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(20,33,61,0.15)] lg:col-span-2">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#E8862A]/[0.06] blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="font-bold tracking-tight text-[#14213D]">Revenue this week</h2>
              <p className="text-sm text-[#14213D]/50">
                {isAllBranches ? "Across all branches" : selectedBranch?.name ?? ""}
              </p>
            </div>
            <button className="flex items-center gap-1 rounded-full border border-[#14213D]/10 bg-[#FAF8F4] px-3 py-1.5 text-sm font-medium text-[#E8862A] transition hover:border-[#E8862A]/30 hover:bg-[#E8862A]/5">
              View report
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="relative mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ left: -20, top: 10 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8862A" stopOpacity={0.35} />
                    <stop offset="60%" stopColor="#E8862A" stopOpacity={0.08} />
                    <stop offset="100%" stopColor="#E8862A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="revenueStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#F0994A" />
                    <stop offset="100%" stopColor="#E8862A" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,33,61,0.06)" vertical={false} />
                <XAxis
                  dataKey="day"
                  stroke="rgba(20,33,61,0.4)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(20,33,61,0.4)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `₹${v / 1000}k`}
                />
                <Tooltip
                  cursor={{ stroke: "rgba(232,134,42,0.2)", strokeWidth: 1 }}
                  contentStyle={{
                    background: "#14213D",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "14px",
                    fontSize: "13px",
                    color: "#fff",
                    boxShadow: "0 20px 50px -20px rgba(20,33,61,0.4)",
                  }}
                  formatter={(value) => {
                    const amount = typeof value === "number" ? value : Number(value ?? 0);
                    return [`₹${amount.toLocaleString()}`, "Revenue"];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#revenueStroke)"
                  strokeWidth={3}
                  fill="url(#revenueFill)"
                  activeDot={{ r: 5, fill: "#E8862A", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick actions / mini summary */}
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-[28px] border border-[#14213D]/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(20,33,61,0.15)]">
            <h2 className="font-bold tracking-tight text-[#14213D]">Quick actions</h2>
            <div className="mt-4 space-y-2">
              {[
                { label: "Add Product", icon: Package },
                { label: "New Order", icon: ShoppingCart },
                { label: "Process Refund", icon: Undo2 },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.label}
                    className="flex w-full items-center gap-3 rounded-2xl border border-[#14213D]/10 bg-[#FAF8F4] px-4 py-3 text-sm font-medium text-[#14213D]/70 transition hover:border-[#E8862A]/25 hover:bg-[#E8862A]/[0.06] hover:text-[#14213D]"
                  >
                    <Icon className="h-4 w-4 text-[#E8862A]" />
                    {a.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-[#E8862A]/20 bg-gradient-to-br from-[#E8862A]/[0.10] via-[#E8862A]/[0.03] to-transparent p-6 shadow-[0_20px_50px_-25px_rgba(232,134,42,0.25)]">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#E8862A]/10 blur-3xl" />
            <p className="relative text-sm font-semibold text-[#E8862A]">Shift Report Pending</p>
            <p className="relative mt-2 text-sm text-[#14213D]/60">
              Baner branch hasn&apos;t closed today&apos;s shift report yet.
            </p>
            <button className="relative mt-4 text-sm font-semibold text-[#14213D] underline decoration-[#E8862A]/40 underline-offset-4 transition hover:text-[#E8862A] hover:decoration-[#E8862A]">
              Review now
            </button>
          </div>
        </div>
      </div>

      {/* Recent orders table */}
      <div className="relative overflow-hidden rounded-[28px] border border-[#14213D]/10 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(20,33,61,0.15)]">
        <div className="flex items-center justify-between">
          <h2 className="font-bold tracking-tight text-[#14213D]">Recent orders</h2>
          <button className="flex items-center gap-1 rounded-full border border-[#14213D]/10 bg-[#FAF8F4] px-3 py-1.5 text-sm font-medium text-[#E8862A] transition hover:border-[#E8862A]/30 hover:bg-[#E8862A]/5">
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          {recentOrders.length === 0 ? (
            <p className="py-10 text-center text-sm text-[#14213D]/40">
              No orders yet for {selectedBranch?.name}.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#14213D]/10 text-[#14213D]/40">
                  <th className="pb-3 font-medium">Order</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Branch</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-[#14213D]/[0.06] transition last:border-0 hover:bg-[#FAF8F4]"
                  >
                    <td className="py-3.5 font-medium text-[#14213D]">{o.id}</td>
                    <td className="py-3.5 text-[#14213D]/70">{o.customer}</td>
                    <td className="py-3.5 text-[#14213D]/50">{o.branch}</td>
                    <td className="py-3.5 text-[#14213D]/70">{o.amount}</td>
                    <td className="py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}