import BaseMonaco, { editor } from 'monaco-editor';
import { ErrorMarker } from 'solive-compiler-utils';

export type BaseMonacoEditor = BaseMonaco.editor.IStandaloneCodeEditor;

// 组件对外暴露的model类型
export type ModelsInfoType = ModelInfoType[];

// 组件内部使用的model类型
export type ModelType = ModelInfoType & { model: editor.ITextModel };

export enum SupportLanguage {
  Solidity = 'solidity',
}

export class ModelInfoType {
  notInitial?: boolean;
  shown?: boolean;
  readOnly?: boolean;
  tested?: boolean;
  filename = '';
  value = '';
  language: SupportLanguage = SupportLanguage.Solidity;

  constructor({
    notInitial = false,
    shown = false,
    readOnly = false,
    tested = false,
    filename = '',
    value = '',
    language = SupportLanguage.Solidity,
  }: Partial<ModelInfoType> = {}) {
    this.filename = filename; // TODO: 需要根据Editor ID做一个filename的唯一性处理，防止多组件情况下重复filename对原有model覆盖问题（核心问题在于monaco只有一个实例创建）
    this.value = value;
    this.language = language;
    this.notInitial = notInitial;
    this.shown = shown;
    this.readOnly = readOnly;
    this.tested = tested;
  }
}

export type EditorApi = {
  addErrorMarker: (errors: ErrorMarker[], from?: string) => void;
  removeErrorMarker: (sources: string[], from?: string) => void;
};
