import { FC, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";
import { BsTrash3 } from "react-icons/bs";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });

interface University {
	university_name: string;
	lat:number;
	long: number;

}
const Universities: FC = () => {
	const [universitiesList, setUniversities] = useState<University[]>([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token === null) {
			window.location.replace("/login");
			return;
		}
		fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/schedule/listuni",
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
				setUniversities(responsejson);
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
				<span className="text-7xl text-[#496466] w-fit">Universities Data</span>
			</div>
			<table className="border-seperate border-spacing-9 text-center">
				<thead>
					<tr className="row">
						<th className=" bg-[#9BC0C2] text-white text-3xl">University Name</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">Latitude</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">Longitude</th>
					</tr>
				</thead>
				<tbody>
					{universitiesList.map((university, index) => {
						return (
							<tr className="row" key={index}>
								<td className="text-2xl bg-slate-200 py-3">
									{university.university_name}
								</td>
								<td className="text-2xl bg-slate-200 py-3">{university.lat}</td>
								<td className="text-2xl bg-slate-200 py-3">
									{university.long}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
};
export default Universities;
