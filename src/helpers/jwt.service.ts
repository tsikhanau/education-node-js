import jwt, {JwtPayload} from 'jsonwebtoken';
import {SETTINGS} from "../settings";
export const jwtService = {
    async createToken(userId: string): Promise<string> {
        return jwt.sign({userId}, SETTINGS.ADMIN_AUTH)
    },

    async verifyToken(token: string): Promise<any> {
        try {
            return jwt.verify(token, SETTINGS.ADMIN_AUTH);
        } catch (e) {
            return null
        }
    }
}