import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Jomhuria } from "next/font/google";
import Link from "next/link";

const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const Dashboard: FC = () => {
	const [username, setUsername] = useState("NO NAME");
	useEffect(() => {
		const getuser = window.localStorage.getItem("username");
		if (getuser === null) {
			localStorage.removeItem("token");
			localStorage.removeItem("username");
			window.location.replace("/login");
			return;
		}
		setUsername(getuser);
	}, []);
	return (
		<main
			className={
				jomhuria.className +
				" min-h-screen  flex flex-col align-middle p-14 gap-10 tracking-wide text-[#496466] text-7xl"
			}
		>
			<h1>Hello, {username}!</h1>
			<div className="grid grid-cols-3 gap-14">
				<Link
					href="/drivers"
					className="bg-[#9BC0C2] p-5 flex flex-col align-middle justify-center rounded-xl"
				>
					<div className="flex flex-col align-middle justify-center mx-auto">
						<Image
							src={"/delivery-man.png"}
							width={250}
							height={200}
							alt="Delivery"
							className="mx-auto my-20"
						/>
					</div>
					<h2 className="text-white text-center">Manage Drivers Data</h2>
				</Link>
				<Link
					href="/vehicles"
					className="bg-[#9BC0C2] p-5 flex flex-col align-middle justify-center rounded-xl"
				>
					<div className="flex flex-col align-middle justify-center mx-auto">
						<Image
							src={"/motorcycle.png"}
							width={250}
							height={200}
							alt="Vehicles"
							className="mx-auto my-20"
						/>
					</div>
					<h2 className="text-white text-center">Manage Vehicles Data</h2>
				</Link>
				<Link
					href="/schedules"
					className="bg-[#9BC0C2] p-5 flex flex-col align-middle justify-center rounded-xl"
				>
					<div className="flex flex-col align-middle justify-center mx-auto">
						<Image
							src={"/timetable.png"}
							width={250}
							height={200}
							alt="Schedule"
							className="mx-auto my-20"
						/>
					</div>
					<h2 className="text-white text-center">Manage Schedules Data</h2>
				</Link>
				<Link
					href="/misc/adduser"
					className="bg-[#9BC0C2] p-10 flex flex-col align-middle justify-center rounded-xl"
				>
					<h2 className="text-white text-center">Add New User</h2>
				</Link>
				<Link
					href="/misc/restaurants"
					className="bg-[#9BC0C2] p-10 flex flex-col align-middle justify-center rounded-xl"
				>
					<h2 className="text-white text-center">See Restaurants</h2>
				</Link>
				<Link
					href="/misc/universities"
					className="bg-[#9BC0C2] p-10 flex flex-col align-middle justify-center rounded-xl"
				>
					<h2 className="text-white text-center">See Universities</h2>
				</Link>
			</div>
		</main>
	);
};

export default Dashboard;
