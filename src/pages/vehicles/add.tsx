import { FC, MouseEvent, useState } from "react";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const VehiclesCreate: FC = () => {
	const router = useRouter();
	const [id, setId] = useState("");
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [registNo, setRegistNo] = useState("");
	const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const vehicle_id = parseInt(id) as number;
		if (Number.isNaN(vehicle_id)) {
			toast.error("ID must be a number");
			return;
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

		const savedata = await fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/vehicle",
			{
				method: "POST",
				body: JSON.stringify({
					vehicle_id: parseInt(id),
					make,
					model,
					year,
					registration_no: registNo,
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
		toast.success("Successfully saved new vehicle");
		router.push("/vehicles");
		return;
	};
	return (
		<main
			className={
				" bg-white min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-widest"
			}
		>
			<h1 className="text-5xl text-[#496466]">Create New Vehicle</h1>
			<form className="w-full space-y-5">
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Vehicle ID
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
						Vehicle Make
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={make}
						onChange={(e) => setMake(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Vehicle Model
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={model}
						onChange={(e) => setModel(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Manufacture Year
					</label>
					<input
						type="number"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={year}
						onChange={(e) => setYear(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Registration No
					</label>
					<input
						type="tel"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={registNo}
						onChange={(e) => setRegistNo(e.target.value)}
					/>
				</div>
			</form>
			<div className="flex flex-row align-middle justify-between">
				<Link
					href={"/vehicles"}
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
export default VehiclesCreate;
