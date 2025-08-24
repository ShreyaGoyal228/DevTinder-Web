import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/user-slice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true } //for the token addition or removal
      );
      console.log("res issss", res);
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log("Error is", err);
    }
  };
  return (
    <div className="sticky top-0 z-30 px-3 md:px-12 w-full">
      <div className="flex items-center justify-between px-4 md:px-[45px] navbar bg-[rgba(45,45,45,0.27)] backdrop-blur-[22.79px] rounded-[30px] border border-white/15 ">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>

        {user && (
          <>
            <div className="flex items-center gap-2">
              <div>
                {user.firstName} {user.lastName}
              </div>
              <div className="flex-none gap-2">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user.photoUrl}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/connections">Connections</Link>
                    </li>
                    <li>
                      <Link to="/requests">Requests</Link>
                    </li>
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
