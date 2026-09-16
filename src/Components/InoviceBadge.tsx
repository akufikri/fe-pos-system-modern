import { cn } from "@/lib/utils";

const InvoiceBadge = ({ isPaid }: { isPaid: boolean }) => {
  return (
    <>
      <div>
        <span
          className={cn(
            "px-3 py-1 rounded text-sm font-bold", // 👈 Class permanen dasar
            isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700" // 👈 Logika dinamis aman tanpa tabrakan
          )}
        >
          {isPaid ? "LUNAS" : "PENDING"}
        </span>
      </div>
    </>
  );
};
