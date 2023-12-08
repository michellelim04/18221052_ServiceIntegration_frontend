import { FC, MouseEvent, useState } from "react";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const DriversCreate: FC = () => {
	const router = useRouter();
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [licenseNumber, setLicenseNumber] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const driver_id = parseInt(id) as number;
		if (Number.isNaN(driver_id)) {
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
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/driver/" +
				driver_id,
			{
				method: "PUT",
				body: JSON.stringify({
					name,
					date_of_birth: dateOfBirth,
					contact_no: contactNumber,
					email,
					address,
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
		toast.success("Successfully saved new driver");
		router.push("/drivers");
		return;
	};
	const getCurrent = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const driver_id = parseInt(id) as number;
		if (Number.isNaN(driver_id)) {
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
		const fetchCurrent = await fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/driver/" +
				driver_id,
			{
				headers: {
					Authorization: tokenJoin,
				},
			}
		)
			.then((response) => response)
			.catch((err) => err);
		if (fetchCurrent instanceof Error) {
			toast.error("Something went wrong...");
			return;
		}
		if (fetchCurrent.status !== 200) {
			toast.error("Unable to fetch current data");
			return;
		}
		const responsejson = await fetchCurrent.json();
		setName(responsejson.name);
		setLicenseNumber(responsejson.license_no);
		setDateOfBirth(responsejson.date_of_birth);
		setContactNumber(responsejson.contact_no);
		setEmail(responsejson.email);
		setAddress(responsejson.address);
		toast.success("Fetched current data");
		return;
	};
	return (
		<main
			className={
				" bg-white min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-widest"
			}
		>
			<h1 className="text-5xl text-[#496466]">Update Driver</h1>
			<form className="w-full space-y-5">
				<div className="flex flex-row align-middle justify-between gap-5">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Driver ID
					</label>
					<input
						type="number"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={id}
						onChange={(e) => setId(e.target.value)}
					/>
					<button
						className="bg-slate-500 rounded-xl p-5 text-white font-bold"
						onClick={(e) => getCurrent(e)}
					>
						Fetch
					</button>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Driver Name
					</label>
					<input
						type="text"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						License Number
					</label>
					<input
						type="text"
						required
						disabled
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={licenseNumber}
						onChange={(e) => setLicenseNumber(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Date of Birth
					</label>
					<input
						type="date"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={dateOfBirth}
						onChange={(e) => setDateOfBirth(e.target.value)}
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
						value={contactNumber}
						onChange={(e) => setContactNumber(e.target.value)}
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
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min text-[#496466]">Address</label>
					<textarea
						className="w-full bg-[#C7DADB] rounded-lg p-3"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
			</form>
			<div className="flex flex-row align-middle justify-between">
				<Link
					href={"/drivers"}
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
