export const getSearchParameters = (query: {
    searchNameTerm?: string,
    sortBy?: string,
    sortDirection?: 'desc' | 'asc',
    pageNumber?: string,
    pageSize?: string
}) : ({
    searchNameTerm: string | null,
    sortBy: string,
    sortDirection: 'desc' | 'asc',
    pageNumber: number,
    pageSize: number
}) => ({
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    sortBy: query.sortBy ? query.sortBy : 'createdAt',
    sortDirection: query.sortDirection ? query.sortDirection : 'desc',
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize ? +query.pageSize : 10,
})