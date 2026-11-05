export const addressPageStyles = {
  mainContainer:
    "relative min-h-screen overflow-hidden bg-[#000000] text-[#D1FAE5]",
  section:
    "relative overflow-hidden px-3 py-8 sm:px-5 sm:py-10 lg:px-6 xl:px-8",
  bgGradient1:
    "absolute inset-x-0 top-0 h-72 bg-linear-to-b from-[#34D399]/12 via-[#0D241D]/8 to-transparent",
  bgLine:
    "absolute left-0 top-28 h-px w-full bg-linear-to-r from-transparent via-[#34D399]/25 to-transparent",
  gridContainer:
    "relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start xl:gap-8",
  leftColumn: "space-y-5 lg:space-y-6",
  badge:
    "font-store-label inline-flex items-center gap-2 rounded-full border border-[#34D399]/25 bg-[#34D399]/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-[#6EE7B7]",
  iconBadge: "h-4 w-4",
  heading:
    "font-store-display text-3xl font-black tracking-wide text-[#D1FAE5] sm:text-4xl xl:text-5xl",
  headingSpan: "block text-[#6EE7B7]",
  subheading: "mt-4 max-w-xl text-base font-semibold leading-7 text-[#A7C4B8]",
  infoGrid: "grid gap-3 md:grid-cols-2",
  infoCard:
    "rounded-2xl border border-[#1F3B32] bg-[#0D241D]/80 p-4 shadow-xl shadow-black/20 lg:p-5",
  infoLabel:
    "font-store-label text-xs font-black uppercase tracking-wide text-[#34D399]",
  infoValue: "mt-2 text-sm font-semibold text-[#A7C4B8]",
  selectedContainer:
    "rounded-3xl border border-[#34D399]/25 bg-[#0D241D] p-4 shadow-xl shadow-black/20 lg:p-5",
  selectedLabel:
    "font-store-label text-sm font-black uppercase tracking-wide text-[#34D399]",
  selectedTypeBadge:
    "mt-2 inline-flex rounded-full bg-[#34D399] px-3 py-1 text-xs font-black text-[#065F46]",
  selectedDetails: "mt-3 text-sm leading-6 text-[#A7C4B8]",
  selectedName: "font-bold text-[#D1FAE5]",
  formContainer:
    "rounded-4xl border border-[#1F3B32] bg-[#0D241D] p-4 text-[#D1FAE5] shadow-2xl shadow-[#34D399]/5 sm:p-6 xl:p-7",
  savedAlert:
    "mb-5 flex items-center gap-3 rounded-2xl border border-[#34D399]/40 bg-[#34D399]/10 px-4 py-3 text-sm font-bold text-[#6EE7B7]",
  iconSuccess: "h-5 w-5 text-[#34D399]",
  formHeader: "mb-6 flex items-start justify-between gap-4",
  formLabel:
    "font-store-label text-sm font-black uppercase tracking-wide text-[#34D399]",
  formTitle:
    "font-store-display mt-2 text-2xl font-black tracking-wide text-[#D1FAE5] sm:text-3xl",
  addButton:
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#34D399] text-[#065F46] transition hover:bg-[#6EE7B7]",
  form: "space-y-4",
  labelText:
    "font-store-label mb-2 block text-sm font-bold text-[#D1FAE5]",
  selectInput:
    "w-full rounded-2xl border border-[#1F3B32] bg-[#071B16]/70 px-4 py-3.5 text-sm font-semibold text-[#D1FAE5] outline-none transition focus:border-[#34D399]/60 focus:ring-2 focus:ring-[#34D399]/10 [&>option]:bg-[#0D241D] [&>option]:text-[#D1FAE5]",
  inputWrapper:
    "flex items-center gap-3 rounded-2xl border border-[#1F3B32] bg-[#071B16]/70 px-4 py-3.5 transition focus-within:border-[#34D399]/60 focus-within:ring-2 focus-within:ring-[#34D399]/10",
  iconInput: "h-5 w-5 text-[#34D399]",
  inputField:
    "w-full bg-transparent text-sm font-semibold text-[#D1FAE5] outline-none placeholder:text-[#A7C4B8]/65",
  textareaField:
    "w-full resize-none bg-transparent text-sm font-semibold leading-6 text-[#D1FAE5] outline-none placeholder:text-[#A7C4B8]/65",
  submitButton:
    "font-store-label inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#34D399] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#065F46] shadow-lg shadow-[#34D399]/10 transition hover:-translate-y-0.5 hover:bg-[#6EE7B7] disabled:cursor-wait disabled:opacity-70",
  loaderIcon: "h-5 w-5 animate-spin",
  iconSm: "h-5 w-5",
  addressBookContainer: "relative mx-auto mt-10 max-w-7xl",
  addressBookHeader:
    "mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
  addressBookLabel:
    "font-store-label text-xs font-black uppercase tracking-wide text-[#34D399]",
  addressBookTitle:
    "font-store-display mt-1 text-2xl font-black text-[#D1FAE5]",
  addressCount: "text-sm font-semibold text-[#A7C4B8]",
  emptyState:
    "rounded-3xl border border-[#1F3B32] bg-[#0D241D]/70 p-6 text-[#A7C4B8]",
  addressGrid: "grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-5",
  addressCardBase:
    "group flex h-full min-h-72 flex-col rounded-[1.35rem] border p-4 shadow-xl backdrop-blur transition hover:-translate-y-1 lg:min-h-76 xl:p-5",
  addressCardSelected:
    "border-[#34D399]/60 bg-linear-to-br from-[#34D399]/18 via-[#34D399]/10 to-[#071B16] shadow-[#34D399]/10",
  addressCardDefault:
    "border-[#1F3B32] bg-[#0D241D] shadow-black/25 hover:border-[#34D399]/35 hover:bg-[#0D241D]",
  addressCardTop: "flex items-start justify-between gap-3",
  addressCardInfo: "min-w-0",
  addressCardIcon:
    "mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#34D399] text-[#065F46] shadow-lg shadow-[#34D399]/20",
  addressCardName:
    "font-store-label truncate text-lg font-black text-[#D1FAE5]",
  addressCardMobile: "mt-1 text-sm font-bold text-[#A7C4B8]",
  addressCardBadges: "flex shrink-0 flex-col items-end gap-2",
  selectedBadge:
    "rounded-full border border-[#34D399]/40 bg-[#34D399]/15 px-3 py-1 text-xs font-black text-[#6EE7B7]",
  typeBadge:
    "rounded-full bg-[#34D399] px-3 py-1 text-xs font-black text-[#065F46]",
  addressCardDetails:
    "mt-4 flex-1 rounded-2xl border border-[#1F3B32] bg-[#071B16] p-3 text-sm leading-6 text-[#A7C4B8] xl:p-4",
  pinText: "font-bold text-[#D1FAE5]",
  landmarkText: "mt-1 text-[#A7C4B8]",
  addressCardActions: "mt-4 grid grid-cols-[1fr_auto] gap-3",
  useAddressButtonBase:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition",
  useAddressButtonSelected:
    "bg-[#071B16] text-[#A7C4B8] ring-1 ring-[#1F3B32]",
  useAddressButtonDefault: "bg-[#34D399] text-[#065F46] hover:bg-[#6EE7B7]",
  editButton:
    "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#1F3B32] bg-[#071B16] text-[#A7C4B8] transition hover:border-[#34D399] hover:bg-[#34D399] hover:text-[#065F46]",
};

