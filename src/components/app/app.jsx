import React, {useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import {useDispatch} from "react-redux";
import {fetchIngredients} from "../../services/reducers/ingredients-slice";
import {Route, Routes, useLocation} from "react-router-dom";
import NotFound404 from "../../pages/not-found404/not-found404";
import Profile from "../../pages/profile/profile";
import ProfileEdit from "../../pages/profile-edit/profile-edit";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";
import ModalIngredient from "../modal-ingredient/modal-ingredient";
import Login from "../../pages/login/login";
import Registration from "../../pages/registration/reristration";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [])

    return (
        <div className={styles.app}>
            <Routes location={background || location}>
                <Route path="/" element={<AppHeader/>}>
                    <Route index element={<Main/>}/>
                    <Route path="/ingredient/:id" element={<IngredientPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/profile" element={<Profile/>}>
                        <Route path="/profile/profile-edit" element={<ProfileEdit/>} />
                    </Route>
                    <Route path="*" element={<NotFound404/>}/>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredient/:id" element={<ModalIngredient/>}/>
                </Routes>
            )}
        </div>
    );
}

export default App;