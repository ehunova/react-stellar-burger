import React, {FormEvent} from "react";
import styles from "../registration/registration.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {Link, Location, Navigate, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchResetPass} from "../../services/reducers/auth-slice";
import {TFromLocation, TResetPass} from "../../utils/types";
import {useForm} from "../../hooks/use-form";

export default function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location: Location<TFromLocation> = useLocation();

    const {form, onChange} = useForm<TResetPass>({
        password: "",
        code: "",
    });

    if (!location.state || location.state.from !== "/forgot-password") {
        return <Navigate to={'/'}/>
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(fetchResetPass(form));
        navigate('/login');
    }

    return (
        <section className={styles.container}>
            <h1 className="text text_type_main-large">Восстановление пароля</h1>
            <form className={clsx(styles.form, "mt-6")} onSubmit={onSubmit}>
                <PasswordInput value={form.password} name="password" placeholder={"Введите новый пароль"}
                               onChange={onChange}/>
                <Input value={form.code} onChange={onChange} name="code" placeholder={"Введите код из письма"}/>
                <Button htmlType={"submit"} size="medium">Сохранить</Button>
            </form>
            <div className={clsx(styles.linkBlock, "mt-20")}>
                <p className={"text text_type_main-default"}>Вспомнили пароль?</p>
                <Link to="/login"
                      className={clsx(styles.link, "text text_type_main-default")}>Войти</Link>
            </div>
        </section>
    )
}