export const bannerStyles = {
  section: "relative overflow-hidden bg-[#F6F3E8] py-6 sm:py-8",
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  innerContainer:
    "relative overflow-hidden rounded-4xl border border-[#A7E8C1]/25 bg-[#0B2B21]",

  // Decorative gradients (inline styles)
  decorGradient1: {
    background:
      "radial-gradient(circle at top left, rgba(167,232,193,0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(221,244,229,0.10), transparent 32%)",
  },
  decorGradient2: {
    background:
      "linear-gradient(135deg, rgba(221,244,229,0.04), transparent 40%, rgba(167,232,193,0.04))",
  },

  gridContainer:
    "relative grid min-h-auto grid-cols-1 items-center gap-6 px-5 py-7 xl:min-h-95 xl:grid-cols-2 xl:px-12",
  leftColumn: "relative z-10 space-y-4 text-white",

  badge:
    "font-store-label inline-flex items-center gap-2 rounded-full border border-[#A7E8C1]/40 bg-[#A7E8C1]/10 px-4 py-2 text-sm font-bold text-[#A7E8C1] backdrop-blur-sm",
  iconSmall: "h-4 w-4",

  headingWrapper: "space-y-3",
  heading:
    "font-store-display max-w-xl text-3xl font-black leading-tight tracking-wide sm:text-4xl lg:text-5xl",
  headingHighlight: "block text-[#A7E8C1]",
  description:
    "max-w-lg text-sm font-medium leading-6 text-[#F6F3E8]/80 sm:text-base",

  buttonsWrapper: "flex flex-wrap items-center gap-3",
  primaryButton:
    "font-store-label inline-flex items-center gap-2 rounded-full bg-[#A7E8C1] px-5 py-2.5 text-sm font-bold text-[#0B2B21] shadow-lg shadow-[#A7E8C1]/20 transition-transform duration-300 hover:-translate-y-1 hover:bg-[#DDF4E5]",
  secondaryButton:
    "font-store-label inline-flex items-center gap-2 rounded-full border border-[#DDF4E5]/25 bg-[#10392C]/70 px-5 py-2.5 text-sm font-bold text-[#DDF4E5] transition duration-300 hover:border-[#A7E8C1]/60 hover:text-[#A7E8C1]",

  cardsContainer: "grid max-w-xl grid-cols-1 gap-3 pt-1 sm:grid-cols-3",
  card: "rounded-2xl border border-[#DDF4E5]/10 bg-[#10392C]/75 p-3.5 backdrop-blur-sm",
  cardIcon: "h-5 w-5 text-[#A7E8C1]",
  cardTitle: "font-store-label mt-2 text-sm font-bold text-[#F6F3E8]",
  cardText: "text-xs font-medium text-[#DDF4E5]/70",

  trustMessage:
    "font-store-label flex items-center gap-2 pt-1 text-sm font-bold text-[#F6F3E8]/80",
  starIcon: "h-4 w-4 fill-[#A7E8C1] text-[#A7E8C1]",

  rightColumn:
    "relative z-10 hidden min-h-80 items-center justify-center xl:flex",
};

export const cartPageStyles = {
  mainContainer:
    "relative min-h-screen overflow-hidden bg-[#000000] px-4 py-8 text-[#D1FAE5] sm:px-6 lg:px-8",

  bgGradient1:
    "absolute inset-x-0 top-0 h-80 bg-linear-to-b from-[#34D399]/12 via-[#0D241D]/8 to-transparent",
  bgLine:
    "absolute left-0 top-28 h-px w-full bg-linear-to-r from-transparent via-[#34D399]/25 to-transparent",

  toast:
    "fixed right-4 top-6 z-50 flex items-center gap-3 rounded-2xl border border-[#34D399]/35 bg-[#0D241D] px-4 py-3 text-sm font-black text-[#D1FAE5] shadow-2xl shadow-[#34D399]/10",
  iconMd: "h-5 w-5",

  section: "relative mx-auto max-w-384",

  headerWrapper:
    "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",

  badge:
    "font-store-label inline-flex items-center gap-2 rounded-full border border-[#34D399]/25 bg-[#34D399]/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-[#6EE7B7]",
  iconSm: "h-4 w-4",

  heading:
    "font-store-display mt-4 text-4xl font-black tracking-wide text-[#D1FAE5] sm:text-5xl",
  itemCount: "mt-3 text-sm font-semibold text-[#A7C4B8]",

  continueButton:
    "font-store-label inline-flex w-fit items-center justify-center rounded-full border border-[#34D399]/30 bg-[#0D241D] px-5 py-3 text-sm font-black text-[#D1FAE5] transition hover:border-[#34D399]/60 hover:bg-[#123128] hover:text-[#6EE7B7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]",

  emptyContainer:
    "flex min-h-[52vh] flex-col items-center justify-center rounded-4xl border border-[#1F3B32] bg-[#0D241D]/70 p-8 text-center shadow-2xl shadow-[#34D399]/5",
  emptyIconWrapper:
    "flex h-20 w-20 items-center justify-center rounded-3xl border border-[#34D399]/20 bg-[#071B16] text-[#34D399] shadow-xl shadow-[#34D399]/10",
  iconLg: "h-9 w-9",
  emptyTitle: "font-store-display mt-5 text-3xl font-black text-[#D1FAE5]",
  emptySubtext: "mt-2 max-w-md text-sm font-semibold leading-6 text-[#A7C4B8]",

  cartGrid: "grid items-start gap-5 xl:grid-cols-[1fr_320px]",
  productGrid:
    "grid auto-rows-max items-start gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-5",

  productCard:
    "group flex h-fit flex-col overflow-hidden rounded-3xl border border-[#1F3B32] bg-[#0D241D] text-[#D1FAE5] shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-[#34D399]/45 hover:shadow-[0_22px_56px_rgba(0,0,0,0.38)]",
  productImageWrapper: "border-b border-[#1F3B32]/80 bg-[#071B16] p-3",
  productImage: "h-24 w-full object-contain",

  productContent: "flex flex-1 flex-col p-3",
  productHeader: "flex items-start justify-between gap-2",
  productInfo: "min-w-0",
  productCategory:
    "font-store-label text-[10px] font-black uppercase tracking-wide text-[#34D399]",
  productName:
    "font-store-label mt-1 line-clamp-2 text-sm font-black leading-snug text-[#D1FAE5]",
  productCompany: "mt-1 truncate text-xs font-bold text-[#A7C4B8]",

  removeButton:
    "inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#1F3B32] bg-[#071B16] text-[#A7C4B8] transition hover:border-red-400/35 hover:bg-red-400/10 hover:text-red-200 disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]",

  sizeWrapper: "mt-2 flex flex-wrap gap-1.5",
  sizeBadge:
    "font-store-label rounded-full border border-[#1F3B32] bg-[#071B16] px-2.5 py-1 text-[11px] font-bold text-[#A7C4B8]",

  priceContainer:
    "mt-2 rounded-2xl border border-[#1F3B32]/80 bg-[#071B16] px-3 py-2",
  priceRow: "flex items-baseline gap-2",
  priceCurrent: "font-store-display text-lg font-black text-[#D1FAE5]",
  priceOld: "font-store-label text-xs font-bold text-[#A7C4B8]/65 line-through",
  priceTotal: "mt-1 text-xs font-bold text-[#A7C4B8]",

  quantityControls:
    "font-store-label mt-3 inline-flex h-10 w-32 items-center justify-between rounded-full border border-[#1F3B32] bg-[#071B16] px-1.5 text-sm font-black text-[#D1FAE5]",
  qtyButton:
    "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#34D399] text-[#065F46] transition hover:bg-[#6EE7B7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7]",

  summaryAside:
    "h-fit rounded-3xl border border-[#1F3B32] bg-[#0D241D] p-5 text-[#D1FAE5] shadow-2xl shadow-[#34D399]/5 xl:sticky xl:top-24",
  summaryLabel:
    "font-store-label text-xs font-black uppercase tracking-wide text-[#34D399]",
  summaryTitle: "font-store-display mt-2 text-2xl font-black text-[#D1FAE5]",

  summaryDetails: "mt-5 space-y-3 text-sm font-bold",
  summaryRow: "flex justify-between text-[#A7C4B8]",
  summaryDivider: "h-px bg-[#1F3B32]",
  summaryTotal: "flex justify-between text-lg font-black text-[#D1FAE5]",

  paymentSection: "mt-6",
  paymentLabel:
    "font-store-label mb-3 text-sm font-black uppercase tracking-wide text-[#A7C4B8]",
  paymentOptions: "grid gap-3",

  paymentButtonBase:
    "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]",
  paymentButtonActive:
    "border-[#34D399]/45 bg-[#071B16] text-[#6EE7B7] shadow-inner shadow-[#34D399]/5",
  paymentButtonInactive:
    "border-[#1F3B32] bg-[#071B16]/50 text-[#A7C4B8] hover:border-[#34D399]/35 hover:bg-[#071B16] hover:text-[#D1FAE5]",

  checkoutButton:
    "font-store-label mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#34D399] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#065F46] shadow-lg shadow-[#34D399]/10 transition hover:-translate-y-0.5 hover:bg-[#6EE7B7] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7]",
};

