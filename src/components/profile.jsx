import EditProfile from "./edit-profile";
import { useSelector } from "react-redux";
export default function Profile() {
  const user = useSelector((store) => store.user);

  return (
    <>
      <EditProfile user={user}/>
    </>
  );
}
