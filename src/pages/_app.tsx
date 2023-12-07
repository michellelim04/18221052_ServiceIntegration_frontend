import "root/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header />
			<ToastContainer
				autoClose={2000}
				closeOnClick
				draggable={false}
				containerId={1}
				hideProgressBar
				limit={1}
			/>
			<Component {...pageProps} />
		</>
	);
}
