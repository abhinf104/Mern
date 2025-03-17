import { type AdminInfoList } from "./types.ts";

const AdminInfo: React.FC<AdminInfoList> = ({
  id,
  name,
  email,
  role,
  lastLogin,
}) => {
  return (
    <div>
      <h1>Admin Information:</h1>
      <p>Name: {name}</p>
      <p>Age: {id}</p>
      <p>Email: {email}</p>
      <p>Role:{role}</p>
      <p>Lastlogin:{lastLogin.toString()}</p>
    </div>
  );
};

export default AdminInfo;
