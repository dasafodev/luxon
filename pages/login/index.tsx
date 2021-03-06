import React, { useState } from "react";
import style from "./login.module.css";
import Button from "@components/button";
import Link from "next/link";
import LoginLayout from "@components/login_layout";
import { loginWithEmail } from "@fire-client";
import { useRouter } from "next/router";



const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onClickLogin = async() => {
    await loginWithEmail(email,password)
    router.push("/")
  }

  return (
    <LoginLayout>
      <h2 className={style.title}>Ingresa a Luxxon</h2>
      <form className={style.credentials_form}>
        <input
          className={style.input}
          placeholder="Correo electrónico"
          onChange={(event => setEmail(event.target.value))}
          type="email"
        />
        <input
          className={style.input}
          placeholder="Contraseña"
          onChange={(event => setPassword(event.target.value))}
          type="password"
        />
      </form>
      <Button onClick={onClickLogin} buttonClass="mt-3 ml-0" >
        Ingresar
      </Button>
      <p>
        ¿No tienes cuenta?{'  '}
        <Link href="/signup">
          <strong>Registrate</strong>
        </Link>
      </p>
    </LoginLayout>
  );
};

export default Login;
