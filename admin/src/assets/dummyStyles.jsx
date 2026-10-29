export const addProductPageStyles = {
  // Main container
  mainContainer:
    "min-h-screen w-full flex items-center justify-center bg-black p-4 sm:p-6 font-['Poppins',sans-serif]",

  // Toast
  toastBase:
    "fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300",
  toastSuccess: "bg-[#071B16]/90 text-[#34D399] border-[#34D399]/30",
  toastError: "bg-[#071B16]/90 text-red-400 border-red-400/30",
  toastIconSuccess: "w-5 h-5 text-[#34D399]",
  toastIconError: "w-5 h-5 text-red-400",
  toastMessage: "font-medium text-sm tracking-wide",

  // Card
  card: "w-full max-w-3xl bg-[#0D241D] rounded-3xl border border-[#1F3B32] card-glow p-6 sm:p-8 md:p-10 relative overflow-hidden",

  // Decorative glows
  decoGlow1:
    "absolute -top-24 -right-24 w-64 h-64 bg-[#34D399]/5 rounded-full blur-3xl pointer-events-none",
  decoGlow2:
    "absolute -bottom-32 -left-32 w-80 h-80 bg-[#34D399]/3 rounded-full blur-3xl pointer-events-none",

  // Header
  header:
    "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
  heading: "text-2xl font-extrabold tracking-tight text-white sm:text-3xl",
  headingHighlight: "text-[#34D399]",
  headerBadge:
    "flex w-fit items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/10 px-4 py-2",
  headerBadgeIcon: "w-4 h-4 text-[#34D399]",
  headerBadgeText:
    "text-xs font-semibold text-[#34D399] tracking-wider uppercase",

  // Form
  form: "space-y-6",

  // Image Upload
  uploadLabel: "block text-sm font-medium text-[#D1FAE5] mb-1.5 tracking-wide",

  uploadAreaBase:
    "relative flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed transition-all duration-300 upload-area",
  uploadAreaWithPreview: "border-[#34D399]/40 bg-[#071B16]/50",
  uploadAreaEmpty: "border-[#1F3B32] bg-[#071B16]/50 hover:border-[#34D399]/50",

  uploadPreviewContainer:
    "relative w-full h-full flex items-center justify-center group",
  uploadPreviewImage: "w-full h-full object-contain rounded-2xl p-2",

  removeImageButton:
    "absolute top-3 right-3 bg-[#071B16]/70 backdrop-blur-sm p-1.5 rounded-full border border-[#34D399]/30 text-[#34D399] hover:bg-[#34D399] hover:text-[#065F46] transition-all duration-200",

  uploadLabelInner:
    "flex flex-col items-center justify-center w-full h-full cursor-pointer p-4",

  uploadIconWrapper:
    "w-16 h-16 rounded-full bg-[#34D399]/10 flex items-center justify-center mb-3 border border-[#34D399]/20",
  uploadIcon: "w-8 h-8 text-[#34D399]",

  uploadText: "text-sm text-[#A7C4B8] font-medium",
  uploadTextHighlight: "text-[#34D399] font-semibold",
  uploadSubtext: "text-xs text-[#A7C4B8] mt-1",

  hiddenInput: "hidden",

  // Fields grid
  fieldsGrid: "grid grid-cols-1 md:grid-cols-2 gap-5",

  // InputField styles (used by the helper)
  inputFieldWrapper: "col-span-1",
  inputFieldLabel:
    "block text-sm font-medium text-[#D1FAE5] mb-1.5 tracking-wide",
  inputFieldIcon: "inline w-4 h-4 mr-1.5 text-[#34D399]",
  inputFieldInner: "relative",
  inputFieldPrefix:
    "absolute left-4 top-1/2 -translate-y-1/2 text-[#34D399] font-semibold",
  inputFieldInput:
    "w-full bg-[#0D241D] border border-[#1F3B32] rounded-xl px-4 py-2.5 text-white placeholder-[#A7C4B8] focus:border-[#34D399]/70 focus:ring-2 focus:ring-[#34D399]/20 focus:bg-[#123128] transition-all duration-300 outline-none",
  inputFieldInputWithPrefix: "pl-8",

  // Company field (similar but without icon wrapper)
  companyLabel: "block text-sm font-medium text-[#D1FAE5] mb-1.5 tracking-wide",
  companyIcon: "inline w-4 h-4 mr-1.5 text-[#34D399]",
  companyInput:
    "w-full bg-[#0D241D] border border-[#1F3B32] rounded-xl px-4 py-2.5 text-white placeholder-[#A7C4B8] focus:border-[#34D399]/70 focus:ring-2 focus:ring-[#34D399]/20 focus:bg-[#123128] transition-all duration-300 outline-none",

  // Submit
  submitWrapper: "pt-2 flex justify-center",
  submitButton:
    "cursor-pointer px-10 py-3 rounded-full text-[#065F46] font-bold text-base transition-all duration-300 flex items-center gap-2 border border-[#34D399]/30",
  submitIcon: "w-5 h-5 group-hover:translate-x-1 transition-transform",

  // Shared icon size
  iconSm: "w-4 h-4",
};

