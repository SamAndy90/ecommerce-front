"use client";

import { Container } from "common/Container";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useCartContext } from "context/cart-context";
import { useState } from "react";
import { ButtonBase } from "common/ui";
import { FiMenu } from "react-icons/fi";
import { TbX } from "react-icons/tb";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartProducts } = useCartContext();
  const pathname = usePathname();

  return (
    <header
      className={"bg-gradient-to-r from-slate-900 to-zinc-900 text-white"}
    >
      <Container>
        <div className={"flex justify-between items-center py-5"}>
          <Link href={"/"} className={"font-medium text-lg md:text-2xl"}>
            E-Commerce
          </Link>
          <nav className={"hidden md:flex items-center gap-4 text-zinc-400"}>
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
          <div
            className={clsx(
              "fixed bottom-0 right-0 top-0 z-40 flex min-w-[260px] flex-col items-stretch gap-y-6 bg-gradient-to-r from-slate-900 to-zinc-900 p-2 pt-10 shadow-xl transition-transform",
              {
                "translate-x-full": !isMenuOpen,
              }
            )}
          >
            <ButtonBase
              className={{
                button: "absolute right-4 top-4 appearance-none md:hidden",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <TbX
                className={
                  "size-5 text-white hover:text-slate-200 transition-colors"
                }
              />
            </ButtonBase>

            <nav className={"flex flex-col gap-y-3 items-center text-zinc-400"}>
              <Link
                href={"/"}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "text-lg relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 transition-colors",
                  { "text-white": pathname === "/" }
                )}
              >
                Home
              </Link>
              <Link
                href={"/products"}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "text-lg relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300 whitespace-nowrap",
                  { "text-white": pathname.includes("/products") }
                )}
              >
                All Products
              </Link>
              <Link
                href={"/categories"}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "text-lg relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300",
                  { "text-white": pathname.includes("/categories") }
                )}
              >
                Categories
              </Link>
              <Link
                href={"/account"}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "text-lg relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300",
                  { "text-white": pathname.includes("/account") }
                )}
              >
                Account
              </Link>
              <Link
                href={"/cart"}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  "text-lg relative hover:text-white after:block after:absolute after:w-full after:h-[1px] after:rounded after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform transition-colors after:duration-300 whitespace-nowrap",
                  { "text-white": pathname.includes("/cart") }
                )}
              >
                Cart ({cartProducts.length})
              </Link>
            </nav>
          </div>
          <ButtonBase
            type={"button"}
            className={{
              button: "block appearance-none md:hidden",
            }}
            onClick={() => setIsMenuOpen(true)}
            title={"Open mobile menu"}
          >
            <FiMenu
              className={
                "size-6 stroke-2 text-white hover:text-slate-200 transition-colors"
              }
            />
          </ButtonBase>
        </div>
      </Container>
    </header>
  );
}
