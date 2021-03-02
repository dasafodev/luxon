import React from "react";
import NavBar from "@components/navbar";
import style from "./login_layout.module.css";
import Button from "@components/button"
import Link from "next/link";


const LoginLayout = ({children}) => {
  return (
    <React.Fragment>
      <NavBar />
      <section className={style.container}>
        <div className={style.form_container}>
          {children}
        </div>
      </section>
    </React.Fragment>
  );
};

export default LoginLayout;