export const addItemsPageStyles = {
  // ---- Main container ----
  main: "dashboard-font min-h-screen bg-black px-4 py-6 text-white sm:px-6 lg:px-8 2xl:px-10",

  // ---- Toast ----
  toastBase:
    "fixed right-4 top-4 z-100 w-[320px] rounded-3xl border p-4 shadow-2xl",
  toastSuccess: "border-[#34D399]/25 bg-[#0D241D] text-[#D1FAE5]",
  toastDanger: "border-rose-400/25 bg-rose-950 text-rose-100",
  toastIcon: "mt-0.5 h-5 w-5 text-[#6EE7B7]",
  toastMessage: "text-sm font-black",
  toastActions: "mt-3 flex gap-2",
  toastDeleteButton:
    "inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-500 px-3 py-1.5 text-xs font-black text-white hover:bg-rose-400 disabled:cursor-wait disabled:opacity-80",
  toastCancelButton:
    "rounded-xl border border-[#34D399]/20 px-3 py-1.5 text-xs font-black text-[#D1FAE5] hover:bg-[#34D399] hover:text-[#065F46]",
  toastCloseButton: "text-[#A7C4B8]",
  toastSpinner: "h-3 w-3 animate-spin",
  iconSm: "h-4 w-4",

  // ---- Field ----
  fieldLabel:
    "text-xs font-black uppercase tracking-[0.16em] text-[#6EE7B7]/80",
  fieldWrapper: "relative mt-2",
  fieldIcon:
    "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6EE7B7]",
  fieldInputBase:
    "h-12 w-full rounded-2xl border border-[#34D399]/15 bg-[#071B16]/35 px-4 text-sm font-semibold text-white outline-none placeholder:text-[#A7C4B8] focus:border-[#6EE7B7]",
  fieldInputWithIcon: "pl-11",

  // ---- ImageUpload ----
  uploadLabel:
    "text-xs font-black uppercase tracking-[0.16em] text-[#6EE7B7]/80",
  uploadContainer:
    "mt-2 flex items-center gap-3 rounded-2xl border border-[#34D399]/15 bg-[#071B16]/35 p-3",
  uploadPreviewBox:
    "flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#34D399]/15 bg-[#071B16]/40",
  uploadPreviewImage: "h-full w-full object-cover",
  uploadPlaceholderIcon: "h-6 w-6 text-[#6EE7B7]",
  uploadTextPrimary: "text-sm font-bold text-white",
  uploadTextSecondary: "text-xs text-[#A7C4B8]",
  uploadBrowseButton:
    "cursor-pointer rounded-xl bg-[#34D399] px-3 py-2 text-xs font-black text-[#065F46]",
  uploadHiddenInput: "hidden",

  // ---- ActionButton ----
  actionButtonBase:
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black transition",
  actionButtonIcon: "h-4 w-4",
  actionButtonIconSpin: "animate-spin",

  // ---- Header ----
  headerSection:
    "rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5 shadow-2xl shadow-[#071B16]/30",
  headerInner:
    "flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between",
  headerBadge:
    "text-xs font-black uppercase tracking-[0.35em] text-[#6EE7B7]/80",
  headerTitle: "mt-2 text-3xl font-black",
  headerDescription: "mt-2 max-w-2xl text-sm font-medium text-[#A7C4B8]",
  searchWrapper: "relative w-full xl:w-96",
  searchIcon:
    "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6EE7B7]",
  searchInput:
    "h-12 w-full rounded-2xl border border-[#34D399]/15 bg-[#071B16]/35 pl-11 pr-4 text-sm font-semibold outline-none placeholder:text-[#A7C4B8] focus:border-[#6EE7B7]",

  // ---- Two columns ----
  twoColumns:
    "mt-6 grid lg:grid-cols-2 md:grid-cols-2 gap-6 xl:grid-cols-[0.9fr_1.1fr]",

  // ---- Left column (categories) ----
  leftColumn: "rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5",
  columnTitle: "flex items-center gap-2 text-xl font-black",
  columnIcon: "h-5 w-5 text-[#6EE7B7]",
  categoryForm: "mt-5 grid gap-4",
  categoryActionButton: "bg-[#34D399] text-[#065F46] hover:bg-[#6EE7B7]",
  categoryList: "mt-6 grid max-h-105 gap-3 overflow-y-auto pr-1",
  categoryItem:
    "flex items-center gap-3 rounded-2xl border border-[#34D399]/10 bg-[#071B16]/30 p-3",
  categoryItemImage: "h-14 w-14 rounded-xl object-cover",
  categoryItemInfo: "min-w-0 flex-1",
  categoryItemName: "truncate font-black",
  categoryItemSubtext: "text-xs font-semibold text-[#A7C4B8]",
  categoryEditButton:
    "rounded-xl p-2 text-[#6EE7B7] hover:bg-[#34D399] hover:text-[#065F46]",
  categoryDeleteButton:
    "rounded-xl p-2 text-rose-300 hover:bg-rose-500 hover:text-white",

  // ---- Right column (add item) ----
  rightColumn: "rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5",
  itemForm: "mt-5 grid gap-4 md:grid-cols-2",
  itemSelectLabel: "block md:col-span-2",
  itemSelect:
    "mt-2 h-12 w-full rounded-2xl border border-[#34D399]/15 bg-[#071B16]/35 px-4 text-sm font-semibold text-white outline-none focus:border-[#6EE7B7]",
  itemSelectOption: "bg-[#0D241D]",
  itemImageUploadWrapper: "md:col-span-2",
  itemActionButton:
    "bg-[#34D399] text-[#065F46] hover:bg-[#6EE7B7] md:col-span-2",
};

