import { FC, MouseEvent, useState } from "react";
import { Jomhuria } from "next/font/google";
import Link from "next/link";
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const DriversDelete: FC = () => {
    const router = useRouter()
    const [id, setId] = useState("");
	const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
		if (token === null) {
			toast.error("Not Authenticated");
			window.location.replace("/login");
			return;
		}
		const tokenSplit = token.split("");
		tokenSplit[0] = "B";
		const tokenJoin = tokenSplit.join("");

        const deleteRequest = await fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/driver/"+id,
			{
				method: "DELETE",
				headers: {
					Authorization: tokenJoin,
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response)
			.catch((err) => err);
		if (deleteRequest instanceof Error) {
			toast.error("Something went wrong....");
			return;
		}
		if (deleteRequest.status !== 200) {
			toast.error("Failed to delete...");
			return;
		}
		toast.success("Successfully deleted driver");
		router.push("/drivers");
		return;
	};
	return (
		<main
			className={
				" bg-white min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-widest"
			}
		>
			<h1 className="text-5xl text-[#496466]">Delete a Driver</h1>
			<form className="w-full space-y-5">
				<div className="flex flex-row align-middle justify-between">
					<label className="w-52 text-xl h-min my-auto text-[#496466]">
						Driver ID
					</label>
					<input
						type="number"
						required
						className="w-full bg-[#C7DADB] rounded-lg p-3"
                        value = {id}
                        onChange={(e) => setId(e.target.value)}
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
				<button className="bg-[#D4EEF0] rounded-xl shadow-xl px-5 py-3 w-56 text-center font-bold"
                        onClick={(e) => {
                            handleDelete(e);
                        }}
                >
					Delete
				</button>
			</div>
		</main>
	);
};
export default DriversDelete;
