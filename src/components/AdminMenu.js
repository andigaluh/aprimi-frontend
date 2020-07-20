import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
      <div>
        <h4>Admin menu</h4>
        
          <ul>
            <li>
              <Link to={"/admin/profile"}>User profile</Link>
            </li>
            <li>
              <Link to={"/admin/users"}>Manage Users</Link>
            </li>
            <li>
              <Link to={"/admin/membership"}>Manage Memberships</Link>
            </li>
            <li>
              <Link to={"/admin/content"}>Manage Content</Link>
            </li>
            <li>
              <Link to={"/admin/event"}>Manage Event</Link>
            </li>
            <li>
              <Link to={"/admin/article"}>Manage Article</Link>
            </li>
            <li>
              <Link to={"/admin/media"}>Manage Media</Link>
            </li>
            <li>
              <Link to={"/admin/contact"}>Manage Contact</Link>
            </li>
            <li>
              <Link to={"/admin/carousel"}>Manage Carousel</Link>
            </li>
            <li>
              <Link to={"/admin/logo"}>Manage Logo</Link>
            </li>
          </ul>
      </div>
    );
}

export default AdminMenu;