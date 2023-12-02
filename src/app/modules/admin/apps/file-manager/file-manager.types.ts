export interface Items
{
    files: Item[];
    path: any[];
}

export interface Item
{
    id?: string;
    folderId?: string;
    name?: string;
    description?: string | null;
}
