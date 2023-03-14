export interface AuthState {
    isLoggedIn: boolean;
    access?: string;
    refresh?: string;
}