export const footerStyles = {
  footer:
    "relative overflow-hidden border-t border-[#A7E8C1]/20 bg-[#0B2B21] text-[#F6F3E8]",

  // Decorative glow backgrounds
  decorGlow1:
    "absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#A7E8C1]/10 blur-3xl animate-pulse",
  decorGlow2:
    "absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#10392C]/80 blur-3xl",
  decorGlow3:
    "absolute left-0 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-[#A7E8C1]/5 blur-3xl",

  container: "relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8",
  grid: "grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.75fr_1.7fr_1fr]",

  // Brand
  brandWrapper: "space-y-4",
  brandHeader: "flex items-center gap-3",
  logoContainer:
    "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl border border-[#A7E8C1]/45 bg-[#F6F3E8] p-1.5 shadow-xl shadow-black/20",
  logoDot:
    "absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#A7E8C1] shadow-sm shadow-[#A7E8C1]/40",
  logoImage: "relative h-full w-full object-contain",
  brandTitle:
    "font-serif text-2xl font-black italic tracking-wide text-[#F6F3E8] sm:text-3xl",
  brandHighlight: "text-[#A7E8C1]",
  brandDescription: "max-w-sm text-sm font-medium leading-6 text-[#F6F3E8]/70",

  // Quick Links
  sectionTitle:
    "font-store-display mb-5 text-xl font-black tracking-wide text-[#A7E8C1]",
  linkList: "space-y-3",
  linkItem:
    "font-store-label group inline-flex items-center gap-2 font-bold text-[#F6F3E8]/75 transition hover:translate-x-1 hover:text-[#A7E8C1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A7E8C1]",
  linkBullet:
    "h-1.5 w-1.5 rounded-full bg-[#A7E8C1]/70 transition group-hover:scale-125",
  linkArrow: "h-4 w-4 opacity-0 transition group-hover:opacity-100",

  // Categories
  categoriesTitle:
    "font-store-display mb-5 w-full border-b border-[#A7E8C1]/25 pb-3 text-2xl font-black tracking-wide text-[#A7E8C1]",
  categoriesGrid:
    "grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3",
  categoryLink:
    "font-store-label cursor-pointer text-left text-sm font-bold leading-snug text-[#F6F3E8]/70 transition hover:translate-x-1 hover:text-[#A7E8C1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7E8C1]",

  // Contact
  contactList: "space-y-4 text-sm font-medium text-[#F6F3E8]/70",
  contactItem: "flex items-start gap-3",
  contactIcon: "mt-0.5 h-4 w-4 text-[#A7E8C1]",
  websiteButton:
    "font-store-label group mt-5 inline-flex items-center gap-2 rounded-2xl border border-[#A7E8C1]/25 bg-[#10392C] px-4 py-3 font-bold text-[#DDF4E5] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-[#A7E8C1]/50 hover:bg-[#164735] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7E8C1]",
  websiteIcon: "h-4 w-4 transition group-hover:rotate-12",
  websiteArrow:
    "h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5",

  // Bottom bar
  bottomBar: "mt-12 border-t border-[#A7E8C1]/15 pt-6",
  bottomBarInner:
    "flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left",
  copyright: "text-sm font-medium text-[#F6F3E8]/60",
  designerWrapper:
    "group flex items-center gap-2 text-sm font-medium text-[#F6F3E8]/70",
  designerLabel: "text-[#F6F3E8]/55",
  designerLink:
    "font-store-label inline-flex items-center gap-2 font-bold text-[#A7E8C1] transition hover:text-[#DDF4E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7E8C1]",
  designerArrow:
    "h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5",

  // Glow line (inline style + classes)
  glowLine:
    "pointer-events-none absolute left-1/2 top-0 h-1 w-40 -translate-x-1/2 rounded-b-full bg-linear-to-r from-transparent via-[#A7E8C1] to-transparent blur-sm",
  glowAnimation: { animation: "torchMove 4s ease-in-out infinite" },
};

export const hookahPageStyles = {
  section:
    "relative min-h-screen scroll-mt-24 overflow-hidden bg-linear-to-br from-[#071B16] via-[#0B2B21] to-[#123128] px-4 py-14 text-[#F6F3E8] sm:px-6 sm:py-16",
  container: "relative mx-auto max-w-7xl",
  ambientGlow:
    "pointer-events-none absolute -right-36 -top-32 h-96 w-96 rounded-full bg-[#34D399]/10 blur-3xl",
  headerWrapper: "mx-auto mb-10 max-w-3xl text-center sm:mb-14",
  badge:
    "font-store-label mb-5 inline-flex items-center rounded-full border border-[#A7E8C1]/25 bg-[#A7E8C1]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#A7E8C1] sm:text-sm",
  heading:
    "font-store-display text-4xl font-black leading-tight tracking-wide text-[#F6F3E8] sm:text-5xl md:text-6xl",
  highlight:
    "bg-linear-to-r from-[#A7E8C1] via-[#DDF4E5] to-[#6EE7B7] bg-clip-text text-transparent",
  divider:
    "mx-auto mt-6 h-px w-32 bg-linear-to-r from-transparent via-[#A7E8C1]/80 to-transparent",

  productGrid:
    "grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4",
  productGridCompact:
    "mx-auto grid w-full max-w-4xl grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5",
  cardMotion: "h-full",

  productCard:
    "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#A7E8C1]/12 bg-[#0D241D] text-[#F6F3E8] shadow-[0_18px_48px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A7E8C1]/45 hover:shadow-[0_26px_64px_rgba(0,0,0,0.45)]",
  cardOverlay1:
    "pointer-events-none absolute inset-0 bg-linear-to-br from-[#A7E8C1]/8 via-transparent to-[#34D399]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
  cardOverlay2:
    "pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-[#34D399]/12 blur-2xl",
  cardOverlay3:
    "pointer-events-none absolute -bottom-10 left-0 h-24 w-24 rounded-full bg-[#A7E8C1]/12 blur-2xl",
  cardContent: "relative flex h-full flex-col",

  imageWrapper:
    "relative flex h-56 items-center justify-center overflow-hidden border-b border-[#A7E8C1]/10 bg-linear-to-br from-[#10392C] via-[#0B2B21] to-[#071B16] p-5 sm:h-64",
  productImage:
    "h-full w-full object-contain transition-transform duration-500 group-hover:scale-110",

  productInfo: "flex flex-1 flex-col p-4 sm:p-5",
  productName:
    "font-store-label line-clamp-2 text-base font-black leading-snug tracking-wide text-[#F6F3E8]",
  productCompany: "mt-1 truncate text-sm font-semibold text-[#A7C4B8]",
  sizeBadge:
    "font-store-label mt-3 inline-flex w-fit rounded-full border border-[#A7E8C1]/20 bg-[#A7E8C1]/10 px-3 py-1 text-xs font-bold text-[#A7E8C1]",

  priceContainer:
    "mt-4 rounded-2xl border border-[#A7E8C1]/10 bg-[#071B16] px-4 py-3",
  priceRow: "mt-1 flex items-baseline gap-2",
  priceCurrent: "font-store-display text-2xl font-black text-[#F6F3E8]",
  priceOld:
    "font-store-label text-sm font-bold text-[#A7C4B8]/60 line-through",

  actionWrapper: "mt-auto flex justify-center pt-4",

  quantityControls:
    "font-store-label inline-flex h-11 w-full max-w-48 items-center justify-between rounded-full border border-[#A7E8C1]/20 bg-[#071B16] px-2 text-sm font-black text-[#DDF4E5] shadow-md shadow-black/20",
  qtyButton:
    "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#A7E8C1] text-[#0B2B21] transition hover:bg-[#DDF4E5]",
  qtyValue: "min-w-10 text-center",

  addButton:
    "font-store-label inline-flex h-11 w-full max-w-56 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A7E8C1] px-4 text-sm font-bold text-[#0B2B21] shadow-lg shadow-[#A7E8C1]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DDF4E5] active:scale-[0.98]",

  cardBottomBar:
    "h-1 w-0 bg-[#34D399] transition-all duration-500 group-hover:w-full",

  viewMoreWrapper: "mt-12 flex justify-center",
  viewMoreLink:
    "font-store-label group inline-flex items-center gap-2 rounded-full border border-[#A7E8C1]/30 bg-[#A7E8C1]/10 px-7 py-3 font-bold text-[#DDF4E5] shadow-lg shadow-black/10 transition-all duration-300 hover:border-[#A7E8C1]/60 hover:bg-[#A7E8C1]/15 hover:text-white",
  viewMoreArrow: "transition-transform duration-300 group-hover:translate-x-1",

  statePanel:
    "flex min-h-56 flex-col items-center justify-center rounded-3xl border border-[#A7E8C1]/15 bg-[#10392C]/70 px-6 py-10 text-center shadow-xl shadow-black/10",
  stateIcon: "h-9 w-9 text-[#A7E8C1]",
  stateTitle: "font-store-display mt-4 text-xl font-bold text-[#F6F3E8]",
  stateText: "mt-2 max-w-md text-sm leading-6 text-[#DDF4E5]/70",
  stateAction:
    "font-store-label mt-5 inline-flex items-center gap-2 rounded-full bg-[#A7E8C1] px-5 py-2.5 text-sm font-bold text-[#0B2B21] transition hover:bg-[#DDF4E5]",
};

