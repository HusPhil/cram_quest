export type MaterialType = "Video" | "Flashcard" | "Note"


export interface MaterialBase {
    title: string;
    type: MaterialType;
    link: string;
}

export interface MaterialCreate extends MaterialBase{}


export interface MaterialUpdate{
    title?: string;
    type?: string;
    link?: string;
}

export interface MaterialRead extends MaterialBase{
    id: number
    subject_id: number
}