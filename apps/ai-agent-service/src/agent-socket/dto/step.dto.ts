export type StepType =
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

export interface BaseStep {
    type: StepType;
    props: Record<string, any>;
}

export interface JavaScriptStep extends BaseStep {
    type: 'javascript';
    props: {
        script: string;
    };
}

export interface VisualAssertStep extends BaseStep {
    type: 'visual-assert';
}

export interface GotoStep extends BaseStep {
    type: 'goto';
    props: {
        url: string;
    };
}

export interface ClickStep extends BaseStep {
    type: 'click';
    props: {
        selector: string;
    };
}

export interface TypeStep extends BaseStep {
    type: 'type';
    props: {
        selector: string;
        text: string;
    };
}

export interface PressStep extends BaseStep {
    type: 'press';
    props: {
        selector: string;
        key: string;
    };
}

export interface HoverStep extends BaseStep {
    type: 'hover';
    props: {
        selector: string;
    };
}

export interface ScrollStep extends BaseStep {
    type: 'scroll';
    props: {
        selector: string;
    };
}

export interface SelectStep extends BaseStep {
    type: 'select';
    props: {
        selector: string;
        value:
            | string
            | string[]
            | { value: string }
            | { value: string }[]
            | null;
    };
}

export interface WaitStep extends BaseStep {
    type: 'wait';
    props: {
        selector?: string;
        timeout?: number;
    };
}

export interface LocalStorageStep extends BaseStep {
    type: 'localstorage';
    props: {
        operation: 'set' | 'get';
        key: string;
        value?: string;
    };
}

export interface FileUploadStep extends BaseStep {
    type: 'file-upload';
    props: {
        selector: string;
        files: string | string[];
    };
}

export type Step =
    | JavaScriptStep
    | VisualAssertStep
    | GotoStep
    | ClickStep
    | TypeStep
    | PressStep
    | HoverStep
    | ScrollStep
    | SelectStep
    | WaitStep
    | LocalStorageStep
    | FileUploadStep;
