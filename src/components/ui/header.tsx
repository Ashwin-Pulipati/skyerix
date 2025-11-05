import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur h-16 supports-[backdrop-filter]:bg-background/60 px-4 py-3">
      <div className="container mx-auto">
        <Link href="/" className="flex items-center gap-2 cursor-pointer ">
          <Image src="/logo.png" alt="logo" width={64} height={64} />
          <h1 className="font-display text-3xl font-bold text-gradient">
            SKYERIS
          </h1>
        </Link>
      </div>
      <nav>
        <ThemeToggle />
      </nav>
    </header>
  );
};

export default Header;
