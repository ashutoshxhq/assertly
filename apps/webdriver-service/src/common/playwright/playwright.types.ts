export type ActionType =
    | 'javascript'
    | 'visual-assert'
    | 'goto'
    | 'click'
    | 'type'
    | 'press'
    | 'hover'
    | 'scroll'
    | 'select'
    | 'wait'
    | 'localstorage'
    | 'file-upload';

export interface BaseAction {
    id: string;
    type: ActionType;
    props: Record<string, any>;
}

export interface JavaScriptAction extends BaseAction {
    id: string;
    type: 'javascript';
    props: {
        script: string;
    };
}

export interface VisualAssertAction extends BaseAction {
    id: string;
    type: 'visual-assert';
}

export interface GotoAction extends BaseAction {
    id: string;
    type: 'goto';
    props: {
        url: string;
    };
}

export interface ClickAction extends BaseAction {
    id: string;
    type: 'click';
    props: {
        selector?: string;
        selectorQuery?: string;
    };
}

export interface TypeAction extends BaseAction {
    id: string;
    type: 'type';
    props: {
        selector?: string;
        selectorQuery?: string;
        text: string;
    };
}

export interface PressAction extends BaseAction {
    id: string;
    type: 'press';
    props: {
        selector?: string;
        selectorQuery?: string;
        key: string;
    };
}

export interface HoverAction extends BaseAction {
    id: string;
    type: 'hover';
    props: {
        selector?: string;
        selectorQuery?: string;
    };
}

export interface ScrollAction extends BaseAction {
    id: string;
    type: 'scroll';
    props: {
        selector?: string;
        selectorQuery?: string;
    };
}

export interface SelectAction extends BaseAction {
    id: string;
    type: 'select';
    props: {
        selector?: string;
        selectorQuery?: string;
        value:
            | string
            | string[]
            | { value: string }
            | { value: string }[]
            | null;
    };
}

export interface WaitAction extends BaseAction {
    id: string;
    type: 'wait';
    props: {
        selector?: string;
        selectorQuery?: string;
        timeout?: number;
    };
}

export interface LocalStorageAction extends BaseAction {
    id: string;
    type: 'localstorage';
    props: {
        operation: 'set' | 'get';
        key: string;
        value?: string;
    };
}

export interface FileUploadAction extends BaseAction {
    id: string;
    type: 'file-upload';
    props: {
        selector: string;
        files: string | string[];
    };
}

export type Action =
    | JavaScriptAction
    | VisualAssertAction
    | GotoAction
    | ClickAction
    | TypeAction
    | PressAction
    | HoverAction
    | ScrollAction
    | SelectAction
    | WaitAction
    | LocalStorageAction
    | FileUploadAction;
