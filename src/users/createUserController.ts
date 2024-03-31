import {Request, Response} from 'express';
import {InputUserType, UserType} from "../input-output-types/user_types";
import {userRepository} from "./userReposetory";

export const createUserController = async (req: Request<any, any, InputUserType>, res: Response<UserType | {}>) => {
    const createdUser = await userRepository.create(req.body);
    if(!createdUser.id) {
        res.status(500).json({});
        return;
    }

    const newUser = await userRepository.find(createdUser.id);

    res.status(201).json(newUser);
}