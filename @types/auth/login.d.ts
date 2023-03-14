declare namespace Login {
    interface LoginInfo {
      email: string;
      password: string;
    }
    interface LoginResponse {
        message: string;
        access: string;
        refresh: string;
    }
}
  