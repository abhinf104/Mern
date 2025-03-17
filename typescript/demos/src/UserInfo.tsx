import { type Info } from "./types.ts";

const UserInfo: React.FC<Info> = ({ id, name, email }) => {
  return (
    <div>
      <h1>User Information:</h1>
      <p>Name: {name}</p>
      <p>Age: {id}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserInfo;
