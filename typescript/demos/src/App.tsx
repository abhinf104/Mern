import { type Info, type AdminInfoList } from "./types.ts";

import UserInfo from "./UserInfo.tsx";
import AdminInfo from "./AdminInfo.tsx";

function App() {
  const user: Info = {
    id: 1,
    name: "John",
    email: "abhi@gmail.com",
  };

  const admin: AdminInfoList = {
    id: 2,
    name: "John A",
    email: "abhi@gmail.com",
    role: "Manager",
    lastLogin: new Date().getDate(),
  };

  return (
    <>
      <UserInfo {...user} />
      <AdminInfo {...admin} />
    </>
  );
}

export default App;
