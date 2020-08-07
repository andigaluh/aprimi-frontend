import React, { useState } from "react"
import ContactService from "../../../services/ContactServices"

const Contact = () => {
  const initialState = {
    id: null,
    name: "",
    email: "",
    subject: "",
    message: "",
    is_read: 0
  }

  const [currentContact, setCurrentContact] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [errorTitle, setErrorTitle] = useState(false)
  const [errorTitleMsg, setErrorTitleMsg] = useState("")

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCurrentContact({...currentContact, [name]: value})
    setErrorTitle(false)
  }

  const saveContact = () => {
    var data = {
      name: currentContact.name,
      email: currentContact.email,
      subject: currentContact.subject,
      message: currentContact.message,
      is_read: 0
    }

    ContactService.createMsg(data).then(
      () => {
        setCurrentContact(initialState)
        setErrorTitle(false)
        setSubmitted(true)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrorTitle(true)
        setErrorTitleMsg(_content)
        }
    )
  }

    return (
      <main>
        <div className="lernen_banner large bg-contact">
          <div className="container">
            <div className="row">
              <div className="lernen_banner_title">
                <h1>Contact</h1>
                <div className="lernen_breadcrumb">
                  <div className="breadcrumbs">
                    <span className="first-item">
                      <a href="index.html">Homepage</a>
                    </span>
                    <span className="separator">&gt;</span>
                    <span className="last-item">Contact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="contact" className="wrap-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="dreidbgleft">
                  <img
                    src={
                      process.env.REACT_APP_API +
                      "/uploads/news/thumbnail/default-2.jpg"
                    }
                    alt="Contact form"
                  />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <form
                  className="themeioan-form-contact form"
                  id=""
                >
                  {submitted ? (
                   <div>
                      <h4>Your contact submitted successfully!</h4>
                   </div> 
                  ) : (
                    <div></div>
                  )}
                  <div>
                    <input
                      className="input-text required-field"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      title="Your Full Name"
                      required
                      value={currentContact.name}
                      onChange={handleInputChange}
                    />
                    {errorTitle ? (
                      <div><p>{errorTitleMsg}</p></div>
                    ) : ( <div></div>)}
                  </div>
                  <div>
                    <input
                      className="input-text required-field email-field"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      title="Your Email"
                      required
                      value={currentContact.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      className="input-text required-field"
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      title="Your Subject"
                      required
                      value={currentContact.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <textarea
                      className="input-text required-field"
                      name="message"
                      id="message"
                      placeholder="Message"
                      title="Your Message"
                      required
                      value={currentContact.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <input
                    className="color-two button"
                    type="button"
                    value="Send Message"
                    onClick={saveContact}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="themeioan_contact_map">
            <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24165.439839909446!2d-73.96573300822483!3d40.79104913796133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2588f046ee661%3A0xa0b3281fcecc08c!2sManhattan%2C%20New%20York%20City%2C%20New%20York%2C%20USA!5e0!3m2!1sde!2sat!4v1566634235404!5m2!1sde!2sat" width="600" height="450" style="border:0;" allowfullscreen=""></iframe>
            </p>
        </div> */}
      </main>
    );
}

export default Contact;