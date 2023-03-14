declare namespace User {
    interface IUser {
        _id?: string;
        email?: string;
        name?: string;
        password?: string;
        expenses?: string[];
        balance?: number;
        disciplineLevel?: number;
        isVerified?: boolean;
        additional?: number;
    }
    interface IGetUserResponse {
        message: string;
        user: IUser;
    }
    interface IUpdateUserResponse {
        message: string;
    }
    interface IChangePasswordBody {
        userId: string;
        password: string;
    }
}