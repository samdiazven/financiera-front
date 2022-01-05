import authToken from "apis/token";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
export default function useAuth() {
  const token = localStorage.getItem("token");
  authToken(token);
  const history = useHistory();
  useEffect(() => {
    if (token) {
      history.push("/admin/dashboard");
    } else {
      history.replace("/auth/signin");
    }
  }, [token]);
}
