import { toast } from "react-toastify";

export class ToastService {
  showError (message: string) {
    return toast.error(message, {
      toastId: `failure-toast`
    });
  }

  showSuccess (message: string) {
    return toast.success(message, {
      toastId: `success-toast`
    });
  }
}