export const productListPageStyles = {
  // ---- Main container ----
  main: "min-h-screen bg-black p-4 sm:p-6 font-['Poppins',sans-serif]",

  // ---- Toast ----
  toastBase:
    "fixed top-25 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl shadow-2xl border backdrop-blur-xl",
  toastSuccess: "bg-[#071B16]/90 text-[#34D399] border-[#34D399]/30",
  toastError: "bg-[#071B16]/90 text-red-400 border-red-400/30",
  toastIcon: "w-4 h-4",
  toastMessage: "text-sm font-medium tracking-wide",

  // ---- Confirm delete modal ----
  confirmModal:
    "fixed top-25 right-4 z-50 w-72 bg-[#071B16]/95 border border-red-500/30 rounded-xl shadow-2xl backdrop-blur-xl p-4 toast-slide",
  confirmInner: "flex items-start gap-3",
  confirmIcon: "w-5 h-5 text-red-400 shrink-0 mt-0.5",
  confirmTitle: "text-white text-sm font-medium",
  confirmSubtext: "text-[#A7C4B8] text-xs mt-0.5",
  confirmActions: "flex gap-2 mt-3",
  confirmDeleteButton:
    "flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg py-1.5 transition inline-flex items-center justify-center gap-1.5 disabled:cursor-wait disabled:opacity-80",
  confirmSpinner: "h-3 w-3 animate-spin",
  confirmCancelButton:
    "flex-1 bg-[#123128] hover:bg-[#1F3B32] text-[#D1FAE5] text-xs font-bold rounded-lg py-1.5 transition",

  // ---- Header ----
  headerWrapper:
    "max-w-[1600px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-4",
  headerLeft: "flex min-w-0 flex-wrap items-center gap-3",
  headerIcon: "w-6 h-6 text-[#34D399]",
  headerTitle: "text-xl font-extrabold tracking-tight text-white sm:text-2xl",
  headerHighlight: "text-[#34D399]",
  headerBadge:
    "text-xs text-[#A7C4B8] bg-[#071B16]/50 px-3 py-1 rounded-full border border-[#1F3B32]",

  // ---- Search ----
  searchWrapper: "relative w-full sm:w-72",
  searchIcon: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A7C4B8]",
  searchInput:
    "w-full bg-[#071B16]/90 border border-[#1F3B32] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-[#A7C4B8] focus:border-[#34D399]/70 focus:ring-2 focus:ring-[#34D399]/20 transition-all outline-none text-sm",

  // ---- Grid ----
  grid: "max-w-[1600px] mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7",

  // ---- Card ----
  card: "bg-[#071B16]/90 border border-[#1F3B32] rounded-2xl overflow-hidden hover:border-[#34D399]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#34D399]/5 flex flex-col",

  // ---- Image ----
  imageContainer:
    "relative h-32 bg-[#071B16]/50 flex items-center justify-center overflow-hidden group",
  cardImage: "h-full w-full object-contain",
  imageOverlay:
    "absolute inset-0 bg-[#071B16]/60 flex items-center justify-center cursor-pointer hover:bg-[#071B16]/70 transition flex-col",
  imageOverlayIcon: "w-6 h-6 text-[#34D399]",
  imageOverlayText:
    "absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-[#34D399] font-medium bg-[#071B16]/80 px-3 py-1 rounded-full border border-[#34D399]/30 whitespace-nowrap",
  hiddenInput: "hidden",

  // ---- Card content ----
  cardContent: "p-3 flex-1 flex flex-col gap-1.5",

  // ---- Edit mode inputs ----
  editInputName:
    "bg-[#071B16]/80 border border-[#1F3B32] rounded-lg px-2 py-1 text-white text-sm focus:border-[#34D399]/50 outline-none",
  editInputCompany:
    "bg-[#071B16]/80 border border-[#1F3B32] rounded-lg px-2 py-1 text-[#D1FAE5] text-xs focus:border-[#34D399]/50 outline-none",
  editPriceRow: "flex gap-2",
  editInputSelling:
    "bg-[#071B16]/80 border border-[#1F3B32] rounded-lg px-2 py-1 text-[#34D399] text-xs w-1/2 focus:border-[#34D399]/50 outline-none",
  editInputOld:
    "bg-[#071B16]/80 border border-[#1F3B32] rounded-lg px-2 py-1 text-[#A7C4B8] text-xs w-1/2 line-through focus:border-[#34D399]/50 outline-none",
  editInputSize:
    "bg-[#071B16]/80 border border-[#1F3B32] rounded-lg px-2 py-1 text-[#D1FAE5] text-xs focus:border-[#34D399]/50 outline-none",
  editActions: "flex gap-2 mt-1",
  editSaveButton:
    "flex-1 bg-[#34D399] hover:bg-[#6EE7B7] text-[#065F46] text-xs font-bold rounded-lg py-1.5 flex items-center justify-center gap-1 transition",
  editCancelButton:
    "flex-1 bg-[#123128] hover:bg-[#1F3B32] text-[#D1FAE5] text-xs font-bold rounded-lg py-1.5 flex items-center justify-center gap-1 transition",
  editButtonIcon: "w-3 h-3",

  // ---- View mode ----
  itemName: "text-white font-semibold text-sm truncate",
  itemCompany: "text-[#A7C4B8] text-xs truncate flex items-center gap-1",
  itemIcon: "w-3 h-3",
  itemPriceRow: "flex items-center gap-2 mt-0.5",
  itemSellingPrice: "text-[#34D399] font-bold text-sm",
  itemOldPrice: "text-[#A7C4B8] text-xs line-through",
  itemSize: "text-[#A7C4B8] text-xs flex items-center gap-1",
  itemActions: "flex gap-2 mt-1",
  itemEditButton:
    "flex-1 bg-[#34D399]/10 hover:bg-[#34D399]/20 text-[#34D399] text-xs font-bold rounded-lg py-1.5 flex items-center justify-center gap-1 transition border border-[#34D399]/20",
  itemDeleteButton:
    "flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold rounded-lg py-1.5 flex items-center justify-center gap-1 transition border border-red-400/20",
  itemButtonIcon: "w-3 h-3",

  // ---- Empty state ----
  emptyState: "max-w-[1600px] mx-auto mt-16 text-center",
  emptyIcon: "w-16 h-16 text-[#A7C4B8] mx-auto mb-4",
  emptyTitle: "text-[#A7C4B8] font-medium",
  emptySubtext: "text-[#A7C4B8] text-sm",
};

