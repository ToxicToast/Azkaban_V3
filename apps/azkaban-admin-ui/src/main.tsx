import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './features/shared/store/store';
import { SessionProvider, ThemeProvider } from './features/shared';
import {
    ToastProvider,
    ToastViewport,
} from './features/shared/components/ui/toast';

const sessionToken = sessionStorage.getItem('token') ?? null;
const sessionUserTmp = sessionStorage.getItem('user') ?? null;
const sessionExpTmp = sessionStorage.getItem('exp') ?? null;
const sessionUser = sessionUserTmp ? JSON.parse(sessionUserTmp) : null;
const sessionExp = sessionExpTmp ? Number(sessionExpTmp) : 0;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <StrictMode>
        <Provider store={store}>
            <SessionProvider
                token={sessionToken}
                user={sessionUser}
                exp={sessionExp}
            >
                <ThemeProvider
                    defaultTheme="light"
                    storageKey="azkaban-ui-theme"
                >
                    <ToastProvider duration={3000}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <App />
                            <ToastViewport />
                        </Suspense>
                    </ToastProvider>
                </ThemeProvider>
            </SessionProvider>
        </Provider>
    </StrictMode>,
);
