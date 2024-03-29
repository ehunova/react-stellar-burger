import React, {FormEvent} from "react";
import styles from "../login/login.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {fetchLogIn} from "../../services/reducers/auth-slice";
import {TUserLogIn, useAppDispatch} from "../../utils/types";
import {useForm} from "../../hooks/use-form";

export default function Login() {
    const dispatch = useAppDispatch();

    const {form, onChange} = useForm<TUserLogIn>({
        email: "",
        password: "",
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(fetchLogIn(form));
    }

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large">Вход</h1>
            <form className={clsx(styles.form, "mt-6")} onSubmit={onSubmit}>
                <EmailInput value={form.email} name="email" onChange={onChange}/>
                <PasswordInput value={form.password} name="password" onChange={onChange}/>
                <Button htmlType={"submit"} size="medium">Войти</Button>
            </form>
            <div className={clsx(styles.linkBlock, "mt-20")}>
                <p className={"text text_type_main-default"}>Вы — новый пользователь?</p>
                <Link to="/register"
                      className={clsx(styles.link, "text text_type_main-default")}>Зарегистрироваться</Link>
            </div>
            <div className={clsx(styles.linkBlock, "mt-4")}>
                <p className={"text text_type_main-default"}>Забыли пароль?</p>
                <Link to="/forgot-password" className={clsx(styles.link, "text text_type_main-default")}>Восстановить
                    пароль</Link>
            </div>
        </section>
    )
}