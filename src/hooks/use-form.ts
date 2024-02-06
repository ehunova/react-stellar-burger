import {ChangeEvent, useState} from "react";

type TUseForm<TForm> = {
    form: TForm;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    reset: () => void;
}

export function useForm<TForm>(inputValues: TForm): TUseForm<TForm> {
    const [form, setValues] = useState<TForm>(inputValues);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...form, [name]: value});
    };

    const reset = () => setValues(inputValues);

    return {form, onChange, reset};
}