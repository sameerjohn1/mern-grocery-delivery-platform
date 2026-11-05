import { useMemo } from "react";
import { Bell, CalendarDays, LogOut, Menu } from "lucide-react";

const Topbar = ({ title, description, user, onOpenSidebar, onLogout }) => {
  const today = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(new Date()),
    [],
  );

  const displayName = user?.name || user?.email || "Administrator";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-[#34D399]/10 bg-[#050807]/90 backdrop-blur-xl">
      <div className="flex min-h-18 items-center gap-3 px-4 py-3 sm:px-6 lg:px-8 2xl:px-10">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          aria-controls="admin-mobile-sidebar"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#34D399]/20 bg-[#0D241D] text-[#6EE7B7] transition hover:border-[#34D399]/50 hover:bg-[#34D399] hover:text-[#06231A] lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#6EE7B7]/60">
            Admin workspace
          </p>
          <h1 className="truncate text-lg font-black tracking-tight text-white sm:text-xl">
            {title}
          </h1>
          <p className="hidden truncate text-xs font-medium text-[#A7C4B8] sm:block">
            {description}
          </p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[#34D399]/15 bg-[#0D241D] px-3 py-2 text-xs font-bold text-[#A7C4B8] md:flex">
            <CalendarDays className="h-4 w-4 text-[#6EE7B7]" />
            {today}
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#34D399]/15 bg-[#0D241D] text-[#A7C4B8] transition hover:border-[#34D399]/40 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#34D399]" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-[#34D399]/15 bg-[#0D241D] py-1.5 pl-1.5 pr-2 sm:pr-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#34D399] text-sm font-black text-[#06231A]">
              {initial}
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block max-w-36 truncate text-xs font-black text-white">
                {displayName}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wide text-[#6EE7B7]/70">
                Administrator
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={onLogout}
            aria-label="Logout"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 text-xs font-black text-red-200 transition hover:border-red-400/40 hover:bg-red-500/20 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
