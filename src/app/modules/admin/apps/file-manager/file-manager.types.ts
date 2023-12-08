export interface Item {
    createdAt: number;
    updatedAt: number;
    id: string;
    name: string;
    description: string | null;
    isDeleted: boolean;
    deletedBy: string;
    deletedAt: number | null;
    status: string;
}
