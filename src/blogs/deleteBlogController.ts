import {Request, Response} from 'express';
import {blogRepository} from "./blogRepository";

export const deleteBlogController =  async (req: Request<any, any, {id: string}>, res: Response) => {
    const result = await blogRepository.delete(+req.params.id);

    if(result?.error === 'not found') {
        res.status(404).json({});
        return;
    }

    res
        .status(204)
        .json({})
}