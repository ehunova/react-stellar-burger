import React, {useState} from "react";
import styles from "../registration/registration.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {Link} from "react-router-dom";

export default function ForgotPassword() {
    const [form, setFormItem] = useState({
        email: "",
    });

    const onChange = (event) => {
        setFormItem({...form, [event.target.name]: event.target.value});
        return form;
    }

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large">Восстановление пароля</h1>
            <form className={clsx(styles.form, "mt-6")}>
                <EmailInput value={form.email} name="email" placeholder={"Укажите e-mail"} onChange={onChange}/>
                <Button htmlType={"button"} size="medium">Восстановить</Button>
            </form>
            <div className={clsx(styles.linkBlock, "mt-20")}>
                <p className={"text text_type_main-default"}>Вспомнили пароль?</p>
                <Link to="/login"
                      className={clsx(styles.link, "text text_type_main-default")}>Войти</Link>
            </div>
        </section>
    )
}