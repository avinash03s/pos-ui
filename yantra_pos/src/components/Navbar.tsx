import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../assets/yantra-logo.png";

const navLinks = [
    { title: "Product", href: "#product", type: "anchor" },
    { title: "Features", href: "#features", type: "anchor" },
    { title: "Pricing", href: "#pricing", type: "anchor" },
    { title: "Contact Us", href: "#contact", type: "anchor" },
    { title: "Careers", href: "/careers", type: "route" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScroll(window.scrollY > 15);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${scroll
                ? "border-b border-[#14213D]/10 bg-[#FAF8F4]/90 backdrop-blur-md"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <motion.img
                        whileHover={{ rotate: 4, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={logo}
                        alt="Yantra"
                        className="h-11 w-11 rounded-full border border-[#14213D]/10 object-cover"
                    />
                    <div>
                        <h1 className="text-xl font-bold tracking-wide text-[#14213D]">
                            Yantra
                        </h1>
                        <p className="-mt-1 text-[11px] uppercase tracking-[4px] text-[#E8862A]">
                            Enterprise
                        </p>
                    </div>
                </Link>

                {/* Desktop */}
                <nav className="hidden items-center gap-10 lg:flex">
                    {navLinks.map((item) => (
                        item.type === "route" ? (
                            <Link
                                key={item.title}
                                to={item.href}
                                className="group relative text-sm font-medium text-[#14213D]/70 transition hover:text-[#14213D]"
                            >
                                {item.title}
                                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#E8862A] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ) : (
                            <a
                                key={item.title}
                                href={item.href}
                                className="group relative text-sm font-medium text-[#14213D]/70 transition hover:text-[#14213D]"
                            >
                                {item.title}
                                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#E8862A] transition-all duration-300 group-hover:w-full" />
                            </a>
                        )
                    ))}
                </nav>

                {/* Right Buttons */}
                <div className="hidden items-center gap-4 lg:flex">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-[#14213D]/70 transition hover:text-[#14213D]"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="group flex items-center gap-2 rounded-full bg-[#E8862A] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(232,134,42,.3)] transition hover:scale-105 hover:bg-[#DB7A1F]"
                    >
                        Get Started
                        <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Mobile */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="rounded-xl border border-[#14213D]/10 bg-[#14213D]/5 p-2 text-[#14213D] lg:hidden"
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#14213D]/10 bg-[#FAF8F4]/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="flex flex-col gap-6 px-6 py-8">
                            {navLinks.map((item) => (
                                item.type === "route" ? (
                                    <Link
                                        key={item.title}
                                        to={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-lg text-[#14213D]/70"
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="text-lg text-[#14213D]/70"
                                    >
                                        {item.title}
                                    </a>
                                )
                            ))}

                            <Link
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                                className="text-lg text-[#14213D]/70"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={() => setMenuOpen(false)}
                                className="rounded-full bg-[#E8862A] py-4 text-center font-semibold text-white"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}