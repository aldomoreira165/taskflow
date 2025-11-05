import { create } from "zustand/react";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authLogout } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    login: (usuario: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (usuario: string, password: string) => {
        const resp = await authLogin(usuario, password);
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return false;
        }

        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user })

        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return;
        }

        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user })
    },
    
    logout: async () => {     
        const resp = await authLogout();
        if (!resp) return;
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined  })
    }

}))