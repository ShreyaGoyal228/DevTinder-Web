import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feed-slice";
import Loading from "./loading";
import { Navigate } from "react-router-dom";
import FeedUserCard from "./feedUser-card";
import { BASE_URL } from "../utils/constants";
export default function Feed() {
  const dispatch = useDispatch();
  // const navigate=useNavigate();
  const feedUsers = useSelector((store) => store.feed);
  // const user = useSelector((store) => store.user);

  const getFeedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("Error is :", err.response.data);
    }
  };

  useEffect(() => {
    getFeedUsers();
  }, []);

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }
  if (!feedUsers) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (feedUsers.length === 0) {
    return <div>No connections found</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className=" w-full ">
          {feedUsers[0] && (
            <div className="animate-fadeIn">
              <FeedUserCard user={feedUsers[0]} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
