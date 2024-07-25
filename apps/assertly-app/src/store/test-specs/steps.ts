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

export type NetworkLog = {
    request: {
        url: string;
        method: string;
        headers: Record<string, string>;
        body?: string;
    };
    response?: {
        status: number;
        headers: Record<string, string>;
    };
};

export const testSpecStepsAtom = atom<Step[]>([]);
export const testSpecExecutedStepIdsAtom = atom<string[]>([]);
export const testSpecOpenStepIdAtom = atom<string>("");
export const isTestSpecRunningAtom = atom<boolean>(false);
export const currentTestSpecExecutionHtmlContentAtom = atom<string>("");
export const currentTestSpecExecutionScreenshotAtom = atom<string>("");
export const currentTestSpecExecutionLogsAtom = atom<any[]>([]);
export const currentTestSpecExecutionNetworkLogsAtom = atom<NetworkLog[]>([]);
export const currentTestSpecExecutionPageURLAtom = atom<string>("");
export const currentTestSpecPreviewMode = atom<string>("SCREENSHOT");
