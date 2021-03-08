import React from "react";
import NavBar from "@components/navbar";
import style from "./login_layout.module.css";

const LoginLayout = ({ children }) => {
	return (
		<React.Fragment>
			<NavBar />
			<section className={style.container}>
				<div className={style.form_container}>{children}</div>
			</section>
		</React.Fragment>
	);
};

export default LoginLayout;
