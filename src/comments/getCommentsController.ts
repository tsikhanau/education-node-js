import {Request, Response} from "express";
import {CommentOutputType, CommentType} from "../input-output-types/comment-types";
import {ObjectId} from "mongodb";
import {postRepository} from "../posts/postRepository";
import {getSearchParameters} from "../helpers/helpers";
import {commentCollection, postCollection} from "../db/mongo-db";
import {CommentDBType} from "../db/comments-db-types";


export const getCommentsController = async (req: Request<any, any, {id: string}>, res: Response) => {
    const post = await postRepository.find(new ObjectId(req.params.id));

    if(!post) {
        res.status(404).json({});
        return;
    }

    const {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
    } = getSearchParameters(req.query);

    const data = commentCollection.find({postId: post!.id}).sort(sortBy, sortDirection).limit(pageSize).skip((pageNumber - 1) * pageSize);
    const result = await data.toArray() as unknown as CommentDBType[];
    const mappedData: CommentOutputType[] = result.map(({content, _id, commentatorInfo, createdAt}) => ({
        content, commentatorInfo, id: _id, createdAt
    }))

    const totalCount = await commentCollection.countDocuments({postId: post!.id});
    const pagesCount = Math.ceil(totalCount / pageSize);

    const response = {
        pagesCount,
        page: pageNumber,
        pageSize,
        totalCount,
        items: mappedData
    }
    res.status(200).json(response);



}