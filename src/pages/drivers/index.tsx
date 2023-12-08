import { FC, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";
import { BsTrash3 } from "react-icons/bs";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });

interface Driver {
	driver_id: number;
	name: string;
	license_no: string;
	date_of_birth: string;
	contact_no: string;
	email: string;
	address: string;
}
const Drivers: FC = () => {
	const [driverList, setDrivers] = useState<Driver[]>([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token === null) {
			window.location.replace("/login");
			return;
		}
		fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/driver",
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
				setDrivers(responsejson);
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
				<span className="text-7xl text-[#496466] w-fit">Drivers Data</span>
				<div className="flex flex-row align-middle justify-center gap-5">
					<Link
						href={"/drivers/add"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<FiPlus size={40} />
					</Link>
					<Link
						href={"/drivers/edit"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<SlPencil size={40} />
					</Link>
					<Link
						href={"/drivers/delete"}
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
						<th className="bg-[#9BC0C2] text-white text-3xl">Name</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">License No</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Date of Birth</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Contact No</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Email</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Address</th>
					</tr>
				</thead>
				<tbody>
					{driverList.map((driver, index) => {
						return (
							<tr className="row" key={driver.driver_id}>
								<td className="text-2xl bg-slate-200 py-3">
									{driver.driver_id}
								</td>
								<td className="text-2xl bg-slate-200 py-3">{driver.name}</td>
								<td className="text-2xl bg-slate-200 py-3">
									{driver.license_no}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{driver.date_of_birth}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{driver.contact_no}
								</td>
								<td className="text-2xl bg-slate-200 py-3">{driver.email}</td>
								<td className="text-2xl bg-slate-200 py-3">{driver.address}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
};
export default Drivers;
