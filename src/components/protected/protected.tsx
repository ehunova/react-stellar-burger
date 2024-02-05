import {useSelector} from "react-redux";
import {Location, Navigate, useLocation} from "react-router-dom";
import {isAuthCheckedSelector, userSelector} from "../../services/actions/actionsSelector";
import {TFromLocation, TUser} from "../../utils/types";

type TProtected = {
    onlyUnAuth: boolean;
    component: JSX.Element
}

function Protected({ onlyUnAuth = false, component }: TProtected): JSX.Element | null {
    const isAuthChecked = useSelector(isAuthCheckedSelector);
    const user: TUser = useSelector(userSelector);
    const location: Location<TFromLocation> = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from }: TFromLocation = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = (props: {component: JSX.Element}) => <Protected onlyUnAuth={false} {...props} />
export const OnlyUnAuth = (props: {component: JSX.Element}) => <Protected onlyUnAuth={true} {...props} />