const Skeleton = ({ className = "" }) => (
  <span
    aria-hidden="true"
    className={`block animate-pulse rounded-lg bg-[#A7E8C1]/12 ${className}`}
  />
);

export default Skeleton;
