import styles from "../profile-edit/profile-edit.module.css";
import React, {FormEvent} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {userSelector} from "../../services/actions/actionsSelector";
import {fetchUpdateUser} from "../../services/reducers/auth-slice";
import {TUserUpdate, useAppDispatch, useAppSelector} from "../../utils/types";
import {useForm} from "../../hooks/use-form";

export default function ProfileEdit() {
    const user = useAppSelector(userSelector);
    const dispatch = useAppDispatch();

    const {form, onChange, reset} = useForm<TUserUpdate>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: "",
    });

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(fetchUpdateUser(form));
    }

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <Input value={form.name || ""} onChange={onChange} name="name" placeholder="Имя" icon="EditIcon"/>
            <EmailInput value={form.email || ""} name="email" onChange={onChange} placeholder="Логин" isIcon={true}/>
            <PasswordInput value={form.password || ""} name="password" onChange={onChange} placeholder="Пароль" icon="EditIcon"/>
            <div>
                <Button htmlType="button" onClick={reset} type="secondary">
                    Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </form>
    )
}