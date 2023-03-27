import { useState } from "react";

import { menu, close } from "../assets";
import { navLinks } from "../lib";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full pl-6 flex justify-between items-center bg-darkMed navbar">
      
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        { navLinks.map((nav, index) => (
          <li
            key={ nav.id }
            className={`
              h-[64px] px-6 flex items-center font-poppins font-semibold cursor-pointer text-[24px] text-lightMed
              hover:bg-dark
              ${ active === nav.title ? "border-b-8 pt-[8px] border-lightMed" : "" }
              ${ index === navLinks.length - 1 ? "mr-16" : "mr-0" }
            `}
            onClick={ () => setActive(nav.title) }
          >
            <a href={` ${ nav.id } `}>{ nav.title }</a>
          </li>
        )) }
      </ul>

      <div className="sm:hidden h-[72px] flex flex-1 justify-end items-center">
        <img
          src={ toggle ? close : menu }
          alt="menu"
          className="w-[48px] h-[48px] object-contain mr-6"
          onClick={ () => setToggle(!toggle) }
        />

        <div
          className={` bg-footerPrimary absolute top-[72px] min-w-[140px] sidebar z-20
            ${ !toggle ? "hidden" : "flex" } `}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            { navLinks.map((nav, index) => (
              <li
                key={ nav.id }
                className={` w-[100%] h-[52px] pl-3 flex items-center font-poppins font-semibold text-[20px] text-secondaryWhite 
                  cursor-pointer hover:bg-secondaryDark
                  ${ active === nav.title ? "border-l-8 border-darkMed" : "" }
                  ${ index === 0 ? "mt-3" : "mt-0" }
                `}
                onClick={ () => setActive(nav.title) }
              >
                <a href={` ${ nav.id } `}>{ nav.title }</a>
              </li>
            )) }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;