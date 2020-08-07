import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminMenu from "./AdminMenu";
import Profile from "./Admin/Profile/Profile";
import AdminUsers from "./Admin/Users/AdminUsers";
import AdminUsersDetail from "./Admin/Users/AdminUsersDetail";
import AdminUsersAdd from "./Admin/Users/AdminUsersAdd.js";
import AdminMembership from "./Admin/Membership/AdminMembership";
import AdminMembershipAdd from "./Admin/Membership/AdminMembershipAdd";
import AdminMembershipDetail from "./Admin/Membership/AdminMembershipDetail";
import AdminContent from "./Admin/Content/AdminContent";
import AdminContentAdd from "./Admin/Content/AdminContentAdd";
import AdminContentDetail from "./Admin/Content/AdminContentDetail";
import AdminEvent from "./Admin/Event/AdminEvent";
import AdminEventAdd from "./Admin/Event/AdminEventAdd";
import AdminEventDetail from "./Admin/Event/AdminEventDetail";
import AdminEventThumbnail from "./Admin/Event/AdminEventThumbnail";
import AdminEventFile from "./Admin/Event/AdminEventFile";
import AdminArticle from "./Admin/Article/AdminArticle";
import AdminArticleAdd from "./Admin/Article/AdminArticleAdd";
import AdminArticleDetail from "./Admin/Article/AdminArticleDetail";
import AdminMedia from "./Admin/Media/AdminMedia";
import AdminMediaAdd from "./Admin/Media/AdminMediaAdd";
import AdminContact from "./Admin/Contact/AdminContact";
import AdminContactDetail from "./Admin/Contact/AdminContactDetail";
import AdminCarousel from "./Admin/Carousel/AdminCarousel";
import AdminCarouselAdd from "./Admin/Carousel/AdminCarouselAdd";
import AdminCarouselDetail from "./Admin/Carousel/AdminCarouselDetail";
import AdminCarouselThumbnail from "./Admin/Carousel/AdminCarouselThumbnail";
import AdminLogo from "./Admin/Logo/AdminLogo";
import AdminLogoAdd from "./Admin/Logo/AdminLogoAdd";
import AdminLogoDetail from "./Admin/Logo/AdminLogoDetail";
import AdminLogoThumbnail from "./Admin/Logo/AdminLogoThumbnail";
import authService from "../services/auth.service";

import { UserContext } from "../UserContext";


const BoardAdmin = (props) => {
  const { userLogin } = useContext(UserContext)
  const [isAdmin, setIsAdmin] = useState("")

  useEffect(() => {
    const auth = authService.getCurrentUser()

    if (!auth) {
      props.history.push("/login");
    }
    setIsAdmin(auth.roles.includes("ROLE_ADMIN"))
  }, []);

  return (
    <Router>
      <main>
        <div className="lernen_banner large bg-contact">
          <div className="container">
            <div className="row">
              <div className="lernen_banner_title">
                <h1>Admin Dashboard</h1>
                <h1>Welcome, {userLogin.name}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu isAdmin={isAdmin}/>
            </div>
            <div className="col-md-9">
              <Switch>
                {isAdmin && (
                  <div>
                      <Route exact path={["/admin", "/admin/profile"]} component={Profile} />
                      <Route exact path="/admin/users" component={AdminUsers} />
                      <Route path="/admin/addUser" component={AdminUsersAdd} />
                      <Route path="/admin/users/:id" component={AdminUsersDetail} />
                      <Route exact path="/admin/membership" component={AdminMembership} />
                      <Route path="/admin/addMembership" component={AdminMembershipAdd} />
                      <Route path="/admin/membership/:id" component={AdminMembershipDetail} />
                      <Route exact path="/admin/content" component={AdminContent} />
                      <Route exact path="/admin/addContent" component={AdminContentAdd} />
                      <Route path="/admin/content/:id" component={AdminContentDetail} />
                      <Route exact path="/admin/event" component={AdminEvent} />
                      <Route exact path="/admin/addEvent" component={AdminEventAdd} />
                      <Route path="/admin/event/:id" component={AdminEventDetail} />
                      <Route path="/admin/thumbEvent/:id" component={AdminEventThumbnail} />
                      <Route path="/admin/fileEvent/:id" component={AdminEventFile} />
                      <Route exact path="/admin/article" component={AdminArticle} />
                      <Route exact path="/admin/addArticle/" component={AdminArticleAdd} />
                      <Route exact path="/admin/article/:id" component={AdminArticleDetail} />
                      <Route exact path="/admin/media" component={AdminMedia} />
                      <Route exact path="/admin/addMedia" component={AdminMediaAdd} />
                      <Route exact path="/admin/contact" component={AdminContact} />
                      <Route exact path="/admin/contact/:id" component={AdminContactDetail} />
                      <Route exact path="/admin/carousel" component={AdminCarousel} />
                      <Route exact path="/admin/addCarousel" component={AdminCarouselAdd} />
                      <Route exact path="/admin/carousel/:id" component={AdminCarouselDetail} />
                      <Route exact path="/admin/thumbCarousel/:id" component={AdminCarouselThumbnail} />
                      <Route exact path="/admin/logo" component={AdminLogo} />
                      <Route exact path="/admin/addLogo" component={AdminLogoAdd} />
                      <Route exact path="/admin/logo/:id" component={AdminLogoDetail} />
                      <Route exact path="/admin/thumbLogo/:id" component={AdminLogoThumbnail} />
                  </div>
                )}
              </Switch>
            </div>
          </div>
        </div>
        </div>
      </main>
    </Router>
  );
};

export default BoardAdmin;
