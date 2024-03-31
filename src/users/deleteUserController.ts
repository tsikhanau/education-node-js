import {userRepository} from "./userReposetory";
import {Request, Response} from 'express';
import {ObjectId} from "mongodb";

export const deleteUserController = async (req: Request<any, any, {id: string}>, res: Response) => {
    const result = await userRepository.delete(new ObjectId(req.params.id));

    if(result?.error === 'not found') {
        res.status(404).json({})
        return;
    }

    res.status(204).json({})
}