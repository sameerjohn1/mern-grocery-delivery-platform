import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getPageMeta } from "./navItems";
import {
  DashboardContentSkeleton,
  FormPageSkeleton,
  ListPageSkeleton,
} from "../Skeletons/AdminSkeletons";

const readStoredUser = () => {
  try {
    const stored = localStorage.getItem("GreenCart_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(readStoredUser);
  const location = useLocation();
  const navigate = useNavigate();

  const page = useMemo(() => getPageMeta(location.pathname), [location.pathname]);

  const contentFallback = useMemo(() => {
    if (location.pathname === "/orders") {
      return <DashboardContentSkeleton showSummary={false} />;
    }

    if (location.pathname.startsWith("/add-")) {
      return <FormPageSkeleton />;
    }

    if (location.pathname === "/dashboard") {
      return <DashboardContentSkeleton />;
    }

    return <ListPageSkeleton />;
  }, [location.pathname]);

  useEffect(() => {
    const syncUser = () => setUser(readStoredUser());

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("GreenCart_user");
    setUser(null);
    setMobileOpen(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="dashboard-font min-h-screen bg-[#050807] text-white">
      <Sidebar user={user} onLogout={handleLogout} />

      <MobileSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      <div className="min-w-0 lg:pl-72">
        <Topbar
          title={page.title}
          description={page.description}
          user={user}
          onOpenSidebar={() => setMobileOpen(true)}
          onLogout={handleLogout}
        />

        <main className="min-h-[calc(100vh-4.5rem)]">
          <Suspense fallback={contentFallback}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
