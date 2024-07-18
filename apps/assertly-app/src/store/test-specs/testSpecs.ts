import axios from "axios";
import { atom } from "jotai";
import { atomWithInfiniteQuery, atomWithMutation } from "jotai-tanstack-query";
import { ENGINE_SERVICE_URL } from "src/config/constants";
import { teamIdAtom } from "../auth/auth";

export type TestSpecPlannerMessage = {
    id: number;
    role: "user" | "ai";
    content: string;
    steps?: Record<string, any>[];
};

export interface TestStep {
    id: string;
    index: number;
    type: string;
    props: Record<string, any>;
}

export const testSpecStepsAtom = atom<TestStep[]>([
    { id: "1", index: 0, type: "", props: {} },
]);
export const testSpecLastExecutedStepIndexAtom = atom<number>(-1);

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
    page?: number;
    pageSize?: number;
};
export const testSpecsQueryAtom = atom<TestSpecQuery>({});
export const testSpecAtom = atomWithInfiniteQuery((get) => ({
    queryKey: ["test-specs"],
    queryFn: async ({ pageParam }) => {
        const teamId = get(teamIdAtom);
        let query = get(testSpecsQueryAtom);
        query = {
            ...query,
            where: {
                ...query.where,
                teamId,
            },
            pageSize: 10,
            page: pageParam as number,
        };
        const res = await axios.get(
            `${ENGINE_SERVICE_URL}/teams/${teamId}/test-specs?query=${query}`,
        );
        return res.data;
    },
    getNextPageParam: (_lastPage, _allPages, lastPageParam: number) =>
        lastPageParam + 1,
    initialPageParam: 1,
}));
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
    };
});
