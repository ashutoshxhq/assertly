import { atom } from "jotai";

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
