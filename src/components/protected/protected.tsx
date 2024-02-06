import {Location, Navigate, useLocation} from "react-router-dom";
import {isAuthCheckedSelector, userSelector} from "../../services/actions/actionsSelector";
import {TFromLocation, TUser, useAppSelector} from "../../utils/types";

type TProtected = {
    onlyUnAuth: boolean;
    component: JSX.Element;
}

function Protected({ onlyUnAuth = false, component }: TProtected): JSX.Element | null {
    const isAuthChecked = useAppSelector(isAuthCheckedSelector);
    const user = useAppSelector(userSelector);
    const location: Location<TFromLocation> = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: "/" };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = (props: {component: JSX.Element}) => <Protected onlyUnAuth={false} {...props} />
export const OnlyUnAuth = (props: {component: JSX.Element}) => <Protected onlyUnAuth={true} {...props} />