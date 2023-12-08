import { FC, MouseEvent, useState } from "react";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const DriversCreate: FC = () => {
	const handleSave = (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<main
			className={
				" bg-white min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-widest"
			}
		>
			<h1 className="text-5xl text-[#496466]">Create New Driver</h1>
			<form className="w-full space-y-5">
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Driver ID
					</label>
					<input
						type="number"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Driver Name
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						License Number
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Data of Birth
					</label>
					<input
						type="date"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Contact Number
					</label>
					<input
						type="tel"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Email
					</label>
					<input
						type="email"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min text-[#496466]">Address</label>
					<textarea className="w-full bg-[#C7DADB] rounded-lg p-3"></textarea>
				</div>
			</form>
			<div className="flex flex-row align-middle justify-between">
				<Link
					href={"/drivers"}
					className="bg-[#D4EEF0] rounded-xl shadow-xl px-5 py-3 w-56 text-center font-bold"
				>
					Cancel
				</Link>
				<button className="bg-[#D4EEF0] rounded-xl shadow-xl px-5 py-3 w-56 text-center font-bold">
					Save
				</button>
			</div>
		</main>
	);
};
export default DriversCreate;