export const itemListPageStyles = {
  // ---- Main ----
  main: "dashboard-font min-h-screen bg-black px-4 py-6 text-white sm:px-6 lg:px-8 2xl:px-10",

  // ---- Toast ----
  toastBase:
    "fixed right-4 top-4 z-100 w-[320px] rounded-3xl border p-4 shadow-2xl",
  toastSuccess: "border-[#34D399]/25 bg-[#0D241D] text-[#D1FAE5]",
  toastDanger: "border-rose-400/25 bg-rose-950 text-rose-100",
  toastIconWrapper:
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#34D399] text-[#065F46]",
  toastIcon: "h-5 w-5",
  toastMessage: "text-sm font-black",
  toastActions: "mt-3 flex gap-2",
  toastDeleteButton:
    "inline-flex items-center justify-center gap-1.5 rounded-xl bg-rose-500 px-3 py-1.5 text-xs font-black text-white transition hover:bg-rose-400 disabled:cursor-wait disabled:opacity-80",
  toastSpinner: "h-3 w-3 animate-spin",
  toastCancelButton:
    "rounded-xl border border-[#34D399]/20 px-3 py-1.5 text-xs font-black text-[#D1FAE5] transition hover:bg-[#34D399] hover:text-[#065F46]",
  toastCloseButton: "text-[#A7C4B8] transition hover:text-white",
  iconSm: "h-4 w-4",

  // ---- Field ----
  fieldLabel:
    "text-[11px] font-black uppercase tracking-[0.16em] text-[#6EE7B7]/80",
  fieldWrapper: "relative mt-2",
  fieldIcon:
    "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6EE7B7]",
  fieldInputBase:
    "h-11 w-full rounded-2xl border border-[#34D399]/15 bg-[#071B16]/40 px-4 text-sm font-bold text-white outline-none transition placeholder:text-[#A7C4B8] focus:border-[#6EE7B7]",
  fieldInputWithIcon: "pl-10",

  // ---- Header ----
  headerSection:
    "rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5 shadow-2xl shadow-[#071B16]/30",
  headerInner:
    "flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between",
  headerBadge:
    "flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-[#6EE7B7]/80",
  headerBadgeIcon: "h-4 w-4",
  headerTitle: "mt-2 text-3xl font-black",
  searchWrapper: "relative w-full xl:w-96",
  searchIcon:
    "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6EE7B7]",
  searchInput:
    "h-12 w-full rounded-2xl border border-[#34D399]/15 bg-[#071B16]/35 pl-11 pr-4 text-sm font-semibold outline-none transition placeholder:text-[#A7C4B8] focus:border-[#6EE7B7]",

  // ---- Filter row ----
  filterRow: "mt-5 flex gap-2 overflow-x-auto pb-1",
  filterButtonBase:
    "inline-flex shrink-0 items-center cursor-pointer gap-2 rounded-2xl border px-4 py-2.5 text-sm font-black transition",
  filterButtonActive: "border-[#6EE7B7] bg-[#34D399] text-[#065F46]",
  filterButtonInactive:
    "border-[#34D399]/15 bg-[#071B16]/30 text-[#D1FAE5] hover:border-[#6EE7B7]/60",
  filterIcon: "h-4 w-4",

  // ---- Grid ----
  gridSection: "mt-6",
  grid: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ",

  // ---- Item Card ----
  itemCard:
    "group overflow-hidden rounded-3xl border border-[#34D399]/15 bg-[#0D241D] shadow-2xl shadow-[#071B16]/25 transition hover:-translate-y-1 hover:border-[#6EE7B7]/50",
  itemImageContainer: "relative h-32 bg-[#34D399]",
  itemImage: "h-full w-full object-contain",
  itemCategoryBadge:
    "absolute left-2 top-2 rounded-xl bg-[#071B16]/85 px-2.5 py-1 text-[10px] font-black text-[#D1FAE5]",
  itemContent: "p-3",

  // ---- View mode ----
  itemHeader: "flex items-start justify-between gap-2",
  itemHeaderLeft: "min-w-0",
  itemName: "truncate text-base font-black text-white",
  itemCompany:
    "mt-0.5 flex items-center gap-1 text-xs font-bold text-[#A7C4B8]",
  itemIcon: "h-3 w-3 text-[#6EE7B7]",
  itemWeightBadge:
    "rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-2 py-0.5 text-[10px] font-black text-[#D1FAE5]",

  itemPriceGrid: "mt-3 grid grid-cols-2 gap-2",
  itemOriginalPrice: "rounded-xl border border-white/10 bg-[#071B16]/30 p-2",
  itemSellingPrice:
    "rounded-xl border border-[#34D399]/25 bg-[#34D399] p-2 text-[#065F46]",
  priceLabel:
    "text-[9px] font-black uppercase tracking-[0.16em] text-[#A7C4B8]",
  priceOriginalValue: "mt-0.5 text-sm font-black text-[#A7C4B8] line-through",
  priceSellingValue: "mt-0.5 text-sm font-black",

  // ---- Edit mode ----
  editForm: "grid gap-2",
  editLabel:
    "text-[10px] font-black uppercase tracking-[0.16em] text-[#6EE7B7]/80",
  editFileInput:
    "mt-1 w-full rounded-xl border border-[#34D399]/15 bg-[#071B16]/40 px-3 py-2 text-sm font-bold text-white file:mr-3 file:rounded-xl file:border-0 file:bg-[#34D399] file:px-3 file:py-1 file:text-xs file:font-black file:text-[#065F46] hover:file:bg-[#6EE7B7]",
  editSelect:
    "mt-1 h-9 w-full rounded-xl border border-[#34D399]/15 bg-[#071B16]/40 px-3 text-sm font-bold text-white outline-none focus:border-[#6EE7B7]",
  editOption: "bg-[#0D241D]",
  editPriceRow: "grid grid-cols-1 gap-2 sm:grid-cols-2",

  // ---- Actions ----
  itemActions: "mt-3 flex gap-2",
  actionIconSmall: "h-3 w-3",

  saveButton:
    "inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#34D399] px-3 py-2 text-xs font-black text-[#065F46] transition hover:bg-[#6EE7B7]",
  cancelButton:
    "inline-flex items-center justify-center rounded-xl border border-[#34D399]/15 px-3 py-2 text-[#D1FAE5] transition hover:bg-[#34D399] hover:text-[#065F46]",

  editButtonBase:
    "inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-[#34D399]/20 bg-[#071B16]/30 px-3 py-2 text-xs font-black text-[#D1FAE5] transition",
  editButtonEnabled: "hover:bg-[#34D399] hover:text-[#065F46]",
  editButtonDisabled: "cursor-not-allowed opacity-50",

  deleteButton:
    "inline-flex items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-rose-200 transition hover:bg-rose-500 hover:text-white",

  // ---- Empty state ----
  emptyState:
    "mt-6 rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-8 text-center",
  emptyIcon: "mx-auto h-10 w-10 text-[#6EE7B7]",
  emptyTitle: "mt-3 text-xl font-black",
};

