import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, LogOut, User, Settings, Check, Store } from "lucide-react";
import { useAdminProfile } from "../../context/AdminProfileContext";
import { useBranch, ALL_BRANCHES } from "../../context/BranchContext";

export default function Topbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const branchMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { profile, loading } = useAdminProfile();
  const { branches, loading: branchesLoading, selectedBranchId, selectedBranch, setSelectedBranchId } =
    useBranch();

  const userName = profile?.ownerName || localStorage.getItem("userName") || "Admin";
  const email = profile?.email || localStorage.getItem("email") || "";
  const role = profile?.role || localStorage.getItem("role") || "Admin";

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (branchMenuRef.current && !branchMenuRef.current.contains(e.target as Node)) {
        setBranchMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("tenantId");
    navigate("/"); // landing page
  };

  const branchLabel = selectedBranchId === ALL_BRANCHES ? "All Branches" : selectedBranch?.name ?? "Select Branch";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#14213D]/10 bg-[#FAF8F4]/90 px-6 backdrop-blur-md lg:px-8">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#14213D]/35" />
        <input
          type="text"
          placeholder="Search orders, products, customers..."
          className="w-full rounded-xl border border-[#14213D]/10 bg-white py-2.5 pl-10 pr-4 text-sm text-[#14213D] placeholder:text-[#14213D]/35 outline-none transition focus:border-[#E8862A]/60 focus:ring-2 focus:ring-[#E8862A]/15"
        />
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-4">
        {/* Branch selector */}
        <div className="relative hidden sm:block" ref={branchMenuRef}>
          <button
            onClick={() => setBranchMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl border border-[#14213D]/10 bg-white px-3 py-2 text-sm font-medium text-[#14213D]/70 transition hover:bg-[#14213D]/[0.03]"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                selectedBranchId === ALL_BRANCHES ? "bg-[#E8862A]" : "bg-[#2F6F5E]"
              }`}
            />
            <span className="max-w-[160px] truncate">{branchLabel}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 text-[#14213D]/35 transition-transform ${
                branchMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {branchMenuOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-64 overflow-hidden rounded-2xl border border-[#14213D]/10 bg-white shadow-[0_25px_60px_-20px_rgba(20,33,61,0.2)]">
              <div className="border-b border-[#14213D]/10 px-4 py-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#14213D]/35">
                  Switch branch
                </p>
              </div>

              <div className="max-h-72 overflow-y-auto p-1.5">
                <button
                  onClick={() => {
                    setSelectedBranchId(ALL_BRANCHES);
                    setBranchMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-[#14213D]/[0.04]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E8862A]/10 text-[#E8862A]">
                      <Store className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-medium text-[#14213D]">All Branches</span>
                  </span>
                  {selectedBranchId === ALL_BRANCHES && (
                    <Check className="h-4 w-4 shrink-0 text-[#E8862A]" />
                  )}
                </button>

                {branchesLoading ? (
                  <div className="space-y-2 p-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-9 animate-pulse rounded-xl bg-[#14213D]/[0.05]" />
                    ))}
                  </div>
                ) : branches.length === 0 ? (
                  <p className="px-3 py-3 text-sm text-[#14213D]/40">No branches yet</p>
                ) : (
                  branches.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedBranchId(String(b.id));
                        setBranchMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-[#14213D]/[0.04]"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            b.active ? "bg-[#2F6F5E]" : "bg-[#14213D]/20"
                          }`}
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-[#14213D]">{b.name}</span>
                          {b.city && (
                            <span className="block truncate text-xs text-[#14213D]/40">{b.city}</span>
                          )}
                        </span>
                      </span>
                      {selectedBranchId === String(b.id) && (
                        <Check className="h-4 w-4 shrink-0 text-[#E8862A]" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="relative rounded-xl border border-[#14213D]/10 bg-white p-2.5 text-[#14213D]/70 transition hover:bg-[#14213D]/[0.03] hover:text-[#14213D]">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E8862A]" />
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-xl border border-[#14213D]/10 bg-white py-1.5 pl-1.5 pr-3 transition hover:bg-[#14213D]/[0.03]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#E8862A] to-[#DB7A1F] text-xs font-bold text-white">
              {initials}
            </div>
            <div className="hidden text-left sm:block">
              {loading ? (
                <span className="block h-3.5 w-20 animate-pulse rounded bg-[#14213D]/10" />
              ) : (
                <p className="text-xs font-semibold leading-tight text-[#14213D]">{userName}</p>
              )}
              <p className="text-[11px] leading-tight text-[#14213D]/40">{role.replace("ROLE_", "")}</p>
            </div>
            <ChevronDown
              className={`hidden h-3.5 w-3.5 text-[#14213D]/35 transition-transform sm:block ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-56 overflow-hidden rounded-2xl border border-[#14213D]/10 bg-white shadow-[0_25px_60px_-20px_rgba(20,33,61,0.2)]">
              <div className="border-b border-[#14213D]/10 px-4 py-3">
                <p className="text-sm font-semibold text-[#14213D]">{userName}</p>
                <p className="text-xs text-[#14213D]/40">{email}</p>
              </div>

              <div className="p-1.5">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/admin/profile");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-[#14213D]/70 transition hover:bg-[#14213D]/[0.04] hover:text-[#14213D]"
                >
                  <User className="h-4 w-4" />
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/admin/settings");
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-[#14213D]/70 transition hover:bg-[#14213D]/[0.04] hover:text-[#14213D]"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </div>

              <div className="border-t border-[#14213D]/10 p-1.5">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}