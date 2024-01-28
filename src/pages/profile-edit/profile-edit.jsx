import styles from "../profile-edit/profile-edit.module.css";
import React, {useState} from "react";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ProfileEdit() {
    const [form, setFormItem] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onChange = (event) => {
        setFormItem({ ...form, [event.target.name]: event.target.value });
        return form;
    }

    const cancelEditForm = () => {

    }

    return (
        <form className={styles.container}>
            <Input value={form.name || ""} onChange={onChange} name="name" placeholder="Имя" icon="EditIcon"/>
            <EmailInput value={form.email || ""} name="email" onChange={onChange} placeholder="Логин" isIcon={true}/>
            <PasswordInput value={form.password || ""} name="password" onChange={onChange} placeholder="Пароль" icon="EditIcon"/>
            <div>
                <Button htmlType="button" onClick={cancelEditForm} type="secondary">
                    Отмена
                </Button>
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </form>
    )
}