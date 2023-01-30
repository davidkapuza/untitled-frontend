import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../../../entities/User/api/userApi";
import { User } from "../../../tmptypes";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data as User,
  });
  console.log(user);
  if (loading) {
    return <div>Full screen loader...</div>;
  }

  return user && user.roles.every((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
