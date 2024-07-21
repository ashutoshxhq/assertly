import { atomWithQuery } from "jotai-tanstack-query";
import { accessTokenAtom, teamIdAtom, userIdAtom } from "../auth/auth";
import { IDENTIY_SERVICE_URL } from "src/config/constants";
import axios from "axios";
import { atom } from "jotai";

export const currentUserAtom = atomWithQuery((get) => {
    const teamId = get(teamIdAtom);
    const userId = get(userIdAtom);
    const accessToken = get(accessTokenAtom);
    return {
        queryKey: [teamId, "users", userId],
        queryFn: async () => {
            if (!teamId || !userId || !accessToken) {
                return null;
            }
            const res = await axios.get(
                `${IDENTIY_SERVICE_URL}/teams/${teamId}/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );
            return res.data.data;
        },
    };
});
export const currentUserNameAtom = atom((get) => ({
    firstname: get(currentUserAtom).data?.firstname,
    lastname: get(currentUserAtom).data?.lastname,
}));
