import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [company, setCompany] = useState("");
  //const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
          setContent(response.data);
          setCompany(response.data.company);
          //setAuthorized(true);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        //setAuthorized(false);
        window.location.replace("/login");
      }
    ).catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <main>
      <div className="lernen_banner large bg-contact">
        <div className="container">
          <div className="row">
            <div className="lernen_banner_title">
              <h1>Welcome {content.name},</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
            <p>
              This is your detail:
              <ul>
                <li>Email: {content.email}</li>
                <li>Company: {company.name}</li>
              </ul>
            </p>
          </div>
          </div>
        </div>
      </div>
    </main>
    
  );
};

export default BoardUser;
