import React, {  useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserMenu from "./UserMenu"
import EditProfile from "./Profile/EditProfile"
import UserProfile from "./Profile/UserProfile"
import ChangePassword from "./Profile/ChangePassword"
import { UserContext } from "../../UserContext";
import TrainingCertificationHistory from "./TrainingCertification/TrainingCertificationHistory";
import TrainingCertficationConfirm from "./TrainingCertification/TrainingCertficationConfirm";
import Contact from './Contact/Contact'
import Agenda from "./Agenda/Agenda";
import authService from "../../services/auth.service";
import ArticleByUser from "./Article/ArticleByUser";
import AddArticleByUser from "./Article/AddArticleByUser";
import EditArticleByUser from "./Article/EditArticleByUser";
import Media from "./Media/Media"
import Calendar from "./Agenda/Calendar";

const BoardUser = (props) => {
  const { userLogin } = useContext(UserContext)
  const [isKomite, setIsKomite] = useState("")
  
  useEffect(()=> {
    const auth = authService.getCurrentUser()
    if (!auth) {
      props.history.push("/login");
    }
    setIsKomite(auth.roles.includes("ROLE_KOMITE"))
  },[])

  return (
    <Router>
      <main>
          <div className="lernen_banner large bg-contact">
            <div className="container">
              <div className="row">
                <div className="lernen_banner_title">
                  <h1>Welcome {userLogin.name},</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap-bg">
            <div className="container">
              <div className="row">
                <div className="col-md-2 col-lg-2">
                  <UserMenu isKomite={isKomite}/>
                </div>
                <div className="col-md-10 col-lg-10">
                  <Switch>
                    <Route exact path={"/user"} component={UserProfile} />
                    <Route path={"/user/profile"} component={EditProfile} />
                    <Route path={"/user/changePassword"} component={ChangePassword} />
                    <Route path={"/user/TrainingCertificationHistory"} component={TrainingCertificationHistory} />
                    <Route path={"/user/TrainingCertificationConfirm/:id/:title"} component={TrainingCertficationConfirm} />
                    <Route path={"/user/contact"} component={Contact} />
                    <Route path={"/user/agenda"} component={Calendar} />
                    {isKomite && (
                      <div>
                        <Route path={"/user/article"} component={ArticleByUser} />
                        <Route path={"/user/addArticle"} component={AddArticleByUser} />
                        <Route path={"/user/editArticle/:id"} component={EditArticleByUser} />
                        <Route path={"/user/media"} component={Media} />
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

export default BoardUser;
