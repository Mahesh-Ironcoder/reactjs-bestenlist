import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/Auth0ProviderWithHistory";
import AppErrorBoundary from "./AppErrorBoundary";

ReactDOM.render(
	<AppErrorBoundary>
		<BrowserRouter>
			<Auth0ProviderWithHistory>
				<App />
			</Auth0ProviderWithHistory>
		</BrowserRouter>
	</AppErrorBoundary>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
