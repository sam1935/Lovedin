"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Crumb = { label: string; href: string; isCurrent: boolean };

function formatSegment(seg: string): string {
  return seg
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function Breadcrumb() {
  const pathname = usePathname();

  // Memoize parts to prevent recreation on every render
  const parts = useMemo(() => {
    return pathname?.split("/").filter(Boolean) || [];
  }, [pathname]);

  const crumbs: Crumb[] = useMemo(() => {
    const acc: Crumb[] = [];
    parts.forEach((part, idx) => {
      const href = "/" + parts.slice(0, idx + 1).join("/");
      acc.push({
        label: formatSegment(part),
        href,
        isCurrent: idx === parts.length - 1,
      });
    });
    return acc;
  }, [parts]);

  if (parts.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full px-4 lg:px-10 xl:px-[134px] h-[50px]"
      style={{
        background: "linear-gradient(180deg, #F23B5A 11.89%, #F23B5A 73.24%)",
      }}
    >
      <ol className="flex flex-wrap items-center gap-1 text-base leading-6 py-3 text-white max-w-[1300px] mx-auto">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-1">/</span>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center">
            {c.isCurrent ? (
              <span className="font-semibold">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:underline">
                {c.label}
              </Link>
            )}
            {i < crumbs.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
