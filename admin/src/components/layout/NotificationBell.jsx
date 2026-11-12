import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck, LoaderCircle, RefreshCw, X } from "lucide-react";
import {
  getApiErrorMessage,
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../api/adminApi";

const formatWhen = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const diff = Date.now() - date.getTime();
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "Just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(date);
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const queryClient = useQueryClient();

  const unreadQuery = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const { data } = await getUnreadNotificationCount();
      if (!data?.success) {
        throw new Error(data?.message || "Could not load unread count.");
      }
      return Number(data.unreadCount || 0);
    },
    refetchInterval: 15_000,
  });

  const listQuery = useQuery({
    queryKey: ["notifications", "list"],
    queryFn: async () => {
      const { data } = await getNotifications({ page: 1, limit: 10 });
      if (!data?.success || !Array.isArray(data.notifications)) {
        throw new Error(data?.message || "Could not load notifications.");
      }
      return data;
    },
    enabled: open,
    refetchInterval: open ? 15_000 : false,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  const markOne = useMutation({
    mutationFn: async (id) => {
      const { data } = await markNotificationAsRead(id);
      if (!data?.success) {
        throw new Error(data?.message || "Could not mark notification as read.");
      }
      return data;
    },
    onSuccess: invalidate,
  });

  const markAll = useMutation({
    mutationFn: async () => {
      const { data } = await markAllNotificationsAsRead();
      if (!data?.success) {
        throw new Error(data?.message || "Could not mark all as read.");
      }
      return data;
    },
    onSuccess: invalidate,
  });

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const unreadCount = unreadQuery.data ?? 0;
  const notifications = listQuery.data?.notifications ?? [];
  const badgeText = unreadCount > 99 ? "99+" : String(unreadCount);

  const listError = useMemo(() => {
    if (!listQuery.isError) return "";
    return getApiErrorMessage(listQuery.error, "Failed to load notifications.");
  }, [listQuery.error, listQuery.isError]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#34D399]/15 bg-[#0D241D] text-[#A7C4B8] transition hover:border-[#34D399]/40 hover:text-white"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#34D399] px-1 text-[10px] font-black leading-none text-[#06231A] ring-2 ring-[#050807]">
            {badgeText}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#07110D] shadow-2xl shadow-black/50"
        >
          <div className="flex items-center justify-between gap-3 border-b border-[#34D399]/10 px-4 py-3">
            <div>
              <p className="text-sm font-black text-white">Notifications</p>
              <p className="text-[11px] font-medium text-[#A7C4B8]">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => listQuery.refetch()}
                disabled={listQuery.isFetching}
                aria-label="Refresh notifications"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#A7C4B8] transition hover:bg-[#0D241D] hover:text-white disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${listQuery.isFetching ? "animate-spin" : ""}`}
                />
              </button>
              <button
                type="button"
                onClick={() => markAll.mutate()}
                disabled={markAll.isPending || unreadCount === 0}
                aria-label="Mark all as read"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#A7C4B8] transition hover:bg-[#0D241D] hover:text-white disabled:opacity-40"
              >
                {markAll.isPending ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCheck className="h-4 w-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close notifications"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#A7C4B8] transition hover:bg-[#0D241D] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {listQuery.isLoading && (
              <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm font-medium text-[#A7C4B8]">
                <LoaderCircle className="h-4 w-4 animate-spin text-[#34D399]" />
                Loading notifications...
              </div>
            )}

            {!listQuery.isLoading && listError && (
              <div className="px-4 py-8 text-center">
                <p className="text-sm font-medium text-red-300" role="alert">
                  {listError}
                </p>
                <button
                  type="button"
                  onClick={() => listQuery.refetch()}
                  className="mt-3 rounded-xl border border-[#34D399]/25 px-3 py-1.5 text-xs font-black text-[#D1FAE5] transition hover:bg-[#0D241D]"
                >
                  Try again
                </button>
              </div>
            )}

            {!listQuery.isLoading && !listError && notifications.length === 0 && (
              <div className="px-4 py-10 text-center">
                <p className="text-sm font-bold text-white">No notifications yet</p>
                <p className="mt-1 text-xs text-[#A7C4B8]">
                  New order alerts will appear here.
                </p>
              </div>
            )}

            {!listQuery.isLoading && !listError && notifications.length > 0 && (
              <ul className="divide-y divide-[#34D399]/10">
                {notifications.map((notification) => (
                  <li key={notification.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (!notification.isRead && notification.id) {
                          markOne.mutate(notification.id);
                        }
                      }}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-[#0D241D]/70 ${
                        notification.isRead ? "opacity-75" : "bg-[#34D399]/[0.03]"
                      }`}
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          notification.isRead ? "bg-transparent" : "bg-[#34D399]"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-start justify-between gap-2">
                          <span className="truncate text-sm font-bold text-white">
                            {notification.title || "Notification"}
                          </span>
                          <span className="shrink-0 text-[10px] font-semibold text-[#6EE7B7]/70">
                            {formatWhen(notification.createdAt)}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-[#A7C4B8]">
                          {notification.message}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {markOne.isError && (
            <div className="border-t border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-200">
              {getApiErrorMessage(markOne.error, "Could not update notification.")}
            </div>
          )}
          {markAll.isError && (
            <div className="border-t border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-200">
              {getApiErrorMessage(markAll.error, "Could not mark all as read.")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
