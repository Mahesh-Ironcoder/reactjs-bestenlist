import React, { Component } from "react";

export default class AppErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	// static getDerivedStateFromError(error) {
	// 	// Update state so the next render will show the fallback UI.
	// 	return { hasError: true, errorCode: 301, errorMessage: error };
	// }

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		console.log(error, errorInfo);
		this.setState({ hasError: true, errorCode: 301, errorMessage: error });
	}
	render() {
		console.log(this.state);
		if (this.state.hasError) {
			return (
				<div>
					<h2>Something went wrong</h2>
					<p>Error code: {this.state.errorCode} </p>
					<p> Error: {this.state.errorMessage} </p>
				</div>
			);
		}
		return <div>{this.props.children}</div>;
	}
}
