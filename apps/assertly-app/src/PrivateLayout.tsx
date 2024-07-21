import { Outlet, useNavigate } from "react-router-dom";
import { cn } from "./lib/utils";
import { useAtom } from "jotai";
import { isDarkMode } from "./store/app/app";
import { useEffect } from "react";
import {
    authAtom,
    refreshTokenAtom,
    refreshTokenMutationAtom,
} from "./store/auth/auth";
import { toast } from "sonner";
import * as changeCase from "change-case/keys";
import Loader from "./components/molecules/Loader";
import { currentUserAtom } from "./store/users/users";

function PrivateLayout() {
    const [darkMode] = useAtom(isDarkMode);
    const [{ mutate, isPending }] = useAtom(refreshTokenMutationAtom);
    const [{ status }] = useAtom(currentUserAtom);
    const navigate = useNavigate();
    const [refreshToken] = useAtom(refreshTokenAtom);
    const [authState, setAuthState] = useAtom(authAtom);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        if (refreshToken) {
            mutate(
                { refreshToken: refreshToken },
                {
                    onSuccess: (data: any) => {
                        const res: any = changeCase.camelCase(data.data);
                        setAuthState((prev) => {
                            if (!prev) {
                                return prev;
                            }
                            return {
                                ...prev,
                                accessToken: res.accessToken,
                            };
                        });
                    },
                    onError: (error: any) => {
                        // ignore client side errors but clear auth state on server side errors
                        if (error?.code === "ERR_NETWORK") {
                            toast("please check connection and try again");
                        } else {
                            toast("Invalid auth state");
                            setAuthState(null);
                            navigate("/auth/login");
                        }
                        console.log(error);
                    },
                },
            );
        } else {
            if (
                !localStorage.getItem("auth_state") ||
                localStorage.getItem("auth_state") === "null"
            ) {
                navigate("/auth/login");
            }
        }
    }, [refreshToken]);

    if (
        !authState ||
        isPending ||
        !authState.isAuthenticated ||
        status === "pending"
    ) {
        return <Loader />;
    }
    return (
        authState.isAuthenticated && (
            <div className={cn(darkMode && "dark")}>
                <div className="flex flex-col h-[100vh] bg-zinc-200 dark:bg-zinc-900">
                    <Outlet />
                </div>
            </div>
        )
    );
}

export default PrivateLayout;
