import axios from "axios";
import { url } from "./constants";

const Axios = axios.create({
  baseURL: url,
});
export default Axios;
