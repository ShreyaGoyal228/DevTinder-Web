import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../store/feed-slice";

export default function FeedUserCard({ user }) {
  const loggedInUser = useSelector((store) => store.user);
  const dispatch=useDispatch()
  const handleSentRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `http://localhost:3002/request/sent/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
      console.log("result is", res.data);
    } catch (err) {
      console.log("Error is :", err.response.data);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="card bg-base-300 w-96 shadow-xl">
          <figure className="px-6 pt-10">
            <img
              src={user.photoUrl}
              alt="user-image"
              className="rounded-xl object-cover size-56"
            />
          </figure>
          <div className="card-body ">
            <h2 className="card-title text-left">
              {user.firstName + " " + user.lastName}
            </h2>
            <p className="text-left">{user.about}</p>
            {user.gender && user.age && (
              <div>{user.gender + "," + user.age}</div>
            )}

            {loggedInUser._id !== user.userId && (
              <div className="card-actions flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSentRequest("interested", user._id)}
                >
                  Interested
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleSentRequest("ignore", user._id)}
                >
                  Ignore
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
