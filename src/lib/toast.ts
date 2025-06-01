import { toast } from "react-toastify";

export const showSuccess = (message: string) => {
    toast.success(message, { position: "top-right", autoClose: 2000 });
};

export const showError = (message: string) => {
    toast.error(message, { position: "top-right", autoClose: 2000 });
};
