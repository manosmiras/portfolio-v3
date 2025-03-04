import type {ParsedContent} from "@nuxt/content";

export interface Project extends ParsedContent {
    title: string;
    description: string;
    headerImg: string;
    previewImg: string;
    tags: string[];
}