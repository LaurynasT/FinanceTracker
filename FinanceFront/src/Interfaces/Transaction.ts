import type { Category } from "./Category";
export interface Transaction {
    id: number,
    name: string,
    description: string,
    amount: number,
    date: Date,
    category: Category

}