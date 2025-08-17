import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feed-slice";
import Loading from "./loading";
import FeedUserCard from "./feedUser-card";
export default function Feed() {
  const dispatch = useDispatch();
  const feedUsers = useSelector((store) => store.feed);

  const getFeedUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3002/user/feed", {
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
      {/* {feedUsers.map((user) => ( */}
      <FeedUserCard user={feedUsers[0]} />
      {/* ))} */}
    </>
  );
}
