import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { authSelector, setRedirectURL, setUser } from "../../app/features/auth/authSlice";
import { toast, useToasterStore } from "react-hot-toast";

export default function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toasts } = useToasterStore();
  const json = localStorage.getItem("USER_DATA");
  useEffect(() => {
    const userData = json && JSON.parse(json);
    if (!userData?.email) {
      dispatch(setRedirectURL(window.location.pathname));
      navigate('/login')
    } else {
      dispatch(setUser(userData))
    }
  }, [json]);

  useEffect(() => {
      let TOAST_LIMIT = 2
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
