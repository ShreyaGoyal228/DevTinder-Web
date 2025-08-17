import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReceivedReq } from "../../store/received-request-slice";
import Loading from "../loading";
import { Link } from "react-router-dom";
import RequestsReceivedCard from "./card";
export default function RequestsReceived() {
  const requests = useSelector((store) => store.receivedRequest);
  const dispatch = useDispatch();
  const getReceivedRequest = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3002/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addReceivedReq(res.data));
    } catch (err) {
      console.log("Error : ", err.response.data);
    }
  };

  useEffect(() => {
    getReceivedRequest();
  }, []);

  if (!requests) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <header className="my-6">
        <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
          <span className="text-center block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Received Requests
          </span>
        </h1>
      </header>
      {requests.length == 0 ? (
        <>
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg text-base-content/70">No pending requests.</p>
            <Link to="/" className="btn btn-primary mt-4">Send Requests</Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {requests.map((req, index) => {
            return (
              <>
                <RequestsReceivedCard
                  user={req.fromUserId}
                  requestId={req._id}
                  key={index}
                />
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
