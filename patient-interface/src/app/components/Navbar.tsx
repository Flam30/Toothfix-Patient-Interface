import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background flex items-center justify-between p-4 min-w-full">
      <div className="flex items-center">
        <Link href="/">
          <Image
            className="hidden sm:block ml-2 justify-start"
            src="/toothfix.svg"
            alt="toothfixlogo"
            width={275}
            height={61}
          />
        </Link>
        <Link href="/">
          <Image
            className="block sm:hidden ml-0 justify-start"
            src="/toothfix.svg"
            alt="toothfixlogo"
            width={167}
            height={37.04}
          />
        </Link>
      </div>
      <ul className="flex items-center space-x-4 sm:space-x-9 cursor-auto mr-0 sm:mr-5 font-bebas text-3xl sm:text-[2.9rem] text-text">
        <li className=" hover:text-primary">
          <Link href="/clinicselect">Book</Link>
        </li>
        <li className=" hover:text-primary">
          <Link href="/profile">My pages</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
