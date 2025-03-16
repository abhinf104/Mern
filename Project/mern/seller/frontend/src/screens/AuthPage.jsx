import React, { useState } from "react";
import SellerAuth from "./SellerAuth";
import StorePortal from "./StorePortal";

const AuthPage = () => {
  const [access, setAccess] = useState(true);
  return <>{access === true ? <StorePortal /> : <SellerAuth />}</>;
};

export default AuthPage;
