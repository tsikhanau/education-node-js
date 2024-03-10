export enum Resolutions {
    P144  = 'P144',
    P240 = 'P240',
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160"
}

export type OutputVideoType = {
    title: string;
    author: string;
    availableResolutions: Resolutions[];
    id: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
}

export type InputVideoType ={
    title: string;
    author: string;
    availableResolutions: Resolutions[];
}

export type UpdateInputVideoType ={
    title: string;
    author: string;
    availableResolutions: Resolutions[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
}
