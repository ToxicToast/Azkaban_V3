import { useTheme } from '../../../hooks';
import { useCallback } from 'react';
import { ThemeToggleIcon } from './themetoggle/icon';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const switchTheme = useCallback(() => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
	}, [theme, setTheme]);

	return (
		<div>
			<input
				type="checkbox"
				name="light-switch"
				id="light-switch"
				className="light-switch sr-only"
				checked={theme === 'light'}
				onChange={() => switchTheme()}
			/>
			<label
				className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80"
				htmlFor="light-switch"
			>
				<ThemeToggleIcon theme={theme} />
				<span className="sr-only">Switch to light / dark version</span>
			</label>
		</div>
	);
}
