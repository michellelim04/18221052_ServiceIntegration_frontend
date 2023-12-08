import { FC, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";
import { BsTrash3 } from "react-icons/bs";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });

interface Restaurant {
	restaurant_id: number;
	restaurant_name: string;
	university_name: string;
	lat:number;
	long: number;
	detail_location: string;
	distance_m: number;
	rating: number;
}
const Restaurants: FC = () => {
	const [restaurantsList, setRestaurants] = useState<Restaurant[]>([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token === null) {
			window.location.replace("/login");
			return;
		}
		fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/schedule/listresto",
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
				setRestaurants(responsejson);
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
				<span className="text-7xl text-[#496466] w-fit">Restaurants Data</span>
			</div>
			<table className="border-seperate border-spacing-9 text-center">
				<thead>
					<tr className="row">
						<th className=" bg-[#9BC0C2] text-white text-3xl">ID</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">Restaurants Name</th>
						<th className="bg-[#9BC0C2] text-white text-3xl">Closest University</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Distance (m)</th>
						<th className=" bg-[#9BC0C2] text-white text-3xl">Detail Location</th>
					</tr>
				</thead>
				<tbody>
					{restaurantsList.map((restaurant, index) => {
						return (
							<tr className="row" key={restaurant.restaurant_id}>
								<td className="text-2xl bg-slate-200 py-3">
									{restaurant.restaurant_id}
								</td>
								<td className="text-2xl bg-slate-200 py-3">{restaurant.restaurant_name}</td>
								<td className="text-2xl bg-slate-200 py-3">
									{restaurant.university_name}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{restaurant.distance_m}
								</td>
								<td className="text-2xl bg-slate-200 py-3">
									{restaurant.detail_location}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</main>
	);
};
export default Restaurants;
