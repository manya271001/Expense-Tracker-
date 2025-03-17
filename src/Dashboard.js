import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import AddGroup from "./AddGroup";
import { Modal, Button } from "react-bootstrap";
import { fetchGroups } from "./redux/groupSlice ";
import DeleteGroup from "./DeleteGroup";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Separate modal state
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [actionType, setActionType] = useState(""); // Track which action user tried

  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user.id);
  const { groupCount } = useSelector((state) => state.groups);

  useEffect(() => {
    if (userId) {
      console.log("Fetching groups for user:", userId);
      dispatch(fetchGroups(userId));
    }
  }, [dispatch, userId]);

  const numberOfGroups = useSelector((state) => state.groups.groupCount);

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

  // Function to handle "Add Group" button click
  const handleAddGroupClick = () => {
    if (!userId) {
      setActionType("create a group");
      setShowAuthPopup(true);
    } else {
      setShowAddModal(true);
    }
  };

const [userGroups, setUserGroups] = useState([]); // Store groups created by the user

const handleRemoveGroupClick = async () => {
  if (!userId) {
    setActionType("remove a group");
    setShowAuthPopup(true);
    return;
  }

  try {
    const response = await axios.get(
      `http://localhost:5102/api/group/createdBy/${userId}`
    );

    if (response.data?.$values) {
      setUserGroups(response.data.$values); // Extract actual group list
    } else {
      setUserGroups([]);
    }

    setShowDeleteModal(true);
  } catch (error) {
    console.error("Error fetching user's groups:", error);
  }
};

const handleDeleteGroup = async (groupId) => {
  if (!groupId) return; // Prevent invalid deletes

  try {
    const response = await axios.delete(
      `http://localhost:5102/api/group/deleteGroup/${groupId}/${userId}`
    );

    if (response.status === 200) {
      console.log(`Group ${groupId} deleted successfully`);
      
      // Fetch updated groups list
      const updatedGroups = userGroups.filter((group) => group.id !== groupId);
      setUserGroups(updatedGroups); // Update UI

      if (updatedGroups.length === 0) {
        setShowDeleteModal(false); // Close modal if no groups left
      }
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};




  return (
    <div className="container py-4">
      <div className="text-white text-center p-4 rounded" style={{ backgroundColor: "paleturquoise", fontStyle: "italic" }}>
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
            <p className="fs-4">{numberOfGroups}</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-primary" onClick={handleAddGroupClick}>
          Add Group
        </button>
        <button className="btn btn-outline-secondary px-4 py-2" onClick={handleRemoveGroupClick}>
          Remove Group
        </button>
      </div>

      {/* Add Group Modal */}
      <AddGroup show={showAddModal} handleClose={() => setShowAddModal(false)}  />

      {/* Delete Group Modal */}
      <DeleteGroup 
  show={showDeleteModal} 
  handleClose={() => setShowDeleteModal(false)} 
  groups={userGroups} 
  handleDelete={handleDeleteGroup} 
/>

      {/* Authentication Required Popup */}
      <Modal show={showAuthPopup} onHide={() => setShowAuthPopup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You must be logged in to {actionType}. Please log in or register to continue.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAuthPopup(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => navigate("/register")}>
            Login / Register
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
