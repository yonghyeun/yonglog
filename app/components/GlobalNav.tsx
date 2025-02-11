import Link from "next/link";
import ThemeButton from "./client/ThemeButton";
import { FaGithub } from "./Icons";
import SearchZone from "./client/SearchZone";

const GlobalNav = () => {
  return (
    <nav
      id="GNB"
      className="fixed z-[999] top-0 left-0 right-0  lg: py-3 bg-indigo-950 text-white"
    >
      <div className="flex justify-center">
        <ul className="flex justify-between items-center shadow-md px-2 w-full lg:w-[800px] ">
          <li>
            <h1 className="text-2xl  flex items-start ">
              <Link href="/">abonglog</Link>
            </h1>
          </li>
          <li>
            <ul className="flex gap-4 items-center">
              <li>
                <SearchZone />
              </li>
              <li className="text-base hover:text-blue-500 cursor-pointer font-semibold">
                <ThemeButton />
              </li>
              <li className="text-base hover:text-blue-500 cursor-pointer font-semibold">
                <FaGithub size={20} />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default GlobalNav;
