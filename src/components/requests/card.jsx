import axios from "axios";
import { useDispatch } from "react-redux";
import { removeReceivedReq } from "../../store/received-request-slice";
export default function RequestsReceivedCard({ user, requestId }) {
//   const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const handleReviewRequest = async (requestId, status) => {
    try {
      const res = await axios.post(
        `http://localhost:3002/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      console.log("res is", res);
      dispatch(removeReceivedReq(requestId));
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
            <div className="card-actions flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleReviewRequest(requestId, "accepted")}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleReviewRequest(requestId, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {message && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{message}</span>
          </div>
        </div>
      )} */}
    </>
  );
}
