import Header from "@/components/Header";
import RightSidebar from "@/components/RightSidebar";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<Sidebar />
			<RightSidebar />
			{children}
		</>
	);
}
