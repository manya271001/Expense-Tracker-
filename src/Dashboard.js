import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) return;
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `http://localhost:5102/api/auth/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        dispatch(setUser(response.data));
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [dispatch, userId]);

  const addGroup = () => {
    navigate("/addgroup");
  }

  return (
    <div className="container py-4">
      <div className="text-white text-center p-4 rounded" style={{backgroundColor:"paleturquoise", fontStyle:"italic"}}>
        <h2 className="mb-0">Hello, {userId ? user.name : "Guest"} 👋</h2>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="bg-danger text-white p-4 rounded text-center">
            <p className="fw-bold">Amount Lent</p>
            <p className="fs-4">₹{user.initialBalance}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-primary text-white p-4 rounded text-center">
            <p className="fw-bold">Amount Owed</p>
            <p className="fs-4">₹{user.initialBalance}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-success text-white p-4 rounded text-center">
            <p className="fw-bold">Groups Joined</p>
            <p className="fs-4">{user.numberOfGroups}</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-outline-dark px-4 py-2" onClick={addGroup}>Add Group</button>
        <button className="btn btn-outline-secondary px-4 py-2">Remove Group</button>
      </div>
    </div>
  );
};

export default Dashboard;
