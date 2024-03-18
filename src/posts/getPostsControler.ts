import {Request, Response} from 'express';
import {postCollection} from "../db/mongo-db";
import {PostType} from "../input-output-types/post-types";
import {PostDBType} from "../db/posts-db-types";
import {getSearchParameters} from "../helpers/helpers";
type ResponseType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: PostType[]
}
export const getPostController = async (req: Request, res: Response<ResponseType>) => {
    const {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm
    } = getSearchParameters(req.query);
        const search = searchNameTerm ? {title: {$regex: searchNameTerm, $options: 'i'}} : {};

    const data = postCollection.find({...search}).sort(sortBy, sortDirection).limit(pageSize).skip((pageNumber - 1) * pageSize);
    const result = await data.toArray() as unknown as PostDBType[];
    const mappedData: PostType[] = result.map(({blogId, blogName, content, createdAt, shortDescription, _id, title}) => ({
        blogId, blogName, content, createdAt, shortDescription, title, id: _id
    }))
    const totalCount = await postCollection.countDocuments({...search});
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