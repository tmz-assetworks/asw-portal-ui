import { Injectable } from '@angular/core';

export type FormMode = 'create' | 'edit' | 'view';

export interface FormModeConfig<T = any> {
  saveBtnKey?: string;        // default 'saveBtn'
  dataKey?: string;           // default 'adminData'
  defaultTitle?: string;      // default 'Add Record'
  parseData?: (raw: string) => T;
}

export interface FormModeResult<T = any> {
  mode: FormMode;
  title: string;
  data: T | null;
  saveBtn: boolean;
}

@Injectable({ providedIn: 'root' })
export class FormModeHelperService {
  /**
   * Determines the form mode (create/edit/view) based on sessionStorage values.
   */
  getFormMode<T = any>(config?: FormModeConfig<T>): FormModeResult<T> {
    const saveBtnKey = config?.saveBtnKey || 'saveBtn';
    const dataKey = config?.dataKey || 'adminData';

    const rawSaveBtn = sessionStorage.getItem(saveBtnKey);
    const rawData = sessionStorage.getItem(dataKey);

    const saveBtn = rawSaveBtn ? JSON.parse(rawSaveBtn) : true;
    const data: T | null = rawData
      ? config?.parseData
        ? config.parseData(rawData)
        : JSON.parse(rawData)
      : null;

    let mode: FormMode = 'create';
    let title = config?.defaultTitle || 'Add Record';

    if (data && saveBtn) {
      mode = 'edit';
      title = 'Edit Record';
    } else if (data && !saveBtn) {
      mode = 'view';
      title = 'View Record';
    }

    return { mode, title, data, saveBtn };
  }
}
