import { motion } from "framer-motion";
import { TrendingUp, Package, Users, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Sales up 24%",
    subtitle: "This month",
    accent: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    float: { y: [0, -14, 0], duration: 6, delay: 0 },
    position: "left-[2%] top-[8%] md:left-[6%] md:top-[10%]",
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "1,204 Products",
    subtitle: "In stock",
    accent: "text-orange-400",
    iconBg: "bg-orange-500/10",
    float: { y: [0, 12, 0], duration: 7, delay: 0.4 },
    position: "right-[3%] top-[18%] md:right-[8%] md:top-[16%]",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "12 Team members",
    subtitle: "Active now",
    accent: "text-sky-400",
    iconBg: "bg-sky-500/10",
    float: { y: [0, -10, 0], duration: 5.5, delay: 0.8 },
    position: "left-[8%] bottom-[10%] md:left-[12%] md:bottom-[8%]",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Secured",
    subtitle: "256-bit encryption",
    accent: "text-orange-400",
    iconBg: "bg-orange-500/10",
    float: { y: [0, 10, 0], duration: 6.5, delay: 0.2 },
    position: "right-[6%] bottom-[16%] md:right-[10%] md:bottom-[14%]",
  },
];

export default function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className={`absolute ${c.position}`}
        >
          <motion.div
            animate={{ y: c.float.y }}
            transition={{
              duration: c.float.duration,
              delay: c.float.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.iconBg} ${c.accent}`}>
              {c.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <p className="text-xs text-slate-400">{c.subtitle}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}