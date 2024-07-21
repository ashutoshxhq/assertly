import axios from "axios";
import { atom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import { atomWithStorage } from "jotai/utils";
import * as changeCase from "change-case/keys";
import { IDENTIY_SERVICE_URL } from "src/config/constants";

export interface AuthState {
    isAuthenticated: boolean;
    userId: string;
    teamId: string;
    accessToken: string;
    refreshToken: string;
}
export const authAtom = atomWithStorage<AuthState | null>("auth_state", null);
export const refreshTokenAtom = atom((get) => get(authAtom)?.refreshToken);
export const accessTokenAtom = atom((get) => get(authAtom)?.accessToken);
export const userIdAtom = atom((get) => get(authAtom)?.userId);
export const teamIdAtom = atom((get) => get(authAtom)?.teamId);

export const refreshTokenMutationAtom = atomWithMutation(() => {
    return {
        mutationFn: ({ refreshToken }: { refreshToken: string }) => {
            return axios.post(
                IDENTIY_SERVICE_URL + "/authn/token",
                changeCase.snakeCase({
                    refreshToken,
                }),
            );
        },
    };
});

export const loginMutationAtom = atomWithMutation(() => {
    return {
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            return axios.post(
                IDENTIY_SERVICE_URL + "/authn/login",
                changeCase.snakeCase({
                    identifier: email,
                    password,
                }),
            );
        },
    };
});

export const registerMutationAtom = atomWithMutation(() => {
    return {
        mutationFn: ({
            firstname,
            lastname,
            email,
            password,
        }: {
            firstname: string;
            lastname: string;
            email: string;
            password: string;
        }) => {
            return axios.post(
                IDENTIY_SERVICE_URL + "/authn/register",
                changeCase.snakeCase({
                    firstname,
                    lastname,
                    email,
                    password,
                }),
            );
        },
    };
});
