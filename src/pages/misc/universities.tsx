import { FC } from "react";
import { Jomhuria } from "next/font/google";
const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const Universities: FC = () => {
	return (
		<main
			className={
				jomhuria.className +
				" bg-white min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-widest"
			}
		>
			<h1 className="text-7xl text-[#496466]">Universities Data</h1>
		</main>
	);
};
export default Universities;
