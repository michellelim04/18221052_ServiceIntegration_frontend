import { FC, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Jomhuria } from "next/font/google";
import { useRouter } from "next/router";

const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const Header: FC = () => {
	const router = useRouter();
	const [loggedin, setLoggedin] = useState(false);
	const handleRedirect = (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		router.push("/login");
		return;
	};
	useEffect(() => {
		const token = localStorage.getItem("token");
		setLoggedin(token === null);
	}, []);
	return (
		<header
			className={
				jomhuria.className +
				" bg-[#496466] flex flex-row align-middle justify-between p-3 h-auto z-40"
			}
		>
			<span>
				<Image src={"/logo.png"} width={130} height={50} alt="Main" />
			</span>
			<span className="h-full flex flex-row align-middle justify-center my-auto">
				{!loggedin && (
					<a
						href="/login"
						className="shadow-xl bg-white px-8 py-2 rounded-lg  text-[#496466] text-3xl hover:bg-gray-300 hover:cursor-pointer hover:scale-[0.95] hover:shadow-none tracking-wide"
						onClick={handleRedirect}
					>
						Login
					</a>
				)}
				{loggedin && (
					<h4 className="text-white text-4xl tracking-wide">Logged In</h4>
				)}
			</span>
		</header>
	);
};

export default Header;