export const adminLoginStyles = {
  // Main container
  mainContainer:
    "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-10 sm:px-6 sm:py-12",

  // Glow effects
  glow1:
    "absolute -left-48 -top-48 h-96 w-96 animate-pulse rounded-full bg-transparent",
  glow2:
    "absolute -bottom-48 -right-48 h-96 w-96 animate-pulse rounded-full bg-transparent delay-1000",
  glow3:
    "animate-spin-slow absolute left-1/2 top-1/2 h-175 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent",

  // Content wrapper
  contentWrapper: "relative z-10 mx-auto flex w-full max-w-md flex-col",

  // Brand header
  brandHeader: "mb-7 text-center",
  brandInner: "mb-4 flex items-center justify-center gap-3.5",
  logoWrapper:
    "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#123128] shadow-lg shadow-[#071B16]/50 ring-1 ring-[#34D399]/25",
  logoImage: "h-full w-full object-contain",
  brandText: "text-left",
  adminLabel:
    "text-[10px] font-black uppercase leading-none tracking-[0.3em] text-[#6EE7B7]/60",
  brandTitle:
    "mt-1.5 text-2xl font-black leading-none tracking-tight text-white",
  brandSubtitle:
    "mx-auto mt-3 max-w-xs text-sm font-medium leading-relaxed text-[#A7C4B8]",

  // Card
  card: "relative rounded-3xl border border-[#34D399]/10 bg-white/3 p-6 shadow-2xl shadow-[#071B16]/60 ring-1 ring-white/5 backdrop-blur-xl sm:p-8",
  cardTopLine: "absolute -top-px left-8 right-8 h-px bg-[#34D399]/40",

  // Form
  form: "space-y-5",

  // Error
  errorContainer:
    "flex items-start gap-2.5 rounded-2xl border border-red-500/40 bg-[#071B16]/80 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-red-500/10",
  errorDot: "mt-1.5 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-red-400",

  // Field group
  fieldGroup: "space-y-2",
  fieldLabel:
    "flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#6EE7B7]/60",
  fieldWrapper: "group relative",
  fieldGlow:
    "absolute -inset-1 rounded-2xl bg-[#34D399]/10 opacity-0 blur-md transition duration-300 group-focus-within:opacity-100",
  fieldInputContainer:
    "relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[#071B16]/60 px-4 transition-all duration-300 group-hover:border-white/20 focus-within:border-[#34D399]/60 focus-within:shadow-[0_0_30px_rgba(52,211,153,0.06)]",
  fieldIcon:
    "h-5 w-5 shrink-0 text-[#34D399]/40 transition group-focus-within:text-[#34D399]",
  fieldInput:
    "w-full min-w-0 flex-1 bg-transparent py-3.5 text-sm text-white placeholder:text-[#A7C4B8] outline-none",
  fieldInputPassword:
    "w-full min-w-0 flex-1 bg-transparent py-3.5 pr-12 text-sm text-white placeholder:text-[#A7C4B8] outline-none",

  // Toggle password
  toggleButton:
    "absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#34D399]/50 transition hover:text-[#34D399]",
  toggleIcon: "h-5 w-5",

  // Submit button
  submitButton:
    "group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-[#34D399] px-5 py-3 text-sm font-black text-[#065F46] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(52,211,153,0.3)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
  submitShine:
    "absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full",
  submitInner: "relative z-10 flex items-center justify-center gap-2",
  spinner:
    "h-4 w-4 animate-spin rounded-full border-2 border-[#0D241D]/30 border-t-[#065F46]",
  submitIcon: "h-4 w-4 transition group-hover:translate-x-0.5",

  // Footer
  footerNote:
    "mt-6 text-center text-xs font-medium tracking-wide text-[#A7C4B8]",
};

