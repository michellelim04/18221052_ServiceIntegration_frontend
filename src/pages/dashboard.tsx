import { FC } from "react";

import { Jomhuria } from "next/font/google";

const jomhuria = Jomhuria({ subsets: ["latin"], weight: "400" });
const Dashboard: FC = () => {
	return (
		<main
			className={
				jomhuria.className +
				" min-h-screen  flex flex-col align-middle p-10 gap-10 tracking-wide text-[#496466] text-7xl"
			}
		>
			<h1>Hello, user!</h1>
			<div className="grid grid-cols-3"></div>
		</main>
	);
};

export default Dashboard;
