import { FC } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { SlPencil } from "react-icons/sl";
import { BsTrash3 } from "react-icons/bs";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const Drivers: FC = () => {
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
						href={"/drivers/search"}
						className="bg-[#C7DADB] rounded-full shadow-2xl p-4 h-fit"
					>
						<CiSearch size={40} />
					</Link>
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
						<th className="col border-black rounded-xl bg-[#9BC0C2] text-white text-3xl">
							ID
						</th>
						<th className="col border-black rounded-xl bg-[#9BC0C2] text-white text-3xl">
							Name
						</th>
						<th className="col rounded-xl bg-[#9BC0C2] text-white text-3xl">
							License No
						</th>
						<th className="col border-opacity-0 rounded-xl bg-[#9BC0C2] text-white text-3xl">
							Date of Birth
						</th>
						<th className="col border-opacity-0 rounded-xl bg-[#9BC0C2] text-white text-3xl">
							Contact No
						</th>
						<th className="col border-opacity-0 rounded-xl bg-[#9BC0C2] text-white text-3xl">
							Email
						</th>
						<th className="col border-opacity-0 rounded-xl bg-[#9BC0C2] text-white text-3xl">
							Address
						</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</main>
	);
};
export default Drivers;
