import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getRol } from "store/selectors/auth";
import { signOut } from "store/slices/auth";
export default function useRedirect() {
  const rols = useSelector(getRol);
  const dispatch = useDispatch();
  const history = useHistory();
  const url = window.location.pathname;

  useEffect(() => {
    if (rols) {
      const hasPermises = rols.permissionList.some((item) => item.url === url);
      if (!hasPermises) {
        dispatch(signOut());
        history.replace("/auth");
      }
    }
  }, [rols]);
}
