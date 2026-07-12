import { fetchData, postData, deleteData, putData } from "../api/Api";
import type { Transaction } from "../Interfaces/Transaction";

export async function fetchTransactions() {
    return fetchData<Transaction[]>("/users", undefined, {});
}

export async function createTransaction(formData: FormData) {
    return postData<Transaction>('/transactions/create', formData)
}
export async function updateTransaction(formData: FormData, id?: number) {
    return putData<Transaction>(`/transactions/${id}`, formData)
}
export async function deleteTransaction(id: number) {
    return deleteData<void>(`/transactions/${id}`)
}

export async function fetchBalance(userId: number) {
    return fetchData<number>(`/transactions/${userId}/balance`);
}