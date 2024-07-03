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
  type: ActionType;
  props: Record<string, any>;
}

export interface JavaScriptAction extends BaseAction {
  type: 'javascript';
  props: {
    script: string;
  };
}

export interface VisualAssertAction extends BaseAction {
  type: 'visual-assert';
}

export interface GotoAction extends BaseAction {
  type: 'goto';
  props: {
    url: string;
  };
}

export interface ClickAction extends BaseAction {
  type: 'click';
  props: {
    selector: string;
  };
}

export interface TypeAction extends BaseAction {
  type: 'type';
  props: {
    selector: string;
    text: string;
  };
}

export interface PressAction extends BaseAction {
  type: 'press';
  props: {
    selector: string;
    key: string;
  };
}

export interface HoverAction extends BaseAction {
  type: 'hover';
  props: {
    selector: string;
  };
}

export interface ScrollAction extends BaseAction {
  type: 'scroll';
  props: {
    selector: string;
  };
}

export interface SelectAction extends BaseAction {
  type: 'select';
  props: {
    selector: string;
    value: string | string[] | { value: string } | { value: string }[] | null;
  };
}

export interface WaitAction extends BaseAction {
  type: 'wait';
  props: {
    selector?: string;
    timeout?: number;
  };
}

export interface LocalStorageAction extends BaseAction {
  type: 'localstorage';
  props: {
    operation: 'set' | 'get';
    key: string;
    value?: string;
  };
}

export interface FileUploadAction extends BaseAction {
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