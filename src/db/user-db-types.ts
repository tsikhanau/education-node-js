export type UserDBType = {
    _id: string;
    login: string;
    email: string;
    password: string;
    createdAt: string;
    confirmationCode?: string;
    confirmationCodeExpirationDate?: string;
    isConfirmed?: boolean;
}