export const loginPageStyles = {
  // Main container
  mainContainer:
    "auth-page min-h-screen overflow-hidden bg-[#000000] text-[#D1FAE5]",

  // Toast shared styles
  toastBase:
    "fixed right-4 top-4 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl transition-all duration-500 sm:right-6",
  toastSuccess:
    "border-[#34D399]/30 bg-[#071B16]/95 text-[#D1FAE5] shadow-[#34D399]/10",
  toastError:
    "border-red-400/50 bg-[#071B16]/95 text-red-200 shadow-red-500/20",
  toastVisible: "translate-y-0 opacity-100",
  toastHidden: "-translate-y-4 opacity-0",
  toastIconWrapperSuccess:
    "flex h-9 w-9 items-center justify-center rounded-full bg-[#34D399] text-[#065F46]",
  toastIconWrapperError:
    "flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white",
  toastTitle: "font-store-label block text-sm font-black",
  toastSubtext: "text-xs font-semibold text-[#A7C4B8]",

  // Icons
  iconSm: "h-4 w-4",
  iconMd: "h-5 w-5",

  // Decorative backgrounds (inline styles)
  decorBg: "absolute inset-0",
  decorGradients: {
    background: "none",
  },
  decorLine: "hidden",

  // Section grid
  section:
    "relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8",

  // Left column (hidden on mobile, shown on lg+)
  leftColumn: "order-2 md:hidden lg:block hidden space-y-8 lg:order-1",

  // Logo
  logoLink: "inline-flex items-center gap-3",
  logoWrapper:
    "flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1F3B32] bg-[#0D241D] p-1.5 shadow-xl shadow-[#34D399]/10 ring-1 ring-[#34D399]/20",
  logoImage: "h-full w-full object-contain",
  logoText:
    "font-serif block text-2xl font-black italic tracking-wide text-[#D1FAE5]",
  logoSubtext:
    "font-store-label text-xs font-bold uppercase tracking-wide text-[#34D399]",

  // Hero
  heroWrapper: "max-w-xl space-y-5",
  heroBadge:
    "font-store-label inline-flex items-center gap-2 rounded-full border border-[#34D399]/25 bg-[#34D399]/10 px-4 py-2 text-sm font-bold text-[#6EE7B7]",
  heroHeading:
    "font-store-display text-4xl font-black leading-tight tracking-wide text-[#D1FAE5] sm:text-5xl",
  heroHighlight: "block text-[#6EE7B7]",
  heroDescription: "max-w-lg text-base font-medium leading-7 text-[#A7C4B8]",

  // Feature cards
  featureGrid: "grid max-w-xl gap-3 sm:grid-cols-3",
  featureCard: "rounded-2xl border border-[#1F3B32] bg-[#0D241D]/80 p-4",
  featureIcon: "h-5 w-5 text-[#34D399]",
  featureLabel: "font-store-label mt-3 text-sm font-bold text-[#D1FAE5]",

  // Right column (form)
  rightColumn: "order-1 lg:order-2",
  form: "mx-auto w-full max-w-md rounded-4xl border border-[#1F3B32] bg-[#0D241D] p-6 text-[#D1FAE5] shadow-2xl shadow-[#34D399]/5 sm:p-8",

  // Form header
  formHeader: "mb-7",
  formLabel:
    "font-store-label text-sm font-black uppercase tracking-wide text-[#34D399]",
  formTitle:
    "font-store-display mt-2 text-3xl font-black tracking-wide text-[#D1FAE5]",

  // Form fields
  formFields: "space-y-4",
  inputLabel: "font-store-label mb-2 block text-sm font-bold text-[#D1FAE5]",
  inputWrapper:
    "flex items-center gap-3 rounded-2xl border border-[#1F3B32] bg-[#071B16]/70 px-4 py-3.5 transition focus-within:border-[#34D399]/60 focus-within:ring-2 focus-within:ring-[#34D399]/10",
  inputIcon: "h-5 w-5 text-[#34D399]",
  inputField:
    "auth-field w-full bg-transparent text-sm font-semibold text-[#D1FAE5] outline-none placeholder:text-[#A7C4B8]/65",
  togglePasswordButton:
    "rounded-full p-1 text-[#A7C4B8] transition hover:bg-[#123128] hover:text-[#6EE7B7]",

  // Forgot password
  forgotPasswordWrapper: "mt-2 flex justify-end",
  forgotPasswordLink:
    "text-sm font-semibold text-[#34D399] transition hover:text-[#6EE7B7] hover:underline",

  // Submit button
  submitButton:
    "font-store-label mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#34D399] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#065F46] shadow-lg shadow-[#34D399]/10 transition hover:-translate-y-0.5 hover:bg-[#6EE7B7] disabled:cursor-wait disabled:opacity-80",

  // Signup prompt
  signupPrompt: "mt-6 text-center text-sm font-semibold text-[#A7C4B8]",
  signupLink:
    "font-store-label font-black text-[#34D399] underline decoration-[#34D399] decoration-2 underline-offset-4 transition hover:text-[#6EE7B7]",
};

