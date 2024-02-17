import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
  const AuthStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && AuthStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && AuthStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [AuthStatus, authentication, navigate]);

  return Loader ? null : <>{children}</>;
}

export default Protected;