export const adminNavbarStyles = {
  // ---- Header ----
  headerBase:
    "sticky top-0 z-50 w-full border-b border-[#34D399]/15 bg-black/95 backdrop-blur-xl transition-transform duration-300",
  headerVisible: "translate-y-0",
  headerHidden: "-translate-y-full",

  // ---- Inner wrapper ----
  innerWrapper:
    "flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-0 xl:px-8 2xl:px-10",

  // ---- Logo ----
  logoWrapper: "flex items-center gap-3",
  logoImageWrapper:
    "flex h-10 w-10 items-center justify-center rounded-2xl bg-[#34D399] p-1.5 shadow-lg shadow-[#34D399]/20 ring-1 ring-[#D1FAE5]/50 sm:h-12 sm:w-12",
  logoImage: "h-full w-full object-contain",
  logoTextWrapper: "leading-tight",
  logoLabel:
    "text-[10px] font-black uppercase tracking-[0.4em] text-[#6EE7B7]/80 sm:text-[11px]",
  logoTitle:
    "text-xl font-black tracking-tight text-white sm:text-2xl lg:text-lg",

  // ---- Nav links (desktop) ----
  navLinks: "hidden items-center gap-1 lg:flex xl:gap-2",
  navLinkBase:
    "group relative inline-flex items-center gap-1.5 rounded-2xl border px-3 xl:gap-2 py-2 text-xs font-black transition-all duration-300 lg:gap-0 lg:px-2.5 xl:px-3 xl:py-3 lg:py-2.5 lg:text-xs",
  navLinkActive:
    "border-[#34D399] bg-[#34D399] text-[#065F46] shadow-[0_12px_26px_rgba(52,211,153,0.24)]",
  navLinkInactive:
    "border-[#34D399]/10 bg-white/[0.04] text-[#D1FAE5] hover:-translate-y-0.5 hover:border-[#34D399]/60 hover:bg-[#34D399] hover:text-[#065F46] hover:shadow-[0_10px_24px_rgba(52,211,153,0.18)]",

  navIconBase: "h-3.5 w-3.5 transition lg:h-4 lg:w-4",
  navIconActive: "text-[#065F46]",
  navIconInactive: "text-[#6EE7B7] group-hover:text-[#065F46]",

  navChevronBase: "h-3.5 w-3.5 transition lg:h-4 lg:w-4",
  navChevronActive: "opacity-100 text-[#065F46]",
  navChevronInactive: "opacity-0 group-hover:opacity-100",

  // ---- Auth buttons ----
  authButtons: "hidden items-center gap-2 lg:flex",

  logoutButton:
    "group cursor-pointer inline-flex items-center gap-1.5 rounded-2xl border border-red-400/40 bg-red-500 px-4 py-2 text-xs font-black text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 lg:gap-2 lg:px-5 lg:py-2.5 lg:text-sm",
  loginButton:
    "group cursor-pointer inline-flex items-center gap-1.5 rounded-2xl border border-[#34D399]/40 bg-[#34D399] px-4 py-2 text-xs font-black text-[#065F46] shadow-lg shadow-[#34D399]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6EE7B7] lg:gap-2 lg:px-5 lg:py-2.5 lg:text-sm",
  authIcon: "h-3.5 w-3.5 transition group-hover:translate-x-0.5 lg:h-4 lg:w-4",

  // ---- Mobile toggle ----
  mobileToggle:
    "inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#34D399]/20 bg-white/5 text-[#6EE7B7] transition hover:bg-[#34D399] hover:text-[#065F46] lg:hidden",
  mobileIcon: "h-5 w-5",

  // ---- Mobile menu ----
  mobileMenuContainer:
    "border-t border-[#34D399]/10 bg-black px-4 py-4 lg:hidden",
  mobileMenuGrid: "grid gap-2",

  mobileNavLinkBase:
    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-black transition",
  mobileNavLinkActive: "border-[#34D399] bg-[#34D399] text-[#065F46]",
  mobileNavLinkInactive:
    "border-white/10 bg-white/5 text-white hover:border-[#34D399]/50 hover:bg-[#34D399] hover:text-[#065F46]",

  mobileNavLinkLeft: "flex items-center gap-3",
  mobileNavIcon: "h-4 w-4",
  mobileNavIconActive: "text-[#065F46]",
  mobileNavIconInactive: "text-[#6EE7B7]",
  mobileNavChevron: "h-4 w-4 opacity-70",

  mobileLogoutButton:
    "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-500/20",
  mobileLoginButton:
    "mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#34D399] px-4 py-3 text-sm font-black text-[#065F46] shadow-lg shadow-[#34D399]/20",
  mobileAuthIcon: "h-4 w-4",
};

export const adminOrdersViewStyles = {
  // ---- Loading state ----
  loadingState:
    "flex min-h-screen items-center justify-center bg-black text-white text-xl font-bold",

  // ---- Main layout ----
  main: "dashboard-font min-h-screen bg-black text-white",
  section: "w-full px-4 py-6 sm:px-6 lg:px-8 2xl:px-10",

  // ---- Summary card (visible when showSummary = true) ----
  summaryCard:
    "rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-5 shadow-2xl shadow-[#071B16]/30 sm:p-6",
  summaryHeader:
    "flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between",
  eyebrow:
    "text-xs font-extrabold uppercase tracking-[0.35em] text-[#6EE7B7]/80",
  title: "mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl",
  subtitle: "mt-2 max-w-2xl text-sm font-medium leading-6 text-[#A7C4B8]",
  statsWrapper: "mt-6",

  // ---- Orders card (table container) ----
  ordersCard:
    "rounded-4xl border border-[#34D399]/15 bg-[#0D241D] p-4 shadow-2xl shadow-[#071B16]/25 sm:p-5",
  ordersCardWithSummary: "mt-6", // conditional class

  // ---- Orders header ----
  ordersHeader:
    "flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between",
  ordersTitle: "text-xl font-black text-white",
  ordersSubtext: "mt-1 text-sm font-medium text-[#A7C4B8]",

  // ---- Filters (search + status dropdown) ----
  ordersFilters: "flex w-full flex-col gap-3 md:flex-row xl:w-auto",

  searchLabel: "relative w-full md:w-96",
  searchIcon:
    "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6EE7B7]",
  searchInput:
    "h-12 w-full rounded-2xl border border-[#34D399]/15 bg-[#071B16]/45 pl-11 pr-4 text-sm font-semibold text-white outline-none placeholder:text-[#A7C4B8] focus:border-[#6EE7B7]",

  filterLabel: "relative w-full md:w-56",
  filterIcon:
    "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6EE7B7]",
  filterSelect:
    "h-12 w-full appearance-none rounded-2xl border border-[#34D399]/15 bg-[#071B16]/45 pl-11 pr-4 text-sm font-bold text-white outline-none focus:border-[#6EE7B7]",
  filterOption: "bg-[#0D241D]",

  // ---- "Show All Orders" button ----
  showAllWrapper: "mt-5 flex justify-center",
  showAllLink:
    "inline-flex items-center justify-center rounded-2xl border border-[#34D399]/25 bg-[#34D399] px-6 py-3 text-sm font-black text-[#065F46] shadow-lg shadow-[#34D399]/20 transition hover:-translate-y-0.5 hover:bg-[#6EE7B7]",
};

