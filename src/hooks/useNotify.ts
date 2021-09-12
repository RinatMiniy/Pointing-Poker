import React from "react";
import { toast, ToastOptions } from "react-toastify";

export const useNotify = () => {
  return React.useCallback(
    (params: { type: "error" | "success"; message: string }) => {
      const commonProps: ToastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      };

      toast[params.type](params.message, commonProps);
    },
    []
  );
};
