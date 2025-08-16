import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { addUser } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";

export default function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInStore = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const user = await axios.get("http://localhost:3002/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data));
    } catch (err) {
      if (err.status === 401) {
        return navigate("/login");
      }
      console.log("Error is : ", err);
    }
  };

  useEffect(() => {
    if (!userInStore) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