export const cancelConfirmStyles = {
  container:
    "fixed right-4 top-4 z-100 w-[320px] rounded-3xl border border-rose-400/25 bg-[#0D241D] p-4 shadow-2xl shadow-[#071B16]/60",
  inner: "flex gap-3",
  iconWrapper:
    "flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-200",
  icon: "h-5 w-5",
  content: "flex-1",
  header: "flex items-center justify-between gap-3",
  title: "font-black text-white",
  closeButton:
    "rounded-full p-1 text-[#A7C4B8] hover:bg-white/10 hover:text-white",
  closeIcon: "h-4 w-4",
  description: "mt-1 text-sm font-medium text-[#A7C4B8]",
  actions: "mt-4 flex gap-2",
  confirmButton:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-2 text-sm font-black text-white hover:bg-rose-400 disabled:cursor-wait disabled:opacity-80",
  loader: "h-4 w-4 animate-spin",
  cancelButton:
    "rounded-xl border border-[#34D399]/20 px-4 py-2 text-sm font-black text-[#D1FAE5] hover:bg-[#34D399] hover:text-[#065F46]",
};

export const infoRowStyles = {
  container: "rounded-2xl border border-[#34D399]/10 bg-[#071B16]/35 p-4",
  wide: "sm:col-span-2",
  header:
    "flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#6EE7B7]/75",
  icon: "h-3.5 w-3.5",
  value: "mt-2 wrap-break-word text-sm font-semibold text-white",
};

export const orderDetailsModalStyles = {
  // Overlay
  overlay:
    "fixed inset-0 z-95 flex items-center justify-center bg-[#071B16]/75 px-3 py-5 backdrop-blur-sm",

  // Modal container
  modal:
    "max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-4xl border border-[#34D399]/15 bg-[#0D241D]",

  // Header
  header:
    "flex items-center justify-between border-b border-[#34D399]/10 bg-[#071B16]/25 px-5 py-4",
  headerTitle: "text-xl font-black text-white",
  headerSubtext: "text-sm text-[#A7C4B8]",
  closeButton: "",
  closeIcon: "h-5 w-5 cursor-pointer text-white",

  // Scrollable content
  content: "max-h-[calc(92vh-70px)] overflow-y-auto p-5",

  // Main grid (Order Info + Customer Info)
  mainGrid: "grid gap-5 xl:grid-cols-2",

  // Shared section styles
  section: "rounded-3xl border border-[#34D399]/10 p-5",
  sectionTitle: "flex items-center gap-2 text-lg font-black",
  sectionIcon: "h-5 w-5 text-[#6EE7B7]",

  // Info grids
  infoGrid3: "mt-4 grid gap-3 md:grid-cols-3",
  infoGrid2: "mt-4 grid gap-3 sm:grid-cols-2",

  // OrderTotalPill – extracted
  totalPillContainer:
    "rounded-2xl border border-[#34D399]/10 bg-[#071B16]/35 p-4",
  totalPillHeader:
    "flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#6EE7B7]/75",
  totalPillIcon: "h-3.5 w-3.5",
  totalPillValueWrapper: "mt-3",
  totalPillValue:
    "inline-flex rounded-full border border-[#34D399]/25 bg-[#34D399] px-3 py-1.5 text-sm font-black text-[#065F46]",

  // Progress section
  progressSection: "mt-5 rounded-3xl border border-[#34D399]/10 p-5",
  progressTitle: "text-lg font-black",
  progressContent: "mt-4",

  // Items section
  itemsSection: "mt-5 rounded-3xl border border-[#34D399]/10 p-5",
  itemsGrid:
    "mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",

  // Actions section
  actionsSection: "mt-5 rounded-3xl border border-[#34D399]/10 p-5",
  actionsTitle: "text-lg font-black",
  actionsButtons: "mt-4 flex flex-wrap gap-2",

  // Action buttons
  actionButtonOnWay: "rounded-full bg-sky-500 px-4 py-2 text-sm font-bold",
  actionButtonDeliver: "rounded-full bg-[#34D399] px-4 py-2 text-sm font-bold",
  actionButtonCancel: "rounded-full bg-red-500 px-4 py-2 text-sm font-bold",
};

