export type InputUserType = {
    login: string;
    password: string;
    email: string;
}

export type UserType = {
    id: string;
    login: string;
    email: string;
    createdAt: string;
}

export type InsertUserType = {
    login: string;
    password: string;
    email: string;
    createdAt: string;
    confirmationCode?: string;
    confirmationCodeExpirationDate?: string;
    isConfirmed?: boolean;
}

export type AuthInput = {
    loginOrEmail: string,
    password: string
}