import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading";
import { addConnections } from "../store/connections-slice";
import FeedUserCard from "./feedUser-card";
import { BASE_URL } from "../utils/constants";
export default function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log("Error :", err.response.data);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) {
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
            Connections
          </span>
        </h1>
      </header>

      {connections.length == 0 ? (
        <>
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg text-base-content/70">
              No connections found.
            </p>
            <button className="btn btn-primary mt-4">Find Connections</button>
          </div>
        </>
      ) : (
        <div className="space-y-5 max-w-xl mx-auto">
          {connections.map((user, index) => (
            <div
              key={index}
              className="card bg-base-300 shadow-md hover:shadow-lg transition p-4 flex items-center gap-4 flex-row"
            >
              <div className="avatar">
                <div className="w-16 h-16 rounded-full">
                  <img src={user.photoUrl} alt={user.name} />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="font-bold text-lg">
                  {user.firstName + " " + user.lastName}
                </h2>
                <p className="text-sm text-base-content/70">{user.about}</p>
                <p className="text-sm text-base-content/60">
                  {user.age} • {user.gender}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
