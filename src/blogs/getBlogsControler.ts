import {Request, Response} from 'express';
import {BlogDBType} from "../db/blogs-db-types";
import {blogCollection} from "../db/mongo-db";
import {BlogType} from "../input-output-types/blog-types";
import {getSearchParameters} from "../helpers/helpers";

type ResponseType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: BlogType[]
}

export const getBlogsController = async (req: Request, res: Response<ResponseType>) => {
    const {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
        searchNameTerm
    } = getSearchParameters(req.query);
    const search = searchNameTerm ? {name: {$regex: searchNameTerm, $options: 'i'}} : {};
    const data = blogCollection.find({...search}).sort(sortBy, sortDirection).limit(pageSize).skip((pageNumber - 1) * pageSize);
    const result = await data.toArray() as unknown as BlogDBType[];
    const mappedData: BlogType[] = result.map(({name, description, websiteUrl, createdAt, isMembership, _id}) => ({
        name, description, websiteUrl, createdAt, isMembership, id: _id
    }));
    const totalCount  = await blogCollection.countDocuments({...search});
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