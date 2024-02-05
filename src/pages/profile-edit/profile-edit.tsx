import styles from "../profile-edit/profile-edit.module.css";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../services/actions/actionsSelector";
import {fetchUpdateUser} from "../../services/reducers/auth-slice";
import {TUserUpdate} from "../../utils/types";

export default function ProfileEdit() {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const [form, setFormItem] = useState<TUserUpdate>({
        name: user.name,
        email: user.email,
        password: "",
    });

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormItem({ ...form, [event.target.name]: event.target.value });
        return form;
    }

    const cancelEditForm = () => {
        setFormItem(user);
    }

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
                <Button htmlType="button" onClick={cancelEditForm} type="secondary">
                    Отмена
                </Button>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </form>
    )
}