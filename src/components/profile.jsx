import EditProfile from "./edit-profile";
import { useSelector } from "react-redux";
export default function Profile() {
  const user = useSelector((store) => store.user);
  console.log("user in store is", user);

  return (
    <>
      <EditProfile user={user} />
    </>
  );
}
