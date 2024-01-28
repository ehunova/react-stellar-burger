import React, {useState} from "react";
import styles from "../registration/registration.module.css";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {Link} from "react-router-dom";

export default function ResetPassword() {
    const [form, setFormItem] = useState({
        password: "",
        code: "",
    });

    const onChange = (event) => {
        setFormItem({...form, [event.target.name]: event.target.value});
        return form;
    }

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large">Восстановление пароля</h1>
            <form className={clsx(styles.form, "mt-6")}>
                <PasswordInput value={form.password} name="password" placeholder={"Введите новый пароль"} onChange={onChange}/>
                <Input value={form.code} onChange={onChange} name="name" placeholder={"Введите код из письма"}/>
                <Button htmlType={"button"} size="medium">Сохранить</Button>
            </form>
            <div className={clsx(styles.linkBlock, "mt-20")}>
                <p className={"text text_type_main-default"}>Вспомнили пароль?</p>
                <Link to="/login"
                      className={clsx(styles.link, "text text_type_main-default")}>Войти</Link>
            </div>
        </section>
    )
}