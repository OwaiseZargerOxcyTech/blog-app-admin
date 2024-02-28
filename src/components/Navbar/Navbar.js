"use client";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { navigationItems } from "./navigationItems";
import MobileNavbar from "./MobileNavbar";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };
  const pathname = usePathname(null);

  useEffect(() => {
    const parentItem = navigationItems.find((item) => item.sublinks.some((sublink) => sublink.href === pathname));

    if (parentItem) {
      navigationItems.map((item) => (item.current = false));
      parentItem.current = true;
    }
  }, [pathname]);

  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <Disclosure as="nav">
          {({ open }) => (
            <div>
              <div className="h-20 flex items-center justify-between  px-2 sm:px-0">
                <div className="flex items-center flex-shrink-0 ">
                  {/* Mobile menu button */}
                  <div className="flex md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-full font-bold bg-gray-200 p-4 text-gray-900 hover:bg-gray-100 hover:text-gray-900 border-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? <XMarkIcon className="block h-7 w-7" aria-hidden="true" /> : <Bars2Icon className="block h-7 w-7" aria-hidden="true" />}
                    </Disclosure.Button>
                  </div>

                  <h1 className="text-gray-700 hover:text-blue-500 text-2xl font-bold ml-4  md:ml-0 cursor-pointer">Main</h1>
                </div>

                <div className="flex items-center space-x-8">
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {/* <NavHoverDropdown items={navigationItems} /> */}
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li
                          style={{
                            display: "inline-block",
                            marginRight: "30px",
                          }}>
                          <Link href="/">
                            <b>Home</b>
                          </Link>
                        </li>
                        <li
                          style={{
                            display: "inline-block",
                            marginRight: "30px",
                            position: "relative",
                          }}
                          onMouseEnter={toggleSubMenu}
                          onMouseLeave={toggleSubMenu}>
                          <Link href="/blog1" onClick={toggleSubMenu}>
                            <b>Blog</b>
                          </Link>
                          <ul
                            className="shadow"
                            style={{
                              width: 150,
                              listStyle: "none",
                              padding: 20,
                              marginLeft: -30,
                              marginTop: 2,
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              background: "#fff",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                              display: isSubMenuVisible ? "block" : "none",
                            }}>
                            <li
                              style={{
                                display: "block",
                                paddingLeft: "10px",
                                paddingRight: 30,
                                paddingTop: 20,
                              }}>
                              <Link href="/blog1">Blog1</Link>
                            </li>
                            <li
                              style={{
                                display: "block",
                                paddingLeft: "10px",
                                paddingRight: 30,
                                paddingTop: 20,
                              }}>
                              <Link href="/blog2">Blog2</Link>
                            </li>
                            <li
                              style={{
                                display: "block",
                                paddingLeft: "10px",
                                paddingRight: 30,
                                paddingTop: 20,
                              }}>
                              <Link href="/blog3">Blog3</Link>
                            </li>
                          </ul>
                        </li>
                        <li style={{ display: "inline-block", marginRight: "30px" }}>
                          <Link href="/invoice">
                            <b>Invoice</b>
                          </Link>
                        </li>
                        <li style={{ display: "inline-block" }}>
                          <Link href="/cont">
                            <b>Contact</b>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {session ? (
                    <button className="bg-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold py-2 px-4 rounded" onClick={handleLogout}>
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link href="/sign-up">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">Sign Up</button>
                      </Link>
                      <Link href="/login">
                        <button className="bg-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold py-2 px-4 rounded">Sign In</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile Navbar */}
              <MobileNavbar navigationItems={navigationItems} open={open} />
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
