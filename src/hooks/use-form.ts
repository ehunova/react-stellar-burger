import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";

type TUseForm = {
    values: {};
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    setValues:  Dispatch<SetStateAction<{}>>;
}

export function useForm(inputValues={}): TUseForm {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}