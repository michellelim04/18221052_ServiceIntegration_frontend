import { FC, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";
import { BsTrash3 } from "react-icons/bs";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });

interface Schedule {
	schedule_id: number;
	route_name: string;
	departure_location: string;
	arrival_location: string;
	departure_time: string;
	arrival_time: string;
	vehicle_id: number;
	driver_id: number;
	status: string;
}
const Drivers: FC = () => {
	const [scheduleList, setSchedules] = useState<Schedule[]>([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token === null) {
			window.location.replace("/login");
			return;
		}
		fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/schedule",
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
				setSchedules(responsejson);
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
				<span className="text-7xl text-[#496466] w-fit">Schedules Data</span>
				<div className="flex flex-row align-middle justify-center gap-5">
					<Link
						href={"/schedules/add"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<FiPlus size={40} />
					</Link>
					<Link
						href={"/schedules/edit"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<SlPencil size={40} />
					</Link>
					<Link
						href={"/schedules/delete"}
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
						<th className="bg-[#9BC0C2] text-white text-3xl">Route</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">Departure Loc</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Arrival Loc</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">
							Departure Time
						</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Arrival Time</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Vehicle</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Driver</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Status</th>
					</tr>
				</thead>
				<tbody>
					{scheduleList.map((schedule, index) => {
						return (
							<tr className="row" key={schedule.schedule_id}>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.schedule_id}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.route_name}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.departure_location}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.arrival_location}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.departure_time}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.arrival_time}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.vehicle_id}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.driver_id}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{schedule.status}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
};
export default Drivers;
