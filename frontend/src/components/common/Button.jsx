import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
}) {
  const styles = {
    primary:
      "bg-orange-600 hover:bg-orange-700 text-white",
    secondary:
      "border border-orange-600 text-orange-600 hover:bg-orange-50",
  };

  return (
    <button
      className={`${styles[variant]} inline-flex items-center gap-2 px-7 py-3 rounded-lg font-semibold transition`}
    >
      {children}
      <ArrowRight size={18} />
    </button>
  );
}