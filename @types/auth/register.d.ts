declare namespace Register {
    interface RegisterInfo {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    interface RegisterResponse<T> {
        message: string;
        user: T;
    }
}
  