// src/store/authStore.ts
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';

export const persistKey = 'persist-auth';

export type User = {
  uuid: string;
  name: string;
  login: string;
  email: string;
  avatar: string;
  cpf: string;
  position: string;
  phone: string;
  cellphone: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoadingUserData: boolean;
  accessToken: string;
  notificationsCount: number;
  user: User;
};

export type AuthPartialState = Partial<
  Omit<AuthState, 'user'> & { user?: Partial<User> }
>;

type AuthActions = {
  update: (values: AuthPartialState) => void;
  reset: () => void;
};

const initialState: AuthState = {
  isAuthenticated: false,
  isLoadingUserData: false,
  accessToken: '',
  notificationsCount: 0,
  user: {
    uuid: '',
    name: '',
    login: '',
    email: '',
    avatar: '',
    cpf: '',
    position: '',
    phone: '',
    cellphone: '',
  },
};

export const useAuthStore = create<AuthPartialState & AuthActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      update: (values: AuthPartialState) =>
        set((state) => {
          const newState = { ...values };

          Object.keys(values).forEach((key) => {
            const stateKey = key as keyof AuthState;
            if (
              typeof state[stateKey] === 'object' &&
              state[stateKey] !== null
            ) {
              newState[stateKey] = {
                ...(state[stateKey] as object),
                ...(values[stateKey] as object),
              } as any;
            }
          });

          return newState;
        }),
      reset: () => set(initialState),
    }),
    {
      name: persistKey,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
