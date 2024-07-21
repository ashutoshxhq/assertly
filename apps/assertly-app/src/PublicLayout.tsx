import { useAtom } from "jotai";
import { Outlet, useNavigate } from "react-router-dom";
import { authAtom } from "./store/auth/auth";
import { useEffect } from "react";

const PublicLayout = () => {
    const navigate = useNavigate();
    const [authState] = useAtom(authAtom);

    useEffect(() => {
        if (authState?.isAuthenticated) {
            navigate("/");
        }
    }, [authState]);

    return <Outlet />;
};

export default PublicLayout;
