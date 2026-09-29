import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  ShoppingCart,
  ReceiptText,
  Undo2,
  Package,
  Tags,
  UserRound,
  Users,
  Store,
  ClipboardList,
  Building2,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useAdminProfile } from "../../context/AdminProfileContext";

const navGroups = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", icon: LayoutGrid, href: "/admin/dashboard" }],
  },
  {
    label: "Sales",
    items: [
      { title: "Orders", icon: ShoppingCart, href: "/admin/orders" },
      { title: "Order Items", icon: ReceiptText, href: "/admin/order-items" },
      { title: "Refunds", icon: Undo2, href: "/admin/refunds" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", icon: Package, href: "/admin/products" },
      { title: "Categories", icon: Tags, href: "/admin/categories" },
    ],
  },
  {
    label: "People",
    items: [
      { title: "Customers", icon: UserRound, href: "/admin/customers" },
      { title: "Users", icon: Users, href: "/admin/users" },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Branches", icon: Store, href: "/admin/branches" },
      { title: "Shift Reports", icon: ClipboardList, href: "/admin/shift-reports" },
    ],
  },
  {
    label: "Settings",
    items: [{ title: "Tenant", icon: Building2, href: "/admin/tenant" }],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { profile, loading } = useAdminProfile();

  const businessName = profile?.businessName ?? "RetailOS";
  const initial = businessName.charAt(0).toUpperCase();

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return location.pathname === "/admin" || location.pathname === "/admin/dashboard";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-[#14213D]/10 bg-white transition-all duration-300 ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      {/* Brand */}
      <div className="flex h-20 items-center justify-between border-b border-[#14213D]/10 px-4">
        {!collapsed && (
          <Link to="/admin/dashboard" className="flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8862A] font-black text-white">
              {initial}
            </div>
            {loading ? (
              <span className="h-5 w-24 animate-pulse rounded bg-[#14213D]/10" />
            ) : (
              <span className="truncate text-lg font-bold text-[#14213D]">{businessName}</span>
            )}
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8862A] font-black text-white">
            {initial}
          </div>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[2px] text-[#14213D]/35">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    title={collapsed ? item.title : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-[#E8862A]/10 text-[#E8862A]"
                        : "text-[#14213D]/55 hover:bg-[#14213D]/[0.04] hover:text-[#14213D]"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[#E8862A]" />
                    )}
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-[#14213D]/10 p-3">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#14213D]/10 bg-[#FAF8F4] py-2.5 text-xs font-medium text-[#14213D]/55 transition hover:bg-[#14213D]/[0.04] hover:text-[#14213D]"
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4" />
              Collapse
            </>
          )}
        </button>
      </div>
    </aside>
  );
}