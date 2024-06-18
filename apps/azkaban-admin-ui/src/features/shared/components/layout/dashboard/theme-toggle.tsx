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
                className="flex items-center justify-center cursor-pointer w-8 h-8 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full"
                htmlFor="light-switch"
            >
                <ThemeToggleIcon theme={theme} />
                <span className="sr-only">Switch to light / dark version</span>
            </label>
        </div>
    );
}
