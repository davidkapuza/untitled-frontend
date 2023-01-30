import { useEffect } from "react";
import { toast } from "react-toastify";
import { ErrorResponse } from "../../tmptypes";

type ToastHookProps = {
  success?: {
    message: string;
  };
  onSuccess?: () => void;
  error?: {
    data: ErrorResponse;
  };
  onError?: () => void;
  info?: {
    message: string;
  };
  onInfo?: () => void;
  statusChange: boolean;
};

export function useToastsStatus({
  success,
  error,
  info,
  statusChange,
  onSuccess,
  onError,
  onInfo,
}: ToastHookProps) {
  useEffect(() => {
    if (success) {
      toast.success(success.message, {
        theme: "colored",
      });
      onSuccess && onSuccess();
    }
    if (info) {
      toast.success(info.message, {
        theme: "colored",
      });
      onInfo && onInfo();
    }
    if (error) {
      if (Array.isArray(error.data)) {
        error.data.forEach((el) =>
          toast.error(
            <div>
              {el.message}
              <br />
              {el.error}
            </div>,
            {
              theme: "colored",
            }
          )
        );
      } else {
        toast.error(
          <div>
            {error.data.message}
            <br />
            {error.data.error}
          </div>,
          {
            theme: "colored",
          }
        );
      }
      onError && onError();
    }
  }, [statusChange, success, error, info, onError, onSuccess, onInfo]);
}
