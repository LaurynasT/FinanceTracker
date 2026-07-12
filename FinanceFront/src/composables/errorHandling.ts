import { AxiosError } from "axios";
import { useNotificationStore } from "../store/ErrorStore";

interface ValidationErrorResponse {
    errors?: Record<string, string[]>;
}


export function httpErrorHandler(error: AxiosError<ValidationErrorResponse>) {
    const {showError} = useNotificationStore.getState();

      if (error.code === "ERR_NETWORK") {
        showError("Network connection problem.");
        return;
    } 

    const validationErrors = error.response?.data?.errors;

     if (validationErrors?.Balance) {
        
        showError("Balance must be a number")
        
    }

        switch (error.response?.status) {
        case 400:
            showError("Request failed.");
            break;

        case 401:
            showError("Please log in.");
            break;

        case 403:
            showError("Access denied.");
            break;

        case 404:
            showError("Resource not found.");
            break;

        case 500:
            showError("Server error.");
            break;

        default:
            showError("Unexpected error.");
            break;
    }

}