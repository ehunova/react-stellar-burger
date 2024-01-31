import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {isAuthCheckedSelector, userSelector} from "../../services/actions/actionsSelector";

function Protected({ onlyUnAuth = false, component }) {
    const isAuthChecked = useSelector(isAuthCheckedSelector);
    const user = useSelector(userSelector);
    const location = useLocation();

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = (props) => <Protected onlyUnAuth={false} {...props} />
export const OnlyUnAuth = (props) => <Protected onlyUnAuth={true} {...props} />