export const navbarStyles = {
  // Header (sticky, with conditional visibility)
  headerBase:
    "sticky top-0 z-50 w-full border-b border-[#A7E8C1]/25 bg-[#0B2B21]/95 shadow-sm backdrop-blur-md transition-transform duration-300",
  headerVisible: "translate-y-0",
  headerHidden: "-translate-y-full",

  // Container
  container:
    "mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 sm:px-6 xl:flex-row xl:items-center xl:px-8",

  // Logo link and wrapper
  logoLink: "flex shrink-0 items-center justify-between gap-3 xl:justify-start",
  logoWrapper: "flex items-center gap-3",
  logoImageWrapper:
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#10392C] p-1 shadow-md ring-1 ring-[#A7E8C1]/25 sm:h-12 sm:w-12",
  logoImage: "h-full w-full object-contain",
  logoTextWrapper: "leading-tight",
  logoTitle:
    "font-serif italic text-base font-black tracking-wide text-[#DDF4E5] sm:text-xl",
  logoSubtitle:
    "font-store-label text-[10px] font-bold uppercase tracking-wide text-[#A7E8C1]/80 sm:text-xs",

  // Search form
  searchForm: "flex w-full flex-1 justify-center",
  searchContainer:
    "flex w-full max-w-2xl items-center overflow-hidden rounded-full bg-[#10392C] shadow-md ring-1 ring-[#A7E8C1]/25 transition-all duration-200 focus-within:ring-[#A7E8C1]/70",
  searchInputWrapper: "flex flex-1 items-center gap-3 px-4",
  searchIcon: "h-4 w-4 text-[#A7E8C1]/80",
  searchInput:
    "font-store-label w-full bg-transparent text-sm text-[#F6F3E8] outline-none placeholder:font-medium placeholder:text-[#DDF4E5]/65",
  searchButton:
    "font-store-label cursor-pointer bg-[#A7E8C1] px-3 py-3 text-sm font-bold text-[#0B2B21] transition-colors hover:bg-[#DDF4E5] focus-visible:outline-none focus-visible:shadow-[inset_0_0_0_2px_#0B2B21] sm:px-5",

  // Right side actions
  actionsWrapper:
    "grid w-full shrink-0 grid-cols-3 gap-1.5 sm:flex sm:items-center sm:justify-center sm:gap-2 xl:w-auto",

  // Common action button (used for orders, cart, login, account)
  actionButton:
    "font-store-label inline-flex min-h-11 cursor-pointer items-center justify-center gap-1 rounded-full bg-[#10392C] px-1.5 py-2.5 text-xs font-bold text-[#F6F3E8] shadow-md ring-1 ring-[#A7E8C1]/25 transition-transform hover:scale-[1.02] hover:bg-[#A7E8C1] hover:text-[#0B2B21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDF4E5] sm:gap-2 sm:px-4 sm:text-sm",
  actionIcon: "h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4",

  // Cart button (extends actionButton but adds background black)
  cartButton:
    "font-store-label relative inline-flex min-h-11 cursor-pointer items-center justify-center gap-1 rounded-full bg-[#A7E8C1] px-1.5 py-2.5 text-xs font-bold text-[#0B2B21] shadow-md transition-transform hover:bg-[#DDF4E5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDF4E5] sm:gap-2 sm:px-4 sm:text-sm",
  cartBadge:
    "absolute -right-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#0B2B21] px-1.5 text-xs font-black text-[#DDF4E5] ring-2 ring-[#A7E8C1]",

  // Account dropdown
  accountDropdownWrapper: "group relative min-w-0",
  dropdownChevron:
    "hidden h-4 w-4 shrink-0 transition group-hover:rotate-180 sm:block",

  dropdownMenu:
    "absolute right-0 top-full z-50 mt-3 w-52 rounded-2xl border border-[#A7E8C1]/35 bg-[#0B2B21] p-2 shadow-2xl shadow-black/25 transition-all duration-200",
  dropdownOpen: "visible translate-y-0 opacity-100",
  dropdownClosed: "invisible translate-y-2 opacity-0",

  dropdownItem:
    "font-store-label flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-[#F6F3E8] transition hover:bg-[#A7E8C1] hover:text-[#0B2B21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DDF4E5]",
  dropdownIcon: "h-4 w-4",
};

export const ordersPageStyles = {
  // Main container
  mainContainer:
    "relative min-h-screen overflow-hidden bg-[#000000] px-4 py-8 text-[#D1FAE5] sm:px-6 lg:px-8",

  // Decorative backgrounds
  bgGradient1:
    "absolute inset-x-0 top-0 h-80 bg-linear-to-b from-[#34D399]/12 via-[#0D241D]/8 to-transparent",
  bgLine:
    "absolute left-0 top-28 h-px w-full bg-linear-to-r from-transparent via-[#34D399]/25 to-transparent",

  // Toast
  toastContainer:
    "fixed right-4 top-6 z-50 flex items-center gap-3 rounded-2xl border border-[#34D399]/35 bg-[#0D241D] px-4 py-3 text-sm font-black text-[#D1FAE5] shadow-2xl shadow-[#34D399]/10",
  iconMd: "h-5 w-5",

  // Confirm modal
  confirmModal:
    "fixed right-4 top-6 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-3xl border border-[#1F3B32] bg-[#0D241D] p-4 text-[#D1FAE5] shadow-2xl shadow-[#34D399]/10 sm:right-6",
  confirmIconWrapper:
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-200",
  confirmTitle: "font-store-label text-sm font-black text-[#D1FAE5]",
  confirmSubtext: "mt-1 text-xs font-bold leading-5 text-[#A7C4B8]",
  confirmActions: "mt-4 grid grid-cols-2 gap-2",
  confirmKeepButton:
    "font-store-label cursor-pointer rounded-2xl border border-[#1F3B32] bg-[#071B16]/50 px-4 py-3 text-sm font-black text-[#D1FAE5] transition hover:border-[#34D399]/35 hover:bg-[#071B16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]",
  confirmCancelButton:
    "font-store-label cursor-pointer rounded-2xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm font-black text-red-200 transition hover:bg-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 disabled:cursor-wait disabled:opacity-60",

  // Section
  section: "relative mx-auto max-w-384",
  headerGrid: "mb-8 grid gap-5 lg:grid-cols-[1fr_420px] lg:items-end",

  badge:
    "font-store-label inline-flex items-center gap-2 rounded-full border border-[#34D399]/25 bg-[#34D399]/10 px-4 py-2 text-sm font-black uppercase tracking-wide text-[#6EE7B7]",
  iconSm: "h-4 w-4",
  heading:
    "font-store-display mt-4 text-4xl font-black tracking-wide text-[#D1FAE5] sm:text-5xl",
  subheading: "mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#A7C4B8]",

  // Stats
  statsGrid: "grid grid-cols-1 gap-3 sm:grid-cols-3",
  statCard:
    "rounded-3xl border border-[#1F3B32] bg-[#0D241D]/80 p-4 shadow-xl shadow-black/20",
  statIcon: "h-5 w-5 text-[#34D399]",
  statValue: "font-store-display mt-3 text-xl font-black text-[#D1FAE5]",
  statLabel:
    "font-store-label mt-1 text-xs font-black uppercase text-[#A7C4B8]",

  // Loading
  loadingContainer:
    "flex min-h-72 items-center justify-center rounded-3xl border border-[#1F3B32] bg-[#0D241D]/70",
  loadingSpinner: "h-8 w-8 animate-spin text-[#34D399]",

  // Orders grid
  ordersGrid:
    "grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",

  // Order card
  orderCard:
    "overflow-hidden rounded-3xl border border-[#1F3B32] bg-[#0D241D] text-[#D1FAE5] shadow-2xl shadow-black/25 transition duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/35 hover:shadow-[#34D399]/5",
  orderHeader: "border-b border-[#1F3B32] bg-[#0D241D] p-4",
  orderBadges: "flex flex-wrap items-center gap-2",

  // Badge base (used for status and payment)
  badgeBase:
    "font-store-label inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase",
  orderIdBadge:
    "font-store-label inline-flex items-center gap-1.5 rounded-full border border-[#34D399]/25 bg-[#071B16] px-3 py-1.5 text-[10px] font-black uppercase text-[#6EE7B7]",
  iconXs: "h-3.5 w-3.5",

  orderItemCount: "font-store-display mt-3 text-xl font-black text-[#D1FAE5]",
  orderDate: "mt-1 line-clamp-2 text-xs font-bold leading-5 text-[#A7C4B8]",

  orderActions: "mt-4 grid grid-cols-[44px_1fr] gap-2",

  eyeButtonBase:
    "inline-flex h-10 cursor-pointer items-center justify-center rounded-2xl border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]",
  eyeButtonActive: "border-[#34D399]/45 bg-[#071B16] text-[#6EE7B7]",
  eyeButtonInactive:
    "border-[#1F3B32] bg-[#071B16]/50 text-[#A7C4B8] hover:border-[#34D399]/35 hover:bg-[#071B16] hover:text-[#D1FAE5]",

  statusCancelled:
    "font-store-label inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-red-400/25 bg-red-400/10 px-4 text-xs font-black uppercase text-red-200",
  statusDelivered:
    "font-store-label inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 text-xs font-black uppercase text-emerald-200",
  cancelButton:
    "font-store-label inline-flex h-10 w-fit cursor-pointer items-center justify-center gap-2 justify-self-end rounded-2xl border border-[#1F3B32] bg-[#071B16] px-4 text-xs font-black uppercase text-[#A7C4B8] transition hover:border-red-400/35 hover:bg-red-400/10 hover:text-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]",

  // Expanded section
  expandedContainer:
    "flex flex-col gap-4 border-t border-[#1F3B32]/70 bg-[#071B16]/35 p-4",
  expandedItemsGrid:
    "grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-3",

  expandedItem:
    "group flex h-full min-h-65 min-w-0 flex-col overflow-hidden rounded-2xl border border-[#1F3B32] bg-[#0D241D] text-[#D1FAE5] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30",
  expandedItemImageWrapper:
    "flex h-28 items-center justify-center border-b border-[#1F3B32]/70 bg-[#071B16] p-2",
  expandedItemImage: "h-full w-full object-contain",
  expandedItemContent: "flex flex-1 flex-col p-2",
  expandedItemName:
    "font-store-label line-clamp-2 min-h-10 text-xs font-black leading-4 text-[#D1FAE5]",
  expandedItemCompany:
    "mt-1 truncate text-[10px] font-black uppercase tracking-wide text-[#34D399]",
  expandedItemSize: "mt-1 truncate text-[11px] font-bold text-[#A7C4B8]",
  expandedItemFooter: "mt-auto flex items-center justify-between gap-1 pt-2",
  expandedItemPrice:
    "font-store-display truncate text-sm font-black text-[#D1FAE5]",
  expandedItemQty:
    "font-store-label rounded-full border border-[#34D399]/25 bg-[#34D399]/10 px-2 py-0.5 text-[10px] font-black text-[#6EE7B7]",

  // Order summary
  orderSummary:
    "rounded-2xl border border-[#1F3B32] bg-[#0D241D] p-4 text-[#D1FAE5] shadow-xl shadow-[#34D399]/5",
  summaryTitle:
    "font-store-label text-[10px] font-black uppercase tracking-wide text-[#34D399]",
  summaryDetails: "mt-3 space-y-2 text-xs font-bold",
  summaryRow: "flex justify-between text-[#A7C4B8]",
  summaryDivider: "h-px bg-[#1F3B32]",
  summaryTotal: "flex justify-between text-base font-black text-[#D1FAE5]",

  progressContainer: "mt-4",
  progressLabels:
    "mb-2 flex items-center justify-between text-[10px] font-black uppercase text-[#A7C4B8]",
  progressBar: "grid grid-cols-3 gap-2",
  progressStep: "h-2 rounded-full",
  progressStepActive: "bg-[#34D399]",
  progressStepInactive: "bg-[#1F3B32]",
};

export const paymentSuccessPageStyles = {
  main: "flex min-h-screen items-center justify-center bg-[#0b0a08] px-4 text-white",
  container:
    "flex items-center gap-3 rounded-3xl border border-yellow-300/25 bg-white/8 px-5 py-4 text-sm font-black text-yellow-200",
  loaderIcon: "h-5 w-5 animate-spin",
};

export const productItemsPageStyles = {
  // Empty state
  emptySection:
    "flex min-h-[70vh] flex-col items-center justify-center bg-linear-to-br from-[#071B16] via-[#0B2B21] to-[#123128] px-4 py-24 text-center text-[#F6F3E8]",
  emptyHeading:
    "font-store-display text-4xl font-black tracking-wide text-[#F6F3E8]",
  emptyLink:
    "font-store-label mt-6 inline-flex items-center gap-2 rounded-full bg-[#A7E8C1] px-6 py-3 font-bold text-[#0B2B21] shadow-lg shadow-[#A7E8C1]/15 transition hover:-translate-y-0.5 hover:bg-[#DDF4E5]",

  // Main section
  section:
    "min-h-screen bg-linear-to-br from-[#071B16] via-[#0B2B21] to-[#123128] px-4 py-12 text-[#F6F3E8] sm:px-6 sm:py-16 lg:px-8",
  container: "mx-auto max-w-7xl",

  backLink:
    "font-store-label mb-8 inline-flex items-center gap-2 rounded-full border border-[#A7E8C1]/20 bg-[#A7E8C1]/5 px-4 py-2.5 text-sm font-bold text-[#A7E8C1] transition hover:border-[#A7E8C1]/50 hover:bg-[#A7E8C1]/10",

  contentWrapper: "mt-2",

  headerWrapper:
    "mb-8 flex flex-col gap-4 border-b border-[#A7E8C1]/10 pb-6 sm:flex-row sm:items-end sm:justify-between",
  categoryLabel:
    "font-store-label text-xs font-black uppercase tracking-[0.2em] text-[#A7E8C1]",
  categoryTitle:
    "font-store-display mt-2 text-3xl font-black tracking-wide text-[#F6F3E8] sm:text-4xl",
  countBadge:
    "font-store-label inline-flex w-fit items-center rounded-full border border-[#A7E8C1]/20 bg-[#A7E8C1]/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#DDF4E5]",

  productGrid:
    "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4",
  cardMotion: "h-full",

  // Product card
  productCard:
    "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#A7E8C1]/12 bg-[#0D241D] text-[#F6F3E8] shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A7E8C1]/45 hover:shadow-[0_26px_64px_rgba(0,0,0,0.42)]",
  cardOverlay1:
    "pointer-events-none absolute inset-0 bg-linear-to-br from-[#A7E8C1]/8 via-transparent to-[#34D399]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
  cardOverlay2:
    "pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-[#34D399]/12 blur-2xl",
  cardOverlay3:
    "pointer-events-none absolute -bottom-10 left-0 h-24 w-24 rounded-full bg-[#A7E8C1]/12 blur-2xl",

  cardContent: "relative flex h-full flex-col",

  imageWrapper:
    "relative flex h-52 items-center justify-center overflow-hidden border-b border-[#A7E8C1]/10 bg-linear-to-br from-[#10392C] via-[#0B2B21] to-[#071B16] p-5 sm:h-60",
  productImage:
    "h-full w-full object-contain transition-transform duration-500 group-hover:scale-110",

  productInfo: "flex flex-1 flex-col p-4 sm:p-5",
  productName:
    "font-store-label line-clamp-2 text-base font-black leading-snug tracking-wide text-[#F6F3E8]",
  productCompany: "mt-1 truncate text-sm font-semibold text-[#A7C4B8]",
  sizeBadge:
    "font-store-label mt-3 inline-flex w-fit rounded-full border border-[#A7E8C1]/20 bg-[#A7E8C1]/10 px-3 py-1 text-xs font-bold text-[#A7E8C1]",

  priceContainer:
    "mt-4 rounded-2xl border border-[#A7E8C1]/10 bg-[#071B16] px-4 py-3",
  priceRow: "mt-1 flex items-baseline gap-2",
  priceCurrent: "font-store-display text-2xl font-black text-[#F6F3E8]",
  priceOld:
    "font-store-label text-sm font-bold text-[#A7C4B8]/60 line-through",

  actionWrapper: "mt-auto flex justify-center pt-4",

  quantityControls:
    "font-store-label inline-flex h-11 w-full max-w-48 items-center justify-between rounded-full border border-[#A7E8C1]/20 bg-[#071B16] px-2 text-sm font-black text-[#DDF4E5] shadow-md shadow-black/20",
  qtyButton:
    "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#A7E8C1] text-[#0B2B21] transition hover:bg-[#DDF4E5]",
  qtyValue: "min-w-10 text-center",

  addButton:
    "font-store-label inline-flex h-11 w-full max-w-56 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#A7E8C1] px-4 text-sm font-bold text-[#0B2B21] shadow-lg shadow-[#A7E8C1]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DDF4E5] active:scale-[0.98]",

  cardBottomBar:
    "h-1 w-0 bg-[#34D399] transition-all duration-500 group-hover:w-full",
};

