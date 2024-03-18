import {Request, Response} from 'express';
import {blogCollection, postCollection} from "../db/mongo-db";
import {getSearchParameters} from "../helpers/helpers";
import {ObjectId} from "mongodb";
import {PostDBType} from "../db/posts-db-types";
import {PostType} from "../input-output-types/post-types";

type ResponseType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostType[]
}

export const getBlogPostsController = async (req: Request, res: Response<ResponseType | Object>) => {
        const {blogId} = req.params;
    const blog = await blogCollection.findOne({_id: new ObjectId(blogId)});
    if(!blog) {
        res.status(404).json({});
        return;
    }
    const {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
    } = getSearchParameters(req.query);
    const data = postCollection.find({_id: new ObjectId(blogId)}).sort(sortBy, sortDirection).limit(pageSize).skip((pageNumber - 1) * pageSize);
    const result = await data.toArray() as unknown as PostDBType[];
    const mappedData: PostType[] = result.map(({blogId, blogName, content, createdAt, shortDescription, _id, title}) => ({
        blogId, blogName, content, createdAt, shortDescription, title, id: _id
    }))

    const totalCount  = await blogCollection.countDocuments({_id: new ObjectId(blogId)});
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