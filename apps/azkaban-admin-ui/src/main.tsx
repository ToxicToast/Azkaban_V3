import { StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SessionProvider } from './context/session-provider';
import { ThemeProvider } from './context/theme-provider';

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
      <SessionProvider token={sessionToken} user={sessionUser} exp={sessionExp}>
        <ThemeProvider defaultTheme="light" storageKey="azkaban-ui-theme">
          <Suspense fallback={<div>Loading...</div>}>
            <App />
          </Suspense>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  </StrictMode>,
);
