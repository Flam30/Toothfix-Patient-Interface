import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC = () => {
    return (
        //TODO change bg color to match theme
        <nav className="bg-background flex items-center justify-between p-4 min-w-full">  
              <div className="flex items-center transition ease-out duration-300 hover:w-[260px]">
                {/* TODO: make image clickable to redirect you to the main */}
                <Link href="/">
                    <Image
                     className="ml-2 justify-start"
                     src="/toothfix.svg" 
                     alt="toothfixlogo" 
                     width= {275}
                     height= {61}
                     />
                </Link>
                </div>
                <ul className="flex items-center space-x-9 cursor-auto mr-5 font-bebas text-[2.9rem] text-text">
                    {/* TODO add links and hover animations maybe*/}
                    <li className=" hover:text-primary"><Link href="/clinicselect">Book</Link></li>
                    <li className=" hover:text-primary"><Link href="/profile">My pages</Link></li>
                </ul> 
            </nav>
    )
}
export default Navbar;