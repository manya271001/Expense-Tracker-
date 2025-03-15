import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id); // Get user ID from Redux

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) return; // Don't fetch if user ID is null

        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`http://localhost:5102/api/auth/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUser(response.data)); // Update Redux state with user data
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [dispatch, userId]); // Fetch only when userId is available

  return (
    <div className="dashboard">
      <h2>Hi, {userId ? user.name : "Guest"} 👋</h2>
      {userId ? (
        <>
          <p>Ammount Lent : ₹{user.initialBalance}</p>
           <p>Ammount  Owned : ₹{user.initialBalance}</p>
          <p>Groups Joined: {user.numberOfGroups}</p>
          <button>Add Group</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
