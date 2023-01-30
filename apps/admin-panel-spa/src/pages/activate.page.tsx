import React, { useEffect } from "react";
import { useActivateAccountMutation } from "../features/auth/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ActivatePage() {
  const [activateAccount, { isLoading, isSuccess, data, isError, error }] =
    useActivateAccountMutation();
  const { email, hex } = useParams() as { email: string; hex: string };
  const navigate = useNavigate();
  useEffect(() => {
    activateAccount({ email, hex });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate('/login');
    }
    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  
  return <div>ActivatePage</div>;
}

export default ActivatePage;
