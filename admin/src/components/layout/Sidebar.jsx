import { NavLink } from "react-router-dom";
import { ChevronRight, LogOut, ShieldCheck } from "lucide-react";
import greenCartLogo from "../../assets/greenCart.png";
import { navGroups } from "./navItems";

export const SidebarContent = ({ user, onLogout, onNavigate }) => (
  <div className="flex h-full flex-col">
    <div className="flex items-center gap-3 border-b border-[#34D399]/10 px-5 py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#34D399] p-1.5 shadow-lg shadow-[#34D399]/20 ring-1 ring-[#D1FAE5]/40">
        <img
          src={greenCartLogo}
          alt="GreenCart"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#6EE7B7]/70">
          Admin Panel
        </p>
        <p className="truncate text-xl font-black tracking-tight text-white">
          GreenCart
        </p>
      </div>
    </div>

    <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#A7C4B8]/45">
            {group.label}
          </p>

          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? "border-[#34D399]/50 bg-[#34D399] text-[#06231A] shadow-lg shadow-[#34D399]/20"
                        : "border-transparent text-[#D1FAE5]/65 hover:border-[#34D399]/20 hover:bg-[#0D241D] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive
                            ? "text-[#06231A]"
                            : "text-[#6EE7B7]/80 group-hover:text-[#6EE7B7]"
                        }`}
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {item.name}
                      </span>
                      <ChevronRight
                        className={`h-3.5 w-3.5 shrink-0 transition ${
                          isActive
                            ? "opacity-70"
                            : "opacity-0 group-hover:opacity-60"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>

    <div className="border-t border-[#34D399]/10 p-4">
      <div className="rounded-2xl border border-[#34D399]/15 bg-[#071B16] p-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#6EE7B7]/80">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secure session
        </div>

        <p className="mt-3 truncate text-sm font-bold text-white">
          {user?.name || user?.email || "Administrator"}
        </p>
        <p className="mt-0.5 text-xs font-medium text-[#A7C4B8]">
          {user?.role === "admin" ? "Store administrator" : "Admin access"}
        </p>

        <button
          type="button"
          onClick={onLogout}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2.5 text-xs font-black text-red-200 transition hover:border-red-400/40 hover:bg-red-500/20 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  </div>
);

const Sidebar = (props) => (
  <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-[#34D399]/10 bg-[#07110D] lg:flex">
    <SidebarContent {...props} />
  </aside>
);

export default Sidebar;
