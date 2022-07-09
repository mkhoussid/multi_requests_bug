import '@emotion/react';
import { ITheme } from './core/theme/ThemeProvider';

declare module '@emotion/react' {
	export interface Theme extends ITheme {}
}
