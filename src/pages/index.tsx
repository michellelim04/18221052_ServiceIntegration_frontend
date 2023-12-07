import { Jomhuria } from "next/font/google";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
export default function Home() {
	return (
		<main className="min-h-screen  flex flex-col align-middle justify-center p-10 gap-10">
			<h1
				className={
					jomhuria.className +
					" w-3/4 mx-auto text-center text-8xl text-[#496466]"
				}
			>
				Welcome to Just-In-Time
				<br />
				Transportation Scheduling for
				<br />
				U-Canteen!
			</h1>
			<h2 className="w-3/4 mx-auto text-center font-semibold text-xl">
				Just-In-Time Transportation Scheduling is an API developed to help
				businesses with their own fleet to ensure just-in-time transportation
				scheduling. This API enables management of vehicles owned, drivers
				employed, and the transportation schedules.
			</h2>
		</main>
	);
}
