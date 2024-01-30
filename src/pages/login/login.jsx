import React, {useState} from "react";
import styles from "../login/login.module.css";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {fetchLogIn} from "../../services/reducers/auth-slice";
import {useDispatch} from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const [form, setFormItem] = useState({
        email: '',
        password: '',
    });

    const onChange = (event) => {
        setFormItem({...form, [event.target.name]: event.target.value});
        return form;
    }

    const onSubmit = (event) => {
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