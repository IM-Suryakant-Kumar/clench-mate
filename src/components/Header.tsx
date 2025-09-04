import Image from "next/image";
import Link from "next/link";
import { MdSearch } from "react-icons/md";

export default function Header() {
  return (
    <header className="bg-secondary fixed top-0 left-0 flex h-25 w-full flex-wrap items-center justify-between gap-2 px-4 py-2 md:h-16">
      <Link href="/home" className="flex items-center gap-1">
        <Image src="/logo.png" alt="Logo" width={30} height={30} />
        <h1 className="text-logo text-xl font-bold">ClenchMate</h1>
      </Link>
      <div className="border-logo h-8 w-8 rounded-full border-2 md:order-3">
        <Image src="/logo.png" alt="User Avatar" width={32} height={32} />
      </div>
      <div className="bg-primary flex h-8 w-full items-center justify-between overflow-hidden rounded-md border-2 border-gray-400 md:max-w-sm">
        <input
          type="search"
          className="bg-primary h-full w-[calc(100%-2rem)] px-2 outline-none"
          placeholder="Search..."
        />
        <MdSearch className="w-8 " size="1.2em" fill="orangered" />
      </div>
    </header>
  );
}
