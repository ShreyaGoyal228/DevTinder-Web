import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser } from "../store/user-slice";
import FeedUserCard from "./feedUser-card";
import Loading from "./loading";
export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(false);
  const [userId,setUserId] = useState(user?._id || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAbout(user.about || "");
      setGender(user.gender || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setUserId(user._id || "");
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <Loading />
      </>
    );
  }
  const handleProfileEdit = async () => {
    try {
      setError(null);
      const user = await axios.patch(
        "http://localhost:3002/profile/edit",
        { firstName, lastName, about, gender, photoUrl, age },
        { withCredentials: true }
      );
      dispatch(addUser(user.updatedUser));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex gap-10 items-center justify-center mt-10">
        <div className="card bg-base-300 w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">FirstName</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your firstName"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">LastName</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your lastName"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">PhotoUrl</span>
              </div>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="Enter url for your profile"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">Age</span>
              </div>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter your age"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Enter your gender"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label py-2">
                <span className="label-text">About</span>
              </div>
              <textarea
                type="text"
                value={about}
                rows="3"
                cols="40"
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell about yourself"
                className="textarea textarea-bordered w-full max-w-xs"
              />
            </label>

            {error && <div className="text-red-700">Error : {error}</div>}
            <div className="card-actions justify-center py-2">
              <button className="btn btn-primary " onClick={handleProfileEdit}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        <FeedUserCard
          user={{userId,firstName, lastName, about, photoUrl, age, gender }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>User updated sucessfully.</span>
          </div>
        </div>
      )}
    </>
  );
}
