import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Clock,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { bannerData } from "./bannerdata";
import GroceryScene from "./GroceryScene";

const iconMap = {
  Leaf,
  BadgePercent,
  Truck,
  ShieldCheck,
  Clock,
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const Banner = () => {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), {
    stiffness: 140,
    damping: 18,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 140,
    damping: 18,
    mass: 0.6,
  });

  const handlePointerMove = (event) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-[#F6F3E8] px-3 py-8 sm:px-5 sm:py-12 lg:px-8">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#A7E8C1]/40 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#DDF4E5]/70 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.6, 0.35, 0.6] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#0B2B21_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative overflow-hidden rounded-[2rem] border border-[#A7E8C1]/25 bg-[#0B2B21] shadow-[0_35px_90px_-30px_rgba(11,43,33,0.65)] sm:rounded-[2.75rem]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 8% 0%, rgba(167,232,193,0.16), transparent 45%), radial-gradient(80% 80% at 100% 100%, rgba(221,244,229,0.12), transparent 50%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#A7E8C1]/70 to-transparent"
          />

          <div className="relative grid items-center gap-8 px-5 pb-2 pt-8 sm:px-9 sm:pt-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:px-12 lg:pb-4 lg:pt-12 xl:px-16">
            <div className="relative z-10 text-white">
              <motion.div
                variants={fadeUp}
                className="font-store-label inline-flex items-center gap-2 rounded-full border border-[#A7E8C1]/40 bg-[#A7E8C1]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#A7E8C1] backdrop-blur-sm sm:text-sm"
              >
                <motion.span
                  animate={prefersReducedMotion ? undefined : { rotate: [0, 14, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.span>
                {bannerData.badge}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-store-display mt-5 max-w-xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem] xl:text-6xl"
              >
                <span className="block">{bannerData.heading.line1}</span>
                <span className="mt-1 block bg-linear-to-r from-[#A7E8C1] via-[#DDF4E5] to-[#6EE7B7] bg-clip-text text-transparent">
                  {bannerData.heading.line2}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-lg text-sm font-medium leading-7 text-[#DDF4E5]/75 sm:text-base"
              >
                {bannerData.description}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  className="font-store-label group inline-flex items-center gap-2 rounded-full bg-[#A7E8C1] px-6 py-3.5 text-sm font-bold text-[#0B2B21] shadow-lg shadow-[#A7E8C1]/20 transition-colors hover:bg-[#DDF4E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDF4E5]"
                >
                  {bannerData.buttons[0].label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  className="font-store-label group inline-flex items-center gap-2 rounded-full border border-[#DDF4E5]/25 bg-[#10392C]/70 px-6 py-3.5 text-sm font-bold text-[#DDF4E5] backdrop-blur-sm transition-colors hover:border-[#A7E8C1]/60 hover:text-[#A7E8C1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDF4E5]"
                >
                  <Leaf className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
                  {bannerData.buttons[1].label}
                </motion.button>
              </motion.div>

              <motion.div variants={cardStagger} className="mt-7 grid max-w-xl gap-2.5 sm:grid-cols-3">
                {bannerData.cards.map((item) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                      className="group rounded-2xl border border-[#DDF4E5]/10 bg-[#10392C]/75 p-3.5 backdrop-blur-sm transition-colors hover:border-[#A7E8C1]/35"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#A7E8C1]/12 text-[#A7E8C1] transition group-hover:bg-[#A7E8C1] group-hover:text-[#0B2B21]">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <p className="font-store-label mt-2.5 text-sm font-bold text-[#F6F3E8]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-[#DDF4E5]/65">{item.text}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-[#DDF4E5]/80"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-[#A7E8C1] text-[#A7E8C1]" />
                  ))}
                </div>
                <span className="h-4 w-px bg-[#DDF4E5]/20" />
                <span className="font-store-label text-xs font-bold sm:text-sm">{bannerData.trust}</span>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              className="relative z-10 mx-auto w-full max-w-[540px] [perspective:1200px]"
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative h-[340px] w-full sm:h-[420px] lg:h-[510px] xl:h-[560px]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A7E8C1]/12 blur-3xl sm:h-80 sm:w-80"
                />
                <motion.div
                  aria-hidden
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#A7E8C1]/15"
                />

                <div className="absolute inset-0">
                  <GroceryScene />
                </div>

                <motion.div
                  style={{ transform: "translateZ(70px)" }}
                  animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-6 flex items-center gap-2.5 rounded-2xl border border-[#A7E8C1]/25 bg-[#0B2B21]/85 px-3.5 py-2.5 shadow-xl shadow-black/25 backdrop-blur-md sm:left-2 sm:top-8"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A7E8C1] text-[#0B2B21]">
                    <Leaf className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="font-store-label block text-xs font-black text-[#F6F3E8]">
                      {bannerData.floatingBadges.top.title}
                    </span>
                    <span className="block text-[10px] font-semibold text-[#A7E8C1]/75">
                      {bannerData.floatingBadges.top.text}
                    </span>
                  </span>
                </motion.div>

                <motion.div
                  style={{ transform: "translateZ(80px)" }}
                  animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-8 right-0 flex items-center gap-2.5 rounded-2xl border border-[#A7E8C1]/25 bg-[#0B2B21]/85 px-3.5 py-2.5 shadow-xl shadow-black/25 backdrop-blur-md sm:bottom-10 sm:right-2"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A7E8C1] text-[#0B2B21]">
                    <Truck className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="font-store-label block text-xs font-black text-[#F6F3E8]">
                      {bannerData.floatingBadges.bottom.title}
                    </span>
                    <span className="block text-[10px] font-semibold text-[#A7E8C1]/75">
                      {bannerData.floatingBadges.bottom.text}
                    </span>
                  </span>
                </motion.div>

                <div className="absolute inset-x-6 bottom-0 flex justify-center">
                  <span className="font-store-label rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#DDF4E5]/60 backdrop-blur-sm">
                    Fresh picks · 3D preview
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative z-10 mt-2 grid grid-cols-3 divide-x divide-[#A7E8C1]/15 border-t border-[#A7E8C1]/15 bg-white/[0.03] px-4 py-5 sm:px-9 lg:px-12 xl:px-16"
          >
            {bannerData.stats.map((stat) => (
              <div key={stat.label} className="px-2 first:pl-0 last:pr-0 sm:px-4">
                <p className="font-store-display text-lg font-black text-[#F6F3E8] sm:text-2xl">
                  {stat.value}
                </p>
                <p className="font-store-label mt-0.5 text-[9px] font-bold uppercase tracking-wide text-[#A7E8C1]/65 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
