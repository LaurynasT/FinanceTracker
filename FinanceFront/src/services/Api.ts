import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_REACT_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
})

export const fetchData = async <T>(
    endpoint: string,
    pathParam?: number | string,
    queryParams?: Record<string, any>
) : Promise<T> => {
    const url = pathParam ? `${endpoint}/${pathParam}` : endpoint
    const response = await axiosInstance.get<T>(url, {params: queryParams})
    return response.data;
}

export const deleteData = async <T>(
    endpoint: string,
) : Promise<T> => {
    const url =  `${endpoint}/`
    const response = await axiosInstance.delete<T>(url)
    return response.data;
}

export const putData = async <T>(endpoint: string, params: object): Promise<T> => {
  const response = await axiosInstance.put<T>(endpoint, params)
  return response.data
}

export const postData = async <T>(endpoint: string, params: object): Promise<T> => {
  const response = await axiosInstance.post<T>(endpoint, params)
  return response.data
}
