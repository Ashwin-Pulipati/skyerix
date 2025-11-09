"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { CitySearchComponent } from "./city-search-component";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2 md:py-0">
      <div className="container mx-auto flex items-center justify-between h-auto md:h-16">
        <Link
          href="/"
          className="flex flex-row items-center gap-1 md:gap-3 cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="SKYERIS logo"
            width={96}
            height={96}
            className="w-14 h-14 md:w-20 md:h-20 object-contain"
          />
          <span className="font-display text-xl md:text-3xl font-bold text-gradient leading-tight md:leading-none">
            SKYERIS
          </span>
        </Link>

        <div className="hidden md:block w-full md:max-w-xs lg:max-w-xl ">
          <CitySearchComponent />
        </div>

        <nav className="flex items-center">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
