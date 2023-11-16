import React from "react";
import "./css/demoUsers.css";

const DemoUsers = () => {
  return (
    <div className="table-container">
      <table className="table table-demo table-striped table-hover">
        <thead className="thead">
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>saurabh@example.com</td>
            <td>Saurabh@123</td>
            <td>Lead-Guide</td>
          </tr>
          <tr>
            <td>sumit@example.com</td>
            <td>Sumit@123</td>
            <td>User</td>
          </tr>
          <tr>
            <td>vishal@example.com</td>
            <td>Vishal@123</td>
            <td>User</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DemoUsers;