export const productsPageStyles = {
  section:
    "relative min-h-[80vh] scroll-mt-24 overflow-hidden bg-linear-to-br from-[#071B16] via-[#0B2B21] to-[#123128] px-4 py-14 text-[#F6F3E8] sm:px-6 sm:py-16 lg:px-8",

  // Inline gradient background
  gradientBackground: {
    background: `
      radial-gradient(circle at top left, rgba(52,211,153,0.08), transparent 32%),
      radial-gradient(circle at bottom right, rgba(13,36,29,0.35), transparent 42%)
    `,
  },

  ambientGlow:
    "pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#34D399]/10 blur-3xl",
  ambientGlowTwo:
    "pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#A7E8C1]/8 blur-3xl",

  innerContainer: "relative mx-auto max-w-7xl",

  headerWrapper: "mx-auto mb-10 max-w-3xl text-center sm:mb-14",
  badge:
    "font-store-label mb-5 inline-flex items-center gap-2 rounded-full border border-[#A7E8C1]/25 bg-[#A7E8C1]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#A7E8C1] sm:text-sm",
  badgeIcon: "h-4 w-4",
  heading:
    "font-store-display text-4xl font-black leading-tight tracking-wide text-[#F6F3E8] sm:text-5xl md:text-6xl",
  highlight:
    "bg-linear-to-r from-[#A7E8C1] via-[#DDF4E5] to-[#6EE7B7] bg-clip-text text-transparent",
  subheading:
    "mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-[#DDF4E5]/65 sm:text-base",
  divider:
    "mx-auto mt-6 h-px w-32 bg-linear-to-r from-transparent via-[#A7E8C1]/80 to-transparent",

  grid: "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5",
  cardMotion: "h-full",

  categoryLink:
    "group relative flex h-full scroll-mt-28 cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#A7E8C1]/12 bg-[#0D241D] p-2 shadow-[0_18px_48px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#A7E8C1]/45 hover:shadow-[0_26px_64px_rgba(0,0,0,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7E8C1] sm:p-2.5",

  imageWrapper:
    "relative flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-[#A7E8C1]/10 bg-linear-to-br from-[#10392C] via-[#0B2B21] to-[#071B16] p-3 sm:h-48",
  imageGlow:
    "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(167,232,193,0.18),transparent_62%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
  categoryImage:
    "relative h-full w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-110",

  categoryFooter:
    "mt-3 flex items-center justify-between gap-2 px-1.5 pb-1",
  categoryName:
    "font-store-label line-clamp-2 text-left text-xs font-black leading-tight tracking-wide text-[#F6F3E8] sm:text-sm",
  categoryArrow:
    "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#A7E8C1]/20 bg-[#A7E8C1]/10 text-[#A7E8C1] transition-all duration-300 group-hover:bg-[#A7E8C1] group-hover:text-[#0B2B21]",
  categoryArrowIcon: "h-4 w-4",
  cardBottomBar:
    "h-1 w-0 bg-[#34D399] transition-all duration-500 group-hover:w-full",
};

export const searchResultsStyles = {
  section:
    "min-h-screen bg-linear-to-br from-yellow-50 via-white to-zinc-100 px-4 py-10 sm:px-6 lg:px-8",
  container: "mx-auto max-w-375",

  // Loading
  loadingContainer:
    "flex min-h-60 items-center justify-center rounded-3xl border border-yellow-200 bg-white shadow-sm",
  loaderIcon: "h-8 w-8 animate-spin text-yellow-500",

  // Empty state
  emptyContainer:
    "flex min-h-60 flex-col items-center justify-center rounded-3xl border border-yellow-200 bg-white px-6 text-center shadow-sm",
  emptyIcon: "h-12 w-12 text-yellow-500",
  emptyTitle: "font-store-label mt-4 text-xl font-black text-zinc-950",
  emptySubtext: "mt-2 max-w-md text-sm font-semibold text-zinc-500",

  // Results grid
  resultsGrid:
    "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",

  // Product card
  productCard:
    "group relative overflow-hidden rounded-3xl rounded-bl-[5rem] border border-yellow-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]",
  cardOverlay1:
    "absolute inset-0 bg-linear-to-br from-yellow-400/10 via-transparent to-yellow-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
  cardOverlay2:
    "absolute -right-10 top-0 h-24 w-24 rounded-full bg-yellow-300/20 blur-2xl",
  cardOverlay3:
    "absolute -bottom-10 left-0 h-24 w-24 rounded-full bg-yellow-200/20 blur-2xl",

  cardContent: "relative flex h-full flex-col",

  imageWrapper: "overflow-hidden bg-yellow-50",
  productImage:
    "h-40 w-full object-contain transition-transform duration-500 group-hover:scale-105",

  productInfo: "flex flex-1 flex-col p-4",
  productName:
    "font-store-label line-clamp-2 text-base font-black leading-snug tracking-wide text-zinc-900",
  productCompany: "mt-1 text-sm font-bold text-zinc-500",
  sizeBadge:
    "font-store-label mt-2 inline-flex w-fit rounded-full bg-black px-3 py-1 text-xs font-bold text-white",

  priceContainer: "mt-4 rounded-2xl bg-zinc-50 px-4 py-3",
  priceRow: "mt-1 flex items-baseline gap-2",
  priceCurrent: "font-store-display text-2xl font-black text-zinc-900",
  priceOld: "font-store-label text-sm font-bold text-zinc-400 line-through",

  actionWrapper: "mt-4 flex justify-center",

  quantityControls:
    "font-store-label inline-flex h-11 w-40 items-center justify-between rounded-full border border-yellow-300 bg-black px-2 text-sm font-black text-yellow-300 shadow-md shadow-yellow-200",
  qtyButton:
    "inline-flex cursor-pointer h-8 w-8 items-center justify-center rounded-full bg-yellow-300 text-black transition hover:bg-yellow-400",
  qtyValue: "min-w-10 text-center",

  addButton:
    "font-store-label inline-flex cursor-pointer h-11 w-40 items-center justify-center gap-2 rounded-full border border-yellow-300 bg-yellow-400 px-3 text-sm font-bold text-zinc-900 shadow-md shadow-yellow-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 active:scale-[0.98]",

  cardBottomBar:
    "h-1 w-0 bg-yellow-400 transition-all duration-500 group-hover:w-full",
};

export const signupPageStyles = {
  mainContainer:
    "auth-page min-h-screen overflow-hidden bg-[#000000] text-[#D1FAE5]",

  // Toast shared styles
  toastBase:
    "fixed right-4 top-4 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl transition-all duration-500 sm:right-6",
  toastSuccess:
    "border-[#34D399]/30 bg-[#071B16]/95 text-[#D1FAE5] shadow-[#34D399]/10",
  toastError:
    "border-red-400/50 bg-[#071B16]/95 text-red-200 shadow-red-500/20",
  toastVisible: "translate-y-0 opacity-100",
  toastHidden: "-translate-y-4 opacity-0",
  toastIconWrapperSuccess:
    "flex h-9 w-9 items-center justify-center rounded-full bg-[#34D399] text-[#065F46]",
  toastIconWrapperError:
    "flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white",
  toastTitle: "font-store-label block text-sm font-black",
  toastSubtext: "text-xs font-semibold text-[#A7C4B8]",

  // Icons
  iconSm: "h-4 w-4",
  iconMd: "h-5 w-5",

  // Decorative backgrounds (inline styles)
  decorBg: "absolute inset-0",
  decorGradients: {
    background: "none",
  },
  decorLine: "hidden",

  // Section
  section:
    "relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8",

  // Form
  formWrapper:
    "mx-auto w-full max-w-md rounded-4xl border border-[#1F3B32] bg-[#0D241D] p-6 text-[#D1FAE5] shadow-2xl shadow-[#34D399]/5 sm:p-8",
  formHeader: "mb-7",
  formLabel:
    "font-store-label text-sm font-black uppercase tracking-wide text-[#34D399]",
  formTitle:
    "font-store-display mt-2 text-3xl font-black tracking-wide text-[#D1FAE5]",
  formSubtext: "mt-2 text-sm font-semibold leading-6 text-[#A7C4B8]",

  formFields: "space-y-4",

  inputLabel: "font-store-label mb-2 block text-sm font-bold text-[#D1FAE5]",
  inputWrapper:
    "flex items-center gap-3 rounded-2xl border border-[#1F3B32] bg-[#071B16]/70 px-4 py-3.5 transition focus-within:border-[#34D399]/60 focus-within:ring-2 focus-within:ring-[#34D399]/10",
  inputIcon: "h-5 w-5 text-[#34D399]",
  inputField:
    "auth-field w-full bg-transparent text-sm font-semibold text-[#D1FAE5] outline-none placeholder:text-[#A7C4B8]/65",
  togglePasswordButton:
    "rounded-full p-1 text-[#A7C4B8] transition hover:bg-[#123128] hover:text-[#6EE7B7]",

  submitButton:
    "font-store-label mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#34D399] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#065F46] shadow-lg shadow-[#34D399]/10 transition hover:-translate-y-0.5 hover:bg-[#6EE7B7] disabled:cursor-wait disabled:opacity-80",

  signupPrompt: "mt-6 text-center text-sm font-semibold text-[#A7C4B8]",
  loginLink:
    "font-store-label font-black text-[#34D399] underline decoration-[#34D399] decoration-2 underline-offset-4 transition hover:text-[#6EE7B7]",

  // Right column (hidden on mobile)
  rightColumn: "space-y-8 hidden lg:block xl:block",

  // Logo
  logoLink: "inline-flex items-center gap-3",
  logoWrapper:
    "flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1F3B32] bg-[#0D241D] p-1.5 shadow-xl shadow-[#34D399]/10 ring-1 ring-[#34D399]/20",
  logoImage: "h-full w-full object-contain",
  logoText:
    "font-serif block text-2xl font-black italic tracking-wide text-[#D1FAE5]",
  logoSubtext:
    "font-store-label text-xs font-bold uppercase tracking-wide text-[#34D399]",

  // Hero
  heroWrapper: "max-w-xl space-y-5",
  heroBadge:
    "font-store-label inline-flex items-center gap-2 rounded-full border border-[#34D399]/25 bg-[#34D399]/10 px-4 py-2 text-sm font-bold text-[#6EE7B7]",
  heroHeading:
    "font-store-display text-4xl font-black leading-tight tracking-wide text-[#D1FAE5] sm:text-5xl",
  heroHighlight: "block text-[#6EE7B7]",
  heroDescription: "max-w-lg text-base font-medium leading-7 text-[#A7C4B8]",

  // Feature cards
  featureGrid: "grid max-w-xl gap-3 sm:grid-cols-2",
  featureCard: "rounded-2xl border border-[#1F3B32] bg-[#0D241D]/80 p-5",
  featureIcon: "h-6 w-6 text-[#34D399]",
  featureTitle: "font-store-label mt-4 text-base font-black text-[#D1FAE5]",
  featureText: "mt-2 text-sm font-medium leading-6 text-[#A7C4B8]",
};

