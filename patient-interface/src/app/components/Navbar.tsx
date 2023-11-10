import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
    return (
        //TODO change bg color to match theme
        <nav className="bg-white flex items-center justify-between p-4 min-w-full">  
              <div className="flex items-center">
                {/* TODO: make image clickable to redirect you to the main */}
                    <Image
                     className="ml-2 justify-start"
                     src="/toothfix.svg" 
                     alt="toothfixlogo" 
                     width= {275}
                     height= {61}
                     />
                </div>
                <ul className="flex items-center space-x-9 cursor-auto mr-5">
                    {/* TODO add links */}
                    <li><a href="https://http.dog/204.jpg">Book</a></li>
                    <li><a href="https://http.dog/204.jpg">My pages</a></li>
                </ul> 
            </nav>
    )
}
export default Navbar;