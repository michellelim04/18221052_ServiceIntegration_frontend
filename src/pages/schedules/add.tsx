import { FC, MouseEvent, useEffect, useState } from "react";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const DriversCreate: FC = () => {
	const router = useRouter();
	const [id, setId] = useState("");
	const [route_name, setRouteName] = useState("");
	const [departure_location, setDepartureLocation] = useState("");
	const [arrival_location, setArrivalLocation] = useState("");
	const [departure_time, setDepartureTime] = useState("");
	const [vehicle_id, setVehicleId] = useState("");
	const [driver_id, setDriverId] = useState("");
	const [status, setStatus] = useState("");

	const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const driverparsed = parseInt(driver_id);
		const idparsed = parseInt(id);
		const vehicleparsed = parseInt(vehicle_id);

		if (
			Number.isNaN(driverparsed) ||
			Number.isNaN(idparsed) ||
			Number.isNaN(vehicleparsed)
		) {
			toast.error("Id's must be numbers");
		}

		const token = localStorage.getItem("token");
		if (token === null) {
			toast.error("Not Authenticated");
			window.location.replace("/login");
			return;
		}
		const tokenSplit = token.split("");
		tokenSplit[0] = "B";
		const tokenJoin = tokenSplit.join("");

		const departureParsed = departure_time.split("T").join(" ");
		const departureFixed = departureParsed + ":00";

		const savedata = await fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/schedule",
			{
				method: "POST",
				body: JSON.stringify({
					schedule_id: idparsed,
					route_name,
					departure_location,
					arrival_location,
					departure_time: departureFixed,
					vehicle_id: vehicleparsed,
					driver_id: driverparsed,
					status,
				}),
				headers: {
					Authorization: tokenJoin,
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response)
			.catch((err) => err);
		if (savedata instanceof Error) {
			toast.error("Something went wrong....");
			return;
		}
		if (savedata.status !== 200) {
			toast.error("Failed to save...");
			return;
		}
		toast.success("Successfully saved new schedule");
		router.push("/schedules");
		return;
	};
	return (
		<main
			className={
				" bg-white min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-widest"
			}
		>
			<h1 className="text-5xl text-[#496466]">Create New Schedule</h1>
			<form className="w-full space-y-5">
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Schedule ID
					</label>
					<input
						type="number"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Route Name
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={route_name}
						onChange={(e) => setRouteName(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Departure Location
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={departure_location}
						onChange={(e) => setDepartureLocation(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Arrival Location
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={arrival_location}
						onChange={(e) => setArrivalLocation(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Departure Time
					</label>
					<input
						type="datetime-local"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={departure_time}
						onChange={(e) => setDepartureTime(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Vehicle
					</label>
					<input
						type="number"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={vehicle_id}
						onChange={(e) => setVehicleId(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Driver
					</label>
					<input
						type="number"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={driver_id}
						onChange={(e) => setDriverId(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Status
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					/>
				</div>
			</form>
			<div className="flex flex-row align-middle justify-between">
				<Link
					href={"/schedules"}
					className="bg-[#D4EEF0] rounded-xl shadow-xl px-5 py-3 w-56 text-center font-bold"
				>
					Cancel
				</Link>
				<button
					className="bg-[#D4EEF0] rounded-xl shadow-xl px-5 py-3 w-56 text-center font-bold"
					onClick={(e) => {
						handleSave(e);
					}}
				>
					Save
				</button>
			</div>
		</main>
	);
};
export default DriversCreate;
