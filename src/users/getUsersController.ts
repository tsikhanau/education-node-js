import {getSearchParameters} from "../helpers/helpers";
import {Request, Response} from 'express';
import { userCollection} from "../db/mongo-db";
import {UserDBType} from "../db/user-db-types";
import {UserType} from "../input-output-types/user_types";

type ResponseType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: UserType[]
}

export const getUsersController = async (req: Request, res: Response<ResponseType>) => {
    const {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection,
    } = getSearchParameters(req.query);
    const searchLoginTerm = req.query.searchLoginTerm ? {login: {$regex: req.query.searchLoginTerm, $options: 'i'}} : {}
    const searchEmailTerm = req.query.searchEmailTerm ? {email: {$regex: req.query.searchEmailTerm, $options: 'i'}} : {}
    const search = {...searchLoginTerm, ...searchEmailTerm};
    // @ts-ignore
    const data = userCollection.find({...search}).sort(sortBy, sortDirection).limit(pageSize).skip((pageNumber - 1) * pageSize);
    const result = await data.toArray() as unknown as UserDBType[];

    const mappedData: UserType[] = result.map(({_id, email, login, createdAt}) => ({id: _id, email, login, createdAt}));

    // @ts-ignore
    const totalCount  = await userCollection.countDocuments({...search});
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