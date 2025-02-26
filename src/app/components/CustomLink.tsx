"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CustomLinkProps {
    link: string;
    children: React.ReactNode; // Массив элементов
  }

export default function CustomLink({ link, children }: CustomLinkProps ) {
  const pathname = usePathname();
  return (
    <>
      <Link
        href={link}
        className={clsx("ml-4 text-white hover:text-gray-400", {
          "bg-sky-100 text-blue-600": pathname === link,
        })}
      >{children}</Link>
    </>
  );
}
