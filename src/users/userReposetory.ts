import {userCollection} from "../db/mongo-db";
import {InputUserType, UserType} from "../input-output-types/user_types";
import {ObjectId} from "mongodb";
import {UserDBType} from "../db/user-db-types";
import {bcryptService} from "./bcryptServeice";

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
    async findByLoginOrEmail(search: string): Promise<UserDBType | undefined> {
        const user = await userCollection.findOne({$or: [{login: {$regex: search}}, {email: {$regex: search}}]}) as unknown as UserDBType;
        if(user?._id){
            return user;
        }
        return;
    }
}