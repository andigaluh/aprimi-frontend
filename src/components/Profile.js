import React, { useState, useEffect }  from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  //const currentUser = AuthService.getCurrentUser();
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

  },[]);

  return (
    <div>
      {currentUser ? (
        <div>
          <div className="col-md-12">
            <h4>User Profile</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Token</th>
                  <th>Authorities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{currentUser.id}</td>
                  <td>{currentUser.name}</td>
                  <td>{currentUser.email}</td>
                  <td>
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                  </td>
                  <td>
                    <ul>
                      {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-12 text-right">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      ) : (
          <div className="col-md-12">
            <h4>Unauthorized</h4>
          </div>
      )}
    </div>
    
  );
};

export default Profile;
