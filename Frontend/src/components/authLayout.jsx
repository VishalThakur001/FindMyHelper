import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.user.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            navigate("/login");
        } else if (!authentication && authStatus) {
            navigate("/home");
        }
        setLoading(false);
    }, [authStatus, navigate, authentication]);

    return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;