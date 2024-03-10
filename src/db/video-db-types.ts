import {Resolutions} from "../input-output-types/video-types";

export type VideoDBType = {
    id: string;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: Resolutions[];
}