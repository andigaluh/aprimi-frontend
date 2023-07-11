import React from "react"
import { useParams } from 'react-router-dom'
//http://202.159.121.198:8080/uploads/carousel/dscf1321-2000x1333.jpg
const AboutTopic = (props) => {
    let { topicId } = useParams()
    window.scrollTo(0, 500)
    return (
      <div>
        {topicId === "committee" ? (
          <div id="members" className="wrap-bg wrap-bg-dark">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-8">
                  <div className="section-title with-p">
                    <h2>Committee</h2>
                    <div className="bar"></div>
                    <p>
                      All our members are certified and highly qualified, with
                      the majority holding advanced. Our staff also takes part
                      in regular professional development.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/suryantoro_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/suryantoro_250.jpg"
                        }
                        alt="Suryantoro"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Suryantoro, Chartered MCIPD</h5>
                    <span>Chairman</span>
                  </article>
                </div>

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/yoga2_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/yoga2_250.jpg"
                        }
                        alt="Alwin Yogaswara Gunawan, GRP, CCP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Alwin Yogaswara Gunawan, GRP, CCP</h5>
                    <span>Vice Chairman & Operations</span>
                  </article>
                </div>

                {/* <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/adityo2_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/adityo2_250.jpg"
                        }
                        alt="Adityo Nugroho, GRP, CCP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Adityo Nugroho, GRP, CCP</h5>
                    <span>External Relations</span>
                  </article>
                </div>
                
                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/aditia1_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/aditia1_250.jpg"
                        }
                        alt="M. Aditia Eka Putra, ST"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>M. Aditia Eka Putra, ST</h5>
                    <span>External RelationsS</span>
                  </article>
                </div> */}

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/sigit.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/sigit.jpg"
                        }
                        alt="Sigit N. Hadiawan, MBA, GRP, CCP, GPHR"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Sigit N. Hadiawan, MBA, GRP, CCP, GPHR</h5>
                    <span>Advisory</span>
                  </article>
                </div>
                
                {/* <div className="col-sm-3">
                                <article className="item">
                                    <a href={process.env.REACT_APP_API + "/uploads/committee/03.jpg"} className="fancybox"
                                        data-fancybox-group="images_gallery"><img src={process.env.REACT_APP_API + "/uploads/committee/03.jpg"} alt="N. Bayu Atmaji, GRP, CCP" /></a>
                                    <div className="teacher-content">
                                        <div className="teacher-social">
                                            <i className="teacher-icon fa fa-share-alt social-first"></i>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-twitter" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <h5>N. Bayu Atmaji, GRP, CCP</h5>
                                    <span>Advisory</span>
                                </article>
                            </div> */}
                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/annalia3_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/annalia3_250.jpg"
                        }
                        alt="Annalia D. Budi, S.Sos, M.Psi"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Annalia D. Budi, S.Sos, M.Psi</h5>
                    <span>Secretary</span>
                  </article>
                </div>

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/basaria2_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/basaria2_250.jpg"
                        }
                        alt="Basaria Pakpahan, M. Bus, GRP, HRMP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Basaria Pakpahan, M. Bus, GRP, HRMP</h5>
                    <span>Treasury</span>
                  </article>
                </div>

                {/* <div className="col-sm-3">
                                <article className="item">
                                    <a href={process.env.REACT_APP_API + "/uploads/committee/angela_250.jpg"} className="fancybox"
                                        data-fancybox-group="images_gallery"><img src={process.env.REACT_APP_API + "/uploads/committee/angela_250.jpg"} alt="Angela Lisje" /></a>
                                    <div className="teacher-content">
                                        <div className="teacher-social">
                                            <i className="teacher-icon fa fa-share-alt social-first"></i>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-twitter" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <h5>Angela Lisje</h5>
                                    <span>Treasury</span>
                                </article>
                            </div> */}
                {/* <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/yoga2_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/yoga2_250.jpg"
                        }
                        alt="Alwin Yogaswara Gunawan, GRP, CCP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Alwin Yogaswara Gunawan, GRP, CCP</h5>
                    <span>Vice Chairman & Operations</span>
                  </article>
                </div> */}

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/ratna_kusumaningtyas_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/ratna_kusumaningtyas_250.jpg"
                        }
                        alt="Ratna Kusumaningtyas, ST, GRP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Ratna Kusumaningtyas, ST, GRP</h5>
                    <span>Competency Development & Research</span>
                  </article>
                </div>

                {/* <div className="col-sm-3">
                                <article className="item">
                                    <a href={process.env.REACT_APP_API + "/uploads/committee/angdi1_250.jpg"} className="fancybox"
                                        data-fancybox-group="images_gallery"><img src={process.env.REACT_APP_API + "/uploads/committee/angdi1_250.jpg"} alt="Angdisatyara Ramadhana, SE" /></a>
                                    <div className="teacher-content">
                                        <div className="teacher-social">
                                            <i className="teacher-icon fa fa-share-alt social-first"></i>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-twitter" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <h5>Angdisatyara Ramadhana, SE</h5>
                                    <span>Competency & Development</span>
                                </article>
                            </div> */}

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/dianfebrianti_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/dianfebrianti_250.jpg"
                        }
                        alt="Dian Febrianti, ST, GRP, CCP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Dian Febrianti, ST, GRP, CCP</h5>
                    <span>Competency Development & Research</span>
                  </article>
                </div>

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/estie_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/estie_250.jpg"
                        }
                        alt="Dian Febrianti, ST, GRP, CCP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Estie Nurina, S.Sos, M.M.</h5>
                    <span>Competency Development & Research</span>
                  </article>
                </div>

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/andria2_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/andria2_250.jpg"
                        }
                        alt="Andria Rahmawati, SMB, Assoc. CIPD"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Andria Rahmawati, SMB, Assoc. CIPD</h5>
                    <span>Survey Coordinator</span>
                  </article>
                </div>

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/helmi_agustin_250.jpg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/helmi_agustin_250.jpg"
                        }
                        alt="Dian Febrianti, ST, GRP, CCP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Helmi Agustin, SE, MBA</h5>
                    <span>Survey Coordinator</span>
                  </article>
                </div>

                <div className="col-sm-3">
                  <article className="item">
                    <a
                      href={
                        process.env.REACT_APP_API +
                        "/uploads/committee/pandjie.jpeg"
                      }
                      className="fancybox"
                      data-fancybox-group="images_gallery"
                    >
                      <img
                        src={
                          process.env.REACT_APP_API +
                          "/uploads/committee/pandjie.jpeg"
                        }
                        alt="Dian Febrianti, ST, GRP, CCP"
                      />
                    </a>
                    <div className="teacher-content">
                      <div className="teacher-social">
                        <i className="teacher-icon fa fa-share-alt social-first"></i>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-twitter" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i className="fab fa-linkedin" aria-hidden="true"></i>
                        </a>
                        <a href="#" className="teacher-icon social-link">
                          <i
                            className="fab fa-instagram"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                    </div>
                    <h5>Pandji Dwiana Merizka, M.Psi</h5>
                    <span>Survey Coordinator</span>
                  </article>
                </div>

                {/* <div className="col-sm-3">
                                <article className="item">
                                    <a href={process.env.REACT_APP_API + "/uploads/committee/ardhian1_250.jpg"} className="fancybox"
                                        data-fancybox-group="images_gallery"><img src={process.env.REACT_APP_API + "/uploads/committee/ardhian1_250.jpg"} alt="Ardhian Pratama, SE, CHRP, GRP, CCP" /></a>
                                    <div className="teacher-content">
                                        <div className="teacher-social">
                                            <i className="teacher-icon fa fa-share-alt social-first"></i>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-twitter" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <h5>Ardhian Pratama, SE, CHRP, GRP, CCP</h5>
                                    <span>IT & Communication</span>
                                </article>
                            </div> */}

                {/* <div className="col-sm-3">
                                <article className="item">
                                    <a href={process.env.REACT_APP_API + "/uploads/committee/aprabowo2_250.jpg"} className="fancybox"
                                        data-fancybox-group="images_gallery"><img src={process.env.REACT_APP_API + "/uploads/committee/aprabowo2_250.jpg"} alt="Agus Prabowo, ST, MM" /></a>
                                    <div className="teacher-content">
                                        <div className="teacher-social">
                                            <i className="teacher-icon fa fa-share-alt social-first"></i>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-facebook"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-twitter" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                            <a href="#" className="teacher-icon social-link">
                                                <i className="fab fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <h5>Agus Prabowo, ST, MM</h5>
                                    <span>Competency Development & Research</span>
                                </article>
                            </div> */}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="about-title">
              <h4>{props.title}</h4>
            </div>
            <div className="about-content">
              <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
            </div>
          </div>
        )}
      </div>
    );
}

export default AboutTopic;