import { Nullable } from '@toxictoast/azkaban-base-types';
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useAuthState } from '../store/auth/auth.hook';

type User = {
    id: string;
    username: string;
    email: string;
    groups: Array<string>;
    isActive: boolean;
    isBanned: boolean;
    activation_token: Nullable<string>;
};

type SessionProviderProps = {
    token: Nullable<string>;
    user: Nullable<User>;
    exp: number;
};

type SessionProviderState = {
    token: Nullable<string>;
    user: Nullable<User>;
    exp: number;
};

const initialState: SessionProviderState = {
    token: null,
    user: null,
    exp: 0,
};

export const SessionProviderContext =
    createContext<SessionProviderState>(initialState);

export function SessionProvider(
    props: PropsWithChildren<SessionProviderProps>,
) {
    const { authenticateUser } = useAuthState();
    const [user, setUser] = useState<Nullable<User>>(null);
    const [token, setToken] = useState<Nullable<string>>(null);
    const [exp, setExp] = useState<number>(0);

    const value = {
        token,
        user,
        exp,
    };

    const isTokenExpired = useCallback(() => {
        const timeNow = Math.ceil(Date.now() / 1000);
        return timeNow >= exp;
    }, [exp]);

    useEffect(() => {
        setToken(props.token);
        setUser(props.user);
        setExp(props.exp);
    }, [props.token, props.user, props.exp]);

    useEffect(() => {
        if (token && user) {
            if (!isTokenExpired()) {
                authenticateUser({
                    user,
                    token,
                    exp: exp ?? 0,
                });
            }
        }
    }, [authenticateUser, exp, isTokenExpired, token, user]);

    return (
        <SessionProviderContext.Provider value={value}>
            {props.children}
        </SessionProviderContext.Provider>
    );
}
