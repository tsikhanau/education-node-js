import {Request, Response} from "express";
import {userRepository} from "./userReposetory";
import {ObjectId} from "mongodb";

export const getAuthMeController = async (req: Request, res: Response ) => {
    // @ts-ignore
    const user = await userRepository.find(new ObjectId(req!.userId as string));

    if (!user) {
        res.status(401).json({});
        return;
    }
    if(user) {
        const userData = {
            email: user.email,
            login: user.login,
            userId: user.id
        }
        res.status(200).json(userData);
        return;
    }
}