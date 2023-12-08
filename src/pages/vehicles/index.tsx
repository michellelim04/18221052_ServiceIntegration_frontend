import { FC, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";
import { BsTrash3 } from "react-icons/bs";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });

interface Vehicle {
	vehicle_id: number;
	make: string;
	model: string;
	year:number;
	registration_no: string;
}
const Vehicles: FC = () => {
	const [vehicleList, setVehicles] = useState<Vehicle[]>([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token === null) {
			window.location.replace("/login");
			return;
		}
		fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/vehicle",
			{
				headers: {
					Authorization: token,
				},
			}
		).then((response) => {
			if (response.status !== 200) {
				toast.error("Failed to retrieve items");
				return;
			}
			response.json().then((responsejson) => {
				setVehicles(responsejson);
			});
			return;
		});
	}, []);

	return (
		<main
			className={
				jomhuria.className +
				" bg-white min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-widest"
			}
		>
			<div className="flex flex-row align-middle justify-between">
				<span className="text-7xl text-[#496466] w-fit">Vehicles Data</span>
				<div className="flex flex-row align-middle justify-center gap-5">
					<Link
						href={"/vehicles/add"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<FiPlus size={40} />
					</Link>
					<Link
						href={"/vehicles/edit"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<SlPencil size={40} />
					</Link>
					<Link
						href={"/vehicles/delete"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<BsTrash3 size={40} />
					</Link>
				</div>
			</div>
			<table className="border-seperate border-spacing-9 text-center">
				<thead>
					<tr className="row">
						<th className=" bg-[#9BC0C2] text-white text-3xl">ID</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">Vehicle Make</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">Vehicle Model</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Manufacture Year</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Regustration No</th>
					</tr>
				</thead>
				<tbody>
					{vehicleList.map((vehicle, index) => {
						return (
							<tr className="row" key={vehicle.vehicle_id}>
								<td className="text-2xl bg-slate-200 py-3">
									{vehicle.vehicle_id}
								</td>
								<td className="text-2xl bg-slate-200 py-3">{vehicle.make}</td>
								<td className="text-2xl bg-slate-200 py-3">
									{vehicle.make}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{vehicle.model}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{vehicle.year}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
};
export default Vehicles;
