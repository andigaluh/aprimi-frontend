import React from "react"
import { Link } from "react-router-dom";

const UserMenu = (props) => {
  return (
    <div>
      <h4>Admin menu</h4>
      <ul>
        <li>
          <Link to={"/user"}>User profile</Link>
        </li>
        <li>
          <Link to={"/user/trainingCertificationHistory"}>Training certification</Link>
        </li>

        <li>
          <Link to={"/user/contact"}>Contact</Link>
        </li>
        {props.isKomite && (
          <div>
            <li>
              <Link to={"/user/article"}>Article</Link>
            </li>
            <li>
              <Link to={"/user/media"}>Media</Link>
            </li>
            <li>
              <Link to={"/user/agenda"}>Agenda</Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default UserMenu