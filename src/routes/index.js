import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "store/slices/auth";
function Routes() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
}

export default Routes;