const authFlowStyles = {
  main: "relative flex min-h-screen items-center justify-center overflow-hidden bg-[#000000] px-4 py-10 text-[#D1FAE5] sm:px-6",
  background: "pointer-events-none absolute inset-0 overflow-hidden",
  gridPattern:
    "absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(52,211,153,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.12)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]",
  glow: "absolute -top-56 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#34D399]/10 blur-[130px]",
  bottomGlow:
    "absolute -bottom-64 -right-36 h-[32rem] w-[32rem] rounded-full bg-[#34D399]/[0.07] blur-[120px]",
  shell: "relative z-10 w-full max-w-[31rem]",
  brand:
    "mx-auto mb-7 flex w-fit items-center gap-3 rounded-full px-3 py-1.5 transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6EE7B7]",
  brandLogo: "h-10 w-10 rounded-xl object-cover ring-1 ring-[#34D399]/30",
  brandName:
    "font-store-display text-xl font-black tracking-wide text-[#D1FAE5]",
  card: "relative overflow-hidden rounded-[1.8rem] border border-[#1F3B32] bg-[#0D241D]/95 p-6 shadow-[0_24px_90px_rgba(16,185,129,0.12)] sm:rounded-[2rem] sm:p-9",
  cardAccent:
    "absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-[#34D399]/75 to-transparent",
  iconBadge:
    "flex h-12 w-12 items-center justify-center rounded-2xl border border-[#34D399]/25 bg-[#34D399]/10 text-[#6EE7B7]",
  heroIcon: "h-6 w-6",
  eyebrow:
    "font-store-label mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#6EE7B7]",
  heading:
    "font-store-display mt-2 text-3xl font-black leading-tight tracking-wide text-[#D1FAE5] sm:text-4xl",
  subtext: "mt-3 text-sm font-medium leading-6 text-[#A7C4B8] sm:text-base",
  stageList: "mt-6 flex w-full items-start",
  stageItem:
    "relative z-0 flex min-w-0 flex-1 flex-col items-center gap-2 text-center",
  stageItemActive: "text-[#D1FAE5]",
  stageItemComplete: "text-[#A7C4B8]",
  stageMarker:
    "relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#1F3B32] bg-[#071710] text-[0.68rem] font-black text-[#A7C4B8]",
  stageMarkerActive:
    "border-[#34D399] bg-[#34D399] text-[#062016] ring-4 ring-[#34D399]/10",
  stageMarkerComplete: "border-[#34D399]/50 bg-[#34D399]/15 text-[#6EE7B7]",
  stageLabel:
    "max-w-full px-1 text-[0.65rem] font-semibold leading-4 text-[#A7C4B8] sm:text-xs",
  stageConnector: "absolute left-1/2 top-3.5 z-0 h-px w-full bg-[#1F3B32]",
  stageConnectorComplete: "bg-[#34D399]/70",
  form: "mt-7 space-y-4",
  label:
    "font-store-label block text-sm font-bold tracking-wide text-[#D1FAE5]",
  inputWrapper:
    "mt-2 flex min-h-14 items-center gap-3 rounded-2xl border border-[#1F3B32] bg-[#071710] px-4 transition focus-within:border-[#34D399] focus-within:ring-4 focus-within:ring-[#34D399]/10",
  inputIcon: "h-5 w-5 shrink-0 text-[#6EE7B7]",
  inputField:
    "w-full bg-transparent py-4 text-sm font-semibold text-[#D1FAE5] outline-none placeholder:text-[#A7C4B8]/55",
  otpInput:
    "w-full rounded-2xl border border-[#1F3B32] bg-[#071710] px-4 py-4 text-center font-mono text-2xl font-bold tracking-[0.55em] text-[#D1FAE5] outline-none transition placeholder:text-[#A7C4B8]/40 focus:border-[#34D399] focus:ring-4 focus:ring-[#34D399]/10",
  helperText: "text-xs font-medium leading-5 text-[#A7C4B8]",
  emailPanel:
    "mt-6 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 rounded-2xl border border-[#1F3B32] bg-[#071710]/80 px-4 py-3",
  emailLabel:
    "font-store-label text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#6EE7B7]",
  emailValue: "min-w-0 break-all text-sm font-semibold text-[#D1FAE5]",
  changeEmailButton:
    "row-span-2 rounded-lg px-2 py-1 text-xs font-bold text-[#6EE7B7] transition hover:bg-[#34D399]/10 hover:text-[#D1FAE5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7]",
  toggleButton:
    "rounded-lg p-2 text-[#A7C4B8] transition hover:bg-[#34D399]/10 hover:text-[#6EE7B7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7]",
  toggleIcon: "h-5 w-5",
  submitButton:
    "font-store-label flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#34D399] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#062016] transition hover:bg-[#6EE7B7] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6EE7B7] disabled:cursor-not-allowed disabled:opacity-60",
  buttonIcon: "h-5 w-5",
  resendRow:
    "mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center",
  textButton:
    "font-store-label rounded-md px-1 text-sm font-bold text-[#6EE7B7] underline decoration-[#34D399]/40 underline-offset-4 transition hover:text-[#D1FAE5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7] disabled:cursor-not-allowed disabled:opacity-60",
  backLink:
    "mt-7 inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-[#A7C4B8] transition hover:text-[#6EE7B7] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6EE7B7]",
  backIcon: "h-4 w-4",
  footerNote:
    "mt-6 text-center text-xs font-medium tracking-wide text-[#A7C4B8]/75",
  toast:
    "fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-[0_16px_50px_rgba(0,0,0,0.4)] transition-all duration-300 sm:top-6 sm:px-5 sm:py-4",
  toastVisible: "translate-y-0 opacity-100",
  toastHidden: "-translate-y-5 opacity-0 pointer-events-none",
  toastSuccess: "border-[#34D399]/35 bg-[#0D241D] text-[#D1FAE5]",
  toastError: "border-rose-400/40 bg-[#24110F] text-rose-100",
};

export const forgotPasswordStyles = { ...authFlowStyles };

export const resetPasswordStyles = { ...authFlowStyles };

export const verifyEmailStyles = { ...authFlowStyles };
