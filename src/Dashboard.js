import React from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container mt-4">
        <h2 className="text-center text-primary mb-4">Expense Splitter Dashboard</h2>
        
        {/* Summary Cards */}
        <div className="row text-center">
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <h5 className="card-title">Total Expenses</h5>
                <p className="card-text fs-4">₹12,500</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger mb-3">
              <div className="card-body">
                <h5 className="card-title">You Owe</h5>
                <p className="card-text fs-4">₹3,200</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-warning mb-3">
              <div className="card-body">
                <h5 className="card-title">You Lent</h5>
                <p className="card-text fs-4">₹4,000</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div className="card mt-4">
          <div className="card-header bg-primary text-white">Recent Transactions</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>14 Mar 2025</td>
                  <td>Lunch at Bistro</td>
                  <td>₹1,200</td>
                  <td className="text-success">Settled</td>
                </tr>
                <tr>
                  <td>12 Mar 2025</td>
                  <td>Movie Tickets</td>
                  <td>₹800</td>
                  <td className="text-danger">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Groups */}
        <div className="card mt-4">
          <div className="card-header bg-secondary text-white">Your Groups</div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Weekend Trip
                <span className="badge bg-primary rounded-pill">₹5,000</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Office Lunch
                <span className="badge bg-danger rounded-pill">₹2,000</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
