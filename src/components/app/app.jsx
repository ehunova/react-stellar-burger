import React, {useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import {useDispatch} from "react-redux";
import {fetchIngredients} from "../../services/reducers/ingredients-slice";
import {Route, Routes} from "react-router-dom";
import NotFound404 from "../../pages/not-found404/not-found404";
import Profile from "../../pages/profile/profile";
import ProfileEdit from "../../pages/profile-edit/profile-edit";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [])

    return (
        <div className={styles.app}>
            <Routes>
                <Route path="/" element={<AppHeader/>}>
                    <Route index element={<Main/>}/>
                    <Route path="/profile" element={<Profile/>}>
                        <Route path="/profile/profile-edit" element={<ProfileEdit/>} />
                    </Route>
                    <Route path="*" element={<NotFound404/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;