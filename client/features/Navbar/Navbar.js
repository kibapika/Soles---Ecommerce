import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store.js";
import shoeLogo from "../../../public/pictures/shoeLogo.png"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./navbar.css";

const Navbar = () => {
  const [hState, sethState] = useState("top");

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const user = useSelector((state) => state.auth.me);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutRedirect = () => {
    dispatch(logout());
    navigate("/home");
  };

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    var lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;
      if (y > lastVal) {
        sethState("down");
      }
      if (y < lastVal) {
        sethState("up");
      }
      if (y === 0) {
        sethState("top");
      }
      lastVal = y;
    };
  }, []);

  return (
    <div id="navDiv" className={hState}>
      <div id="nav">
        <div id="leftNav">
          <Link to="/home">
            <img id="shoeLogo" src={shoeLogo} alt="shoeLogo" />
          </Link>
          <Link className="navLinks" to="/home">
            Home
          </Link>
          <Link className="navLinks" to="/products">
            Explore
          </Link>
          {isLoggedIn ? (<Link className="navLinks" to="/userInfo">
            {user && user.isAdmin ? "Admin" : "User Info"} </Link>) : null}
        </div>
        {/* ---------------------------------------------------------------- */}
        <div id="rightNav">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <button
                className="navLinks"
                id="logoutBtn"
                type="button"
                onClick={logoutRedirect}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link className="navLinks" to="/login">
                Sign In
              </Link>
            </div>
          )}
          {/* -------------------------------------------------------------- */}
          <Link to="/cart">
            <ShoppingBagIcon id="cart" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
