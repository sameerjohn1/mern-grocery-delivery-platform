import { useEffect } from "react";
import { X } from "lucide-react";
import { SidebarContent } from "./Sidebar";

const MobileSidebar = ({ open, onClose, user, onLogout }) => {
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-60 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        aria-label="Close navigation menu"
        className={`absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        id="admin-mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className={`absolute inset-y-0 left-0 flex w-[min(20rem,88vw)] flex-col border-r border-[#34D399]/15 bg-[#07110D] shadow-2xl shadow-black/60 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#34D399]/20 bg-[#0D241D] text-[#D1FAE5] transition hover:bg-[#34D399] hover:text-[#06231A]"
        >
          <X className="h-4 w-4" />
        </button>

        <SidebarContent
          user={user}
          onLogout={onLogout}
          onNavigate={onClose}
        />
      </aside>
    </div>
  );
};

export default MobileSidebar;
