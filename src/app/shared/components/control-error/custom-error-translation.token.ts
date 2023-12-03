import { InjectionToken } from '@angular/core';

export type TranslationToken = { [key: string]: string };
export const CustomErrorTranslationToken = new InjectionToken<TranslationToken>('CustomErrorTranslationToken');
