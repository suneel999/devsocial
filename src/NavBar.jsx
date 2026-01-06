import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from './constants';
import { removeUser } from './UserSlice';


export const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((store) => store.user)
  const handlelogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }   // SEND cookies
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };



  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevSocial</Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <p className="font-medium">
            Hello, {user.firstName}
          </p>
        )}

        {user && <div className="dropdown dropdown-end mx-10">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">

              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile

              </Link>
            </li>
            <li><Link to="/connections">connections</Link></li>
            <li><Link to="/requests">requests</Link></li>
            <li onClick={handlelogout}><a>Logout</a></li>
          </ul>
        </div>}
      </div>
    </div>
  )
}
export default NavBar;