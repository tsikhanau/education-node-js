import {userCollection} from "../db/mongo-db";
import {InputUserType, UserType} from "../input-output-types/user_types";
import {ObjectId} from "mongodb";
import {UserDBType} from "../db/user-db-types";
import {bcryptService} from "./bcryptServeice";
import {InputRegistrationType} from "../input-output-types/auth-types";
import crypto from 'crypto';
export const userRepository = {
    async drop() {
        const res = await userCollection.drop();
    },
    async create(input: InputUserType): Promise<{error?: string, id?: ObjectId}> {
        try {
            const password = await bcryptService.generateHash(input.password);
            const insertedInfo = await userCollection.insertOne({...input, password, createdAt: new Date().toISOString()});
            return {id: new ObjectId(insertedInfo.insertedId)}
        } catch (e) {
            return {error: 'Error'}
        }
    },
    async createRegistrationData(input: InputRegistrationType): Promise<{error?: string, id?: string}>{
        try {
            const password = await bcryptService.generateHash(input.password);
            const confirmationCode = crypto.randomUUID();
            const date = new Date()
            const createdAt = date.toISOString();
            const expirationDate = date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
            const confirmationCodeExpirationDate = new Date(expirationDate).toISOString();
            const insertedInfo = await userCollection.insertOne({
                ...input,
                password,
                createdAt,
                confirmationCode,
                confirmationCodeExpirationDate,
                isConfirmed: false
            });
            return {id: insertedInfo.insertedId.toString()}
        } catch (e) {
            return {error: 'Error'}
        }
    },
    async delete(id: ObjectId): Promise<{error?: string}> {
        try {
            const result = await userCollection.deleteOne({_id: id});
            if(result.deletedCount === 0) {
                return {error: "not found"}
            }
            return {};
        } catch (e) {
            return {error: e as string}
        }
    },
    async find(id: ObjectId): Promise<UserType | undefined> {
        const user = await userCollection.findOne({_id: id}) as unknown as UserDBType;
        if(user?._id){
            const mappedUser = {
                id: user._id,
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
            }
            return mappedUser;
        }
        return;
    },
    async findRegistered(id: ObjectId): Promise<UserDBType | undefined> {
        const user = await userCollection.findOne({_id: id}) as unknown as UserDBType;
        if(user?._id) {
            return user;
        }
        return;
    },
    async findByCode(code: string): Promise<string | undefined> {
        const user = await userCollection.findOne({confirmationCode: {$regex: code}}) as unknown as UserDBType;
        return user?._id;
    },
    async markAsConfirmed(code: string): Promise<boolean> {
        const userId = await this.findByCode(code);
        if(userId) {
            const res = await userCollection.updateOne({_id: new ObjectId(userId)}, {$set: {isConfirmed: true}})
            return true;
        }
        return false
    },
    async updateConfirmation(id: ObjectId): Promise<{error?: string, confirmationCode?: string}> {
        try {
            const confirmationCode = crypto.randomUUID();
            const date = new Date()
            const expirationDate = date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
            const confirmationCodeExpirationDate = new Date(expirationDate).toISOString();
            const res = await userCollection.updateOne({_id: id}, {
                $set: {
                    confirmationCodeExpirationDate,
                    confirmationCode,
                    isConfirmed: false
                }
            });
            return {confirmationCode};
        } catch (e) {
            return {error: e as string}
        }
    },
    async findByLoginOrEmail(search: string): Promise<UserDBType | undefined> {
        const user = await userCollection.findOne({$or: [{login: {$regex: search}}, {email: {$regex: search}}]}) as unknown as UserDBType;
        if(user?._id){
            return user;
        }
        return;
    }
}