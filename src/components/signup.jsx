import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
          gender,
          age,
          photoUrl,
          about,
        },
        { withCredentials: true }
      );
      console.log("data save during signup is", res);
      setMessage(res.data);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="card bg-base-100 w-[50%] shadow-xl ">
          <div className="card-body">
            <h2 className="card-title">Signup</h2>
            <div className="flex flex-row gap-10">
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
                  placeholder="Enter your firstName"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="flex flex-row gap-10">
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="flex flex-row gap-10">
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Enter your Gender"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter your Age"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div className="flex flex-row gap-10">
              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">About Yourself</span>
                </div>
                <textarea
                  type="text"
                  rows="3"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Enter about yourself"
                  className="textarea textarea-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label py-2">
                  <span className="label-text">Photo Url</span>
                </div>
                <input
                  type="url"
                  rows="3"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Enter about yourself"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            {error && <div className="text-red-700">Error : {error}</div>}
            <div className="card-actions justify-center py-2">
              <button className="btn btn-primary " onClick={handleSignup}>
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{message}</span>
          </div>
        </div>
      )}
    </>
  );
}
