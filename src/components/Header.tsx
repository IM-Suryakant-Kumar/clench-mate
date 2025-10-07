import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

export default async function Header() {
	const session = await auth.api.getSession({ headers: await headers() });
	return (
		<header className="w-full h-22 bg-accent md:h-15 fixed left-0 top-0 flex flex-wrap justify-between items-center gap-2 px-4 py-2">
			<h1 className="font-cinzel font-bold text-orange-500 text-xl">
				ClenchMate
			</h1>
			<Link href="/profile">
				<Avatar>
					<AvatarImage src={session?.user.image || ""} />
					<AvatarFallback>{session?.user.name[0]}</AvatarFallback>
				</Avatar>
			</Link>
			{/* <div className="w-full md:w-1/3 overflow-hidden rounded"> */}
				{/* <Input className="w-full pl-2" type="search" placeholder="Search..." /> */}
			{/* </div> */}
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
		</header>
	);
}
