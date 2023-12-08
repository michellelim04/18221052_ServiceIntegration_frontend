import { FC, FormEvent, useState } from "react";
import Image from "next/image";
import { Jomhuria } from "next/font/google";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const Login: FC = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = async (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		const requestBody = new FormData();
		requestBody.append("username", username);
		requestBody.append("password", password);
		fetch(
			"http://openapi.etckakewcbdsfwhg.southeastasia.azurecontainer.io/auth/token",
			{
				method: "POST",
				body: requestBody,
			}
		)
			.then(async (response) => {
				if (response.status != 200) {
					toast.error("Failed to login..");
					return;
				}
				const responsejson = await response.json();
				const type = responsejson.token_type;
				const token = responsejson.access_token;
				window.localStorage.setItem("token", `${type} ${token}`);
				window.localStorage.setItem("username", username);
				toast.success("Logged in");
				window.location.replace("/dashboard");
			})
			.catch((e: Error) => {
				console.error(e);
				toast.error("Something went wrong..");
			});
	};
	return (
		<main
			className={
				jomhuria.className +
				" bg-[#496466] min-h-screen  flex flex-col align-middle justify-center p-10 gap-10 tracking-widest"
			}
		>
			<div className="mx-auto">
				<Image src={"/logo.png"} width={500} height={400} alt="Main Logo" />
			</div>
			<form
				className="w-[40rem] mx-auto align-middle justify-center flex flex-col gap-4"
				onSubmit={handleLogin}
			>
				<div className="flex flex-row align-middle justify-between gap-9">
					<label className="text-4xl text-white w-[8rem] h-min my-auto">
						Username
					</label>
					<input
						className="w-full rounded-lg bg-[#D4EEF0] p-2 text-3xl  "
						type="text"
						required
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="flex flex-row align-middle justify-between gap-9">
					<label className="text-4xl text-white w-[8rem] h-min my-auto">
						Password
					</label>
					<input
						className="w-full rounded-lg bg-[#D4EEF0] p-2 text-3xl  "
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<input
					type="submit"
					value={"Login"}
					className="bg-white w-[10rem] mx-auto p-1 rounded-2xl text-[#496466] text-3xl hover:bg-gray-300 hover:cursor-pointer hover:scale-[0.95] hover:shadow-none mt-10"
				/>
			</form>
		</main>
	);
};
export default Login;
