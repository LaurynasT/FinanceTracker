import { fetchData, postData, deleteData, putData } from "../api/Api";
import type { User } from "../Interfaces/User";

export async function fetchUsers() {
    return fetchData<User[]>("/users", undefined, {});
}

export async function postUser(formData: FormData) {
    return postData<User>('/users/create', formData)
}
export async function putUser(formData: FormData, id?: number) {
    return putData<User>(`/users/${id}`, formData)
}
export async function deleteUser(id: number) {
    return deleteData<void>(`/users/${id}`)
}