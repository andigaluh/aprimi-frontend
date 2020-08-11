import React from "react"
import {useParams} from 'react-router-dom'

const AboutTopic = (props) => {
    let { topicId } = useParams()
    return(
        <div>
            {(topicId === 'committee') ? (
                <div id="members" className="wrap-bg wrap-bg-dark">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <div className="section-title with-p">
                                    <h2>Committee</h2>
                                    <div className="bar"></div>
                                    <p>
                                        All our members are certified and highly qualified, with the majority holding advanced. Our staff also takes part in regular professional development.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/adityo2_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/adityo2_250.jpg" alt="Image 1" /></a>
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
                                    <h5>Adityo Nugroho, GRP, CCP</h5>
                                    <span>Chairman</span>
                                </article>
                            </div>
                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/aditia1_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/aditia1_250.jpg" alt="Image 2" /></a>
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
                                    <h5>M. Aditia Eka Putra, ST</h5>
                                    <span>V. Chairman & Operation</span>
                                </article>
                </div>
                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/sigit.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/sigit.jpg" alt="Image 3" /></a>
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
                                    <h5>Sigit N. Hadiawan, MBA, GRP, CCP, GPHR</h5>
                                    <span>Advisory</span>
                                </article>
                            </div>
                            <div className="col-sm-3">
                                <article className="item">
                                <a href="http://aprimi.org/assets/theme/img/committee/250x250/03.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/03.jpg" alt="Image 4" /></a>
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
                            </div>
                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/annalia3_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/annalia3_250.jpg" alt="Image 1" /></a>
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
                                    <h5>Annalia D. Budi, S.Sos, M.Psi</h5>
                                    <span>Secretary</span>
                                </article>
                            </div>
                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/angela_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/angela_250.jpg" alt="Image 1" /></a>
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
                            </div>
                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/yoga2_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/yoga2_250.jpg" alt="Image 1" /></a>
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
                                    <h5>Alwin Yogaswara Gunawan, GRP, CCP</h5>
                                    <span>Survey Coordinator</span>
                                </article>
                            </div>
                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/suryantoro_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/suryantoro_250.jpg" alt="Image 1" /></a>
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
                                    <h5>Suryantoro</h5>
                                    <span>Survey Coordinator</span>
                                </article>
                            </div>


                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/andria2_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/andria2_250.jpg" alt="Image 1" /></a>
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
                                    <h5>Andria Rahmawati, SMB, Assoc. CIPD</h5>
                                    <span>Survey Coordinator</span>
                                </article>
                            </div>

                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="/assets/images/content/team/1.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="/assets/images/content/team/1.jpg" alt="Image 1" /></a>
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
                                    <h5>Ratna Kusumaningtyas, ST, GRP</h5>
                                    <span>Competency Development</span>
                                </article>
                            </div>


                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/angdi1_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/angdi1_250.jpg" alt="Image 1" /></a>
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
                            </div>


                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/dianfebrianti_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/dianfebrianti_250.jpg" alt="Image 1" /></a>
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
                                    <h5>Dian Febrianti, ST, GRP, CCP</h5>
                                    <span>Research & External Relations</span>
                                </article>
                            </div>


                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/basaria2_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/basaria2_250.jpg" alt="Image 1" /></a>
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
                                    <h5>Basaria Pakpahan, M. Bus, GRP, HRMP</h5>
                                    <span>Research & External Relations</span>
                                </article>
                            </div>

                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/ardhian1_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/ardhian1_250.jpg" alt="Image 1" /></a>
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
                            </div>

                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/ardhian1_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/ardhian1_250.jpg" alt="Image 1" /></a>
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
                            </div>

                            <div className="col-sm-3">
                                <article className="item">
                                    <a href="http://aprimi.org/assets/theme/img/committee/250x250/aprabowo2_250.jpg" className="fancybox"
                                        data-fancybox-group="images_gallery"><img src="http://aprimi.org/assets/theme/img/committee/250x250/aprabowo2_250.jpg" alt="Image 1" /></a>
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
                                    <span>IT & Communication</span>
                                </article>
                            </div>
                        
                        
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="about-title">
                        <h4>{props.title}</h4>
                    </div >
                    <div className="about-content">
                        <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
                    </div>
                </div>
            )}
            
        </div >
    )
}

export default AboutTopic;