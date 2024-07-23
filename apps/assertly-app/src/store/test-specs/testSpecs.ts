import axios from "axios";
import { atom } from "jotai";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { ENGINE_SERVICE_URL } from "src/config/constants";
import { teamIdAtom } from "../auth/auth";

export type TestSpecPlannerMessage = {
    id: number;
    role: "user" | "ai";
    content: string;
    steps?: Record<string, any>[];
};

export const testSpecPlannerConversationAtom = atom<TestSpecPlannerMessage[]>(
    [],
);

export type TestSpecQuery = {
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

export type TestSpecPagination = {
    take?: number;
    skip?: number;
};
export const testSpecsQueryAtom = atom<TestSpecQuery>({});

export const testSpecsPaginationAtom = atom<TestSpecPagination>({
    take: 10,
    skip: 0,
});
export const testSpecsAtom = atomWithQuery((get) => {
    const teamId = get(teamIdAtom);
    return {
        queryKey: [teamId, "test-specs", get(testSpecsPaginationAtom)],
        queryFn: async ({ queryKey: [, , pagination] }: any) => {
            let query = get(testSpecsQueryAtom);
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
                `${ENGINE_SERVICE_URL}/teams/${teamId}/test-specs?query=${JSON.stringify(query)}`,
            );
            return res.data;
        },
    };
});

export const selectedTestSpecIdAtom = atom<string>("");
export const selectedTestSpecAtom = atomWithQuery((get) => {
    const teamId = get(teamIdAtom);
    const selectedTestSpecId = get(selectedTestSpecIdAtom);
    return {
        queryKey: [teamId, "test-specs", selectedTestSpecId],
        queryFn: async () => {
            if (!selectedTestSpecId) {
                return null;
            }
            const res = await axios.get(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/test-specs/${selectedTestSpecId}`,
            );
            return res.data;
        },
    };
});

export const createTestSpecAtom = atomWithMutation((get) => {
    const teamId = get(teamIdAtom);

    return {
        mutationKey: [teamId, "test-specs"],
        mutationFn: async (data: any) => {
            const res = await axios.post(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/test-specs`,
                data,
            );
            return res.data;
        },
        onSuccess: () => {
            get(testSpecsAtom).refetch();
        },
    };
});

export const updateTestSpecMutationAtom = atomWithMutation((get) => {
    const teamId = get(teamIdAtom);
    return {
        mutationKey: [teamId, "test-specs"],
        mutationFn: async (data: any) => {
            const res = await axios.patch(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/test-specs/${data.where.id}`,
                data,
            );
            return res.data;
        },
        onSuccess: () => {
            get(testSpecsAtom).refetch();
        },
    };
});

export const deleteTestSpecAtom = atomWithMutation((get) => {
    const teamId = get(teamIdAtom);

    return {
        mutationKey: [teamId, "test-specs"],
        mutationFn: async ({ id, where }: any) => {
            const res = await axios.delete(
                `${ENGINE_SERVICE_URL}/teams/${teamId}/test-specs/${id}`,
                { data: { where } },
            );
            return res.data;
        },
        onSuccess: () => {
            get(testSpecsAtom).refetch();
        },
    };
});
