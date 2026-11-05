const range = (count) => Array.from({ length: count }, (_, index) => index);

export const Skeleton = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`block animate-pulse rounded-xl bg-[#34D399]/10 ${className}`}
  />
);

const StatCardSkeleton = () => (
  <div className="rounded-3xl border border-[#34D399]/10 bg-[#071B16]/60 p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-3 h-7 w-28" />
      </div>
      <Skeleton className="h-10 w-10 shrink-0 rounded-2xl" />
    </div>
    <Skeleton className="mt-4 h-3 w-32" />
  </div>
);

const TableRowSkeleton = () => (
  <div className="grid gap-3 border-b border-[#34D399]/10 px-4 py-4 last:border-b-0 sm:grid-cols-6 sm:items-center">
    <div className="sm:col-span-1">
      <Skeleton className="h-3.5 w-32" />
      <Skeleton className="mt-2 h-3 w-24" />
    </div>
    <Skeleton className="hidden h-3.5 w-24 sm:block" />
    <Skeleton className="hidden h-5 w-20 rounded-full sm:block" />
    <Skeleton className="hidden h-5 w-16 rounded-full sm:block" />
    <Skeleton className="hidden h-8 w-28 rounded-full sm:block" />
    <Skeleton className="hidden h-8 w-16 justify-self-end rounded-xl sm:block" />
  </div>
);

export const DashboardContentSkeleton = ({ showSummary = true }) => (
  <div
    className="w-full px-4 py-6 sm:px-6 lg:px-8 2xl:px-10"
    role="status"
    aria-live="polite"
    aria-label="Loading dashboard content"
  >
    {showSummary && (
      <div className="rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5 shadow-2xl shadow-[#071B16]/30 sm:p-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="mt-3 h-9 w-64 max-w-full" />
        <Skeleton className="mt-3 h-4 w-full max-w-2xl" />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {range(4).map((index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )}

    <div
      className={`rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-4 shadow-2xl shadow-[#071B16]/25 sm:p-5 ${
        showSummary ? "mt-6" : ""
      }`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <Skeleton className="h-6 w-44" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full" />
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row xl:w-auto">
          <Skeleton className="h-12 w-full rounded-2xl md:w-96" />
          <Skeleton className="h-12 w-full rounded-2xl md:w-56" />
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-3xl border border-[#34D399]/10 bg-[#071B16]/40">
        <div className="hidden grid-cols-6 gap-4 border-b border-[#34D399]/10 px-4 py-3 md:grid">
          {["w-20", "w-16", "w-14", "w-16", "w-14", "w-12"].map(
            (width, index) => (
              <Skeleton
                key={index}
                className={`h-3 ${width} ${index === 5 ? "justify-self-end" : ""}`}
              />
            ),
          )}
        </div>

        {range(showSummary ? 5 : 8).map((index) => (
          <TableRowSkeleton key={index} />
        ))}
      </div>
    </div>
  </div>
);

export const FormPageSkeleton = () => (
  <div
    className="w-full px-4 py-6 sm:px-6 lg:px-8 2xl:px-10"
    role="status"
    aria-live="polite"
    aria-label="Loading form"
  >
    <div className="rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5 shadow-2xl shadow-[#071B16]/30 sm:p-6">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-9 w-56 max-w-full" />
      <Skeleton className="mt-3 h-4 w-80 max-w-full" />
    </div>

    <div className="mt-6 rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5 shadow-2xl shadow-[#071B16]/25 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {range(6).map((index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-6 h-12 w-40 rounded-2xl bg-[#34D399]/20" />
    </div>
  </div>
);

export const ListPageSkeleton = () => (
  <div
    className="w-full px-4 py-6 sm:px-6 lg:px-8 2xl:px-10"
    role="status"
    aria-live="polite"
    aria-label="Loading list"
  >
    <div className="rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5 shadow-2xl shadow-[#071B16]/30 sm:p-6">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-3 h-9 w-56 max-w-full" />
      <div className="mt-5 flex flex-col gap-3 md:flex-row">
        <Skeleton className="h-12 w-full rounded-2xl md:max-w-96" />
        <Skeleton className="h-12 w-full rounded-2xl md:w-48" />
      </div>
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {range(8).map((index) => (
        <div
          key={index}
          className="rounded-3xl border border-[#34D399]/10 bg-[#0D241D] p-4"
        >
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="mt-4 h-4 w-3/4" />
          <Skeleton className="mt-2 h-3 w-1/2" />
          <Skeleton className="mt-4 h-9 w-full rounded-xl" />
        </div>
      ))}
    </div>
  </div>
);

export const AppSkeleton = () => (
  <div
    className="flex min-h-screen items-center justify-center bg-black px-4 py-10"
    role="status"
    aria-live="polite"
    aria-label="Loading admin panel"
  >
    <div className="w-full max-w-md rounded-3xl border border-[#34D399]/10 bg-[#0D241D] p-7 shadow-2xl shadow-black/40 sm:p-8">
      <Skeleton className="mx-auto h-14 w-14 rounded-2xl" />
      <Skeleton className="mx-auto mt-5 h-7 w-44" />
      <Skeleton className="mx-auto mt-3 h-4 w-60 max-w-full" />

      <div className="mt-8 space-y-4">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="h-14 w-full rounded-2xl" />
        <Skeleton className="mt-6 h-12 w-full rounded-2xl bg-[#34D399]/20" />
      </div>
    </div>
  </div>
);