export const orderItemCardStyles = {
  card: "rounded-2xl border border-[#34D399]/10 bg-[#071B16]/30 p-3 transition hover:border-[#34D399]/30 hover:bg-[#071B16]/45",
  image: "h-20 w-full rounded-xl object-contain",
  content: "mt-3",
  name: "line-clamp-2 min-h-9 text-sm font-black leading-5 text-white",
  company: "mt-1 truncate text-xs font-bold text-[#6EE7B7]",
  metaGrid: "mt-3 grid grid-cols-2 gap-2 text-[11px] font-extrabold",
  sizeBadge: "rounded-xl bg-[#34D399]/10 px-2 py-1 text-center text-[#D1FAE5]",
  qtyBadge: "rounded-xl bg-white/10 px-2 py-1 text-center text-[#D1FAE5]",
  eachRow:
    "mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-2 py-1.5",
  eachLabel: "text-[11px] font-bold text-[#A7C4B8]",
  eachValue: "text-xs font-black text-white",
  totalRow:
    "mt-2 flex items-center justify-between rounded-xl border border-[#34D399]/15 bg-[#34D399]/10 px-2 py-1.5",
  totalLabel:
    "flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-[#D1FAE5]",
  totalIcon: "h-3.5 w-3.5",
  totalValue: "text-xs font-black text-[#6EE7B7]",
};

export const ordersTableStyles = {
  // Container
  container:
    "mt-5 min-h-72 overflow-x-auto rounded-3xl border border-[#34D399]/10 bg-[#071B16]/25",

  // Table
  table: "w-full min-w-260",

  // Header
  headerRow: "border-b border-[#34D399]/10",
  headerCell:
    "px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#6EE7B7]/80",

  // Body
  body: "divide-y divide-[#34D399]/10",

  // Row
  row: "transition hover:bg-[#34D399]/4",

  // Standard cell (used for customer, amount, payment)
  cell: "px-5 py-5",

  // Customer cell inner
  customerName: "font-extrabold text-white",
  customerPhone:
    "mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#A7C4B8]",
  phoneIcon: "h-3.5 w-3.5 text-[#6EE7B7]",

  // Order ID cell
  cellOrderId: "px-5 py-5 font-black text-[#D1FAE5]",

  // Amount badge
  amountBadge:
    "inline-flex rounded-full border border-[#34D399]/20 bg-[#34D399] px-3 py-1.5 text-xs font-black text-[#065F46]",

  // Payment badge
  paymentBadge:
    "inline-flex rounded-full border border-[#34D399]/20 bg-[#34D399]/10 px-3 py-1.5 text-xs font-extrabold text-[#D1FAE5]",

  // Status cell
  cellStatus: "relative px-5 py-5",
  statusWrapper: "group relative inline-block",

  // Action cell
  cellAction: "px-5 py-5 text-right",

  // View button
  viewButton:
    "inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#34D399] px-4 py-2 text-xs font-black text-[#065F46] transition hover:bg-[#6EE7B7]",
  viewIcon: "h-4 w-4",

  // Empty state
  emptyCell: "px-5 py-14 text-center",
  emptyIcon: "mx-auto h-7 w-7 text-[#6EE7B7]",
  emptyTitle: "mt-3 font-bold text-white",
  emptySubtext: "mt-1 text-sm text-[#A7C4B8]",
};

export const statsGridStyles = {
  grid: "grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

  card: "rounded-3xl border border-[#34D399]/10 bg-[#071B16]/35 p-5 transition hover:-translate-y-1 hover:border-[#34D399]/35 hover:bg-[#071B16]/55",

  cardInner: "flex items-start justify-between gap-4",

  cardTitle: "text-sm font-bold text-[#A7C4B8]",

  cardValue: "mt-2 text-3xl font-black text-[#6EE7B7]",

  cardIconWrapper:
    "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#34D399] text-[#065F46]",

  cardIcon: "h-6 w-6",

  cardSubtext:
    "mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#A7C4B8]",
};

export const statusBadgeStyles = {
  badge:
    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-extrabold",
  icon: "h-3.5 w-3.5",
  chevron: "h-3.5 w-3.5 opacity-70",
  badgeFallback: "border-white/10 bg-white/10 text-white",
};

export const statusDropdownStyles = {
  triggerWrapper: "inline-block",
  triggerButton: "cursor-pointer",

  dropdownMenu:
    "fixed z-9999 w-48 rounded-2xl border border-[#34D399]/20 bg-[#0D241D] p-2 shadow-2xl shadow-[#071B16]/60",

  optionButton:
    "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold text-[#D1FAE5] transition hover:bg-[#34D399] hover:text-[#065F46]",

  optionIcon: "h-4 w-4",
};

export const statusTimelineStyles = {
  // Cancelled state
  cancelledContainer:
    "inline-flex items-center gap-3 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-rose-200",
  cancelledIcon: "h-5 w-5",
  cancelledText: "text-sm font-bold",

  // Timeline container
  timeline: "flex flex-wrap items-center gap-2",

  // Step wrapper (each step + optional line)
  stepWrapper: "flex items-center gap-2",

  // Inner step (dot + label)
  stepInner: "flex items-center gap-2",

  // Dot
  stepDot: "h-4 w-4 rounded-full border-2",
  stepDotActive: "border-[#6EE7B7] bg-[#6EE7B7]",
  stepDotInactive: "border-white/20",

  // Label
  stepLabel: "text-xs font-extrabold uppercase tracking-[0.14em]",
  stepLabelActive: "text-[#D1FAE5]",
  stepLabelInactive: "text-[#A7C4B8]",

  // Connecting line
  stepLine: "h-px w-8",
  stepLineActive: "bg-[#6EE7B7]",
  stepLineInactive: "bg-white/10",
};

export const toastStyles = {
  toast:
    "soft-enter fixed right-4 top-4 z-100 max-w-sm rounded-2xl border px-4 py-3 text-sm font-bold shadow-2xl",
  toastSuccess: "border-[#34D399]/30 bg-[#0D241D] text-[#D1FAE5]",
  toastWarning: "border-rose-400/30 bg-rose-950 text-rose-100",
};
