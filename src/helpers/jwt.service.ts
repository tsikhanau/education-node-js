import jwt, {JwtPayload} from 'jsonwebtoken';
import {SETTINGS} from "../settings";
export const jwtService = {
    async createToken(userId: string): Promise<string> {
        return jwt.sign({userId}, SETTINGS.ADMIN_AUTH, {expiresIn: 10000})
    },
    async decodeToken(token: string): Promise<JwtPayload | string | null> {
        return jwt.decode(token);

    },
    async verifyToken(token: string): Promise<any> {
        try {
            return jwt.verify(token, SETTINGS.ADMIN_AUTH);
        } catch (e) {
            return null
        }
    }
}