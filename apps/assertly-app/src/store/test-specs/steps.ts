// Steps related atoms

import { atom } from "jotai";

export type Step = {
    id: string;
    title?: string;
    type?: string;
    props?: any;
    status?: string;
    stepExecutionReason?: string;
    teamId?: string;
    createdAt?: string;
    updatedAt?: string;
};

export const testSpecStepsAtom = atom<Step[]>([]);
export const testSpecExecutedStepIdsAtom = atom<string[]>([]);
export const testSpecOpenStepIdAtom = atom<string>("");
