"use client";

import { Container } from "common/Container";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useCartContext } from "context/cart-context";

export default function Header() {
  const { cartProducts } = useCartContext();
  const pathname = usePathname();

  return (
    <header
      className={"bg-gradient-to-r from-slate-900 to-zinc-900 text-white"}
    >
      <Container>
        <div className={"flex justify-between items-center py-5"}>
          <Link href={"/"} className={"font-medium text-2xl"}>
            E-Commerce
          </Link>
          <nav className={"flex items-center gap-4 text-zinc-400"}>
            <Link
              href={"/"}
              className={clsx(
                "relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 transition-colors",
                { "text-white": pathname === "/" }
              )}
            >
              Home
            </Link>
            <Link
              href={"/products"}
              className={clsx(
                "relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300",
                { "text-white": pathname.includes("/products") }
              )}
            >
              All Products
            </Link>
            <Link
              href={"/categories"}
              className={clsx(
                "relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300",
                { "text-white": pathname.includes("/categories") }
              )}
            >
              Categories
            </Link>
            <Link
              href={"/account"}
              className={clsx(
                "relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300",
                { "text-white": pathname.includes("/account") }
              )}
            >
              Account
            </Link>
            <Link
              href={"/cart"}
              className={clsx(
                "relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300",
                { "text-white": pathname.includes("/cart") }
              )}
            >
              Cart ({cartProducts.length})
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
