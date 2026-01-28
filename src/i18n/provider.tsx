'use client';
import { LocaleProvider } from './context';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    return <LocaleProvider>{children}</LocaleProvider>;
}
