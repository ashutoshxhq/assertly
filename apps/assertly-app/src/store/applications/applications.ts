import axios from "axios";
import { atom } from "jotai";
import { atomWithQuery, atomWithMutation } from "jotai-tanstack-query";
import { ENGINE_SERVICE_URL } from "src/config/constants";
import { teamIdAtom } from "../auth/auth";

export type Query = {
    where?: any;
    joins?: string[];
    select?: {
        only?: string[];
        except?: string[];
    };
    orderBy?: any[];
    take?: number;
    skip?: number;
};

export type Pagination = {
    take?: number;
    skip?: number;
};
export const applicationsQueryAtom = atom<Query>({});

export const applicationsPaginationAtom = atom<Pagination>({
    take: 10,
    skip: 0,
});
export const applicationsAtom = atomWithQuery((get) => {
    const teamId = get(teamIdAtom);
    return {
        queryKey: [teamId, "applications", get(applicationsPaginationAtom)],
        queryFn: async ({ queryKey: [, , pagination] }: any) => {
            let query = get(applicationsQueryAtom);
            query = {
                ...query,
                where: {
                    ...query.where,
                    teamId,
                },
                take: pagination.take,
                skip: pagination.skip,
            };
            const res = await axios.get(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/applications?query=${JSON.stringify(query)}`,
            );
            return res.data;
        },
    };
});

export const selectedApplicationIdAtom = atom<string>("");
export const selectedApplicationAtom = atomWithQuery((get) => {
    const teamId = get(teamIdAtom);
    const selectedApplicationId = get(selectedApplicationIdAtom);
    return {
        queryKey: [teamId, "applications", selectedApplicationId],
        queryFn: async () => {
            if (!selectedApplicationId) {
                return null;
            }
            const res = await axios.get(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/applications/${selectedApplicationId}`,
            );
            return res.data;
        },
    };
});

export const createApplicationAtom = atomWithMutation((get) => {
    const teamId = get(teamIdAtom);

    return {
        mutationKey: [teamId, "applications"],
        mutationFn: async (data: any) => {
            const res = await axios.post(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/applications`,
                data,
            );
            return res.data;
        },
        onSuccess: () => {
            get(applicationsAtom).refetch();
        },
    };
});

export const deleteApplicationAtom = atomWithMutation((get) => {
    const teamId = get(teamIdAtom);

    return {
        mutationKey: [teamId, "applications"],
        mutationFn: async ({ id, where }: any) => {
            const res = await axios.delete(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/applications/${id}`,
                { data: { where } },
            );
            return res.data;
        },
        onSuccess: () => {
            get(applicationsAtom).refetch();
        },
    };
});
