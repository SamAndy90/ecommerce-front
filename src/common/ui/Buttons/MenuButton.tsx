"use client";

import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useCartContext } from "context/cart-context";
import { Fragment } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoTrashOutline, IoHeartOutline } from "react-icons/io5";

export type MenuButtonProps = {
  id: string;
  className?: string;
};

export const MenuButton = ({ id, className = "" }: MenuButtonProps) => {
  const { removeProductFully } = useCartContext();
  return (
    <div className={clsx("", className)}>
      <Menu as={"div"} className={"relative inline-block text-left"}>
        <div>
          <Menu.Button
            className={
              "group inline-flex w-full justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none transition-colors"
            }
          >
            <BsThreeDots
              className={
                "h-5 w-5 text-lime-950 group-hover:text-lime-800 transition-colors"
              }
              aria-hidden={"true"}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter={"transition ease-out duration-100"}
          enterFrom={"transform opacity-0 scale-95"}
          enterTo={"transform opacity-100 scale-100"}
          leave={"transition ease-in duration-75"}
          leaveFrom={"transform opacity-100 scale-100"}
          leaveTo={"transform opacity-0 scale-95"}
        >
          <Menu.Items
            className={
              "absolute right-0 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            }
          >
            <div className={"py-1 divide-y divide-black/5"}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => removeProductFully(id)}
                    className={clsx(
                      "group flex w-full items-center py-2 px-2 transition-colors gap-1.5 leading-none",
                      {
                        "bg-lime-950 text-white": active,
                        "text-gray-900": !active,
                      }
                    )}
                  >
                    <IoTrashOutline className={"size-5"} />
                    Delete
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    disabled={true}
                    className={clsx(
                      "group flex w-full items-center py-2 px-2 transition-colors gap-1.5 leading-none disabled:text-gray-400",
                      {
                        "bg-lime-950 text-white": active,
                        "text-gray-900": !active,
                      }
                    )}
                  >
                    <IoHeartOutline className={"size-5"} />
                    Add to favourite
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
