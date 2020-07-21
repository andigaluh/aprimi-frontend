import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link } from "react-router-dom"

import MembershipService from "../../../services/CompanyServices"

const Membership = () => {

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    };

    const validEmail = (value) => {
        if (!isEmail(value)) {
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid email.
                </div>
            );
        }
    };

    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [fax, setFax] = useState("");
    const [contact_person_name, setContact_person_name] = useState("");
    const [contact_person_title, setContact_person_title] = useState("");
    const [contact_person_phone, setContact_person_phone] = useState("");
    const [contact_person_email, setContact_person_email] = useState("");
    const [authorized_name, setAuthorized_name] = useState("");
    const [authorized_title, setAuthorized_title] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeName = (e) => {
        const name = e.target.value
        setName(name)
    }

    const onChangeAddress = (e) => {
        const address = e.target.value
        setAddress(address)
    }

    const onChangePhone = (e) => {
        const phone = e.target.value
        setPhone(phone)
    }

    const onChangeFax = (e) => {
        const fax = e.target.value
        setFax(fax)
    }

    const onChangeContactPersonName = (e) => {
        const ContactPersonName = e.target.value
        setContact_person_name(ContactPersonName)
    }

    const onChangeContactPersonTitle = (e) => {
        const ContactPersonTitle = e.target.value
        setContact_person_title(ContactPersonTitle)
    }
    
    const onChangeContactPersonPhone = (e) => {
        const ContactPersonPhone = e.target.value
        setContact_person_phone(ContactPersonPhone)
    }

    const onChangeContactPersonEmail = (e) => {
        const ContactPersonEmail = e.target.value
        setContact_person_email(ContactPersonEmail)
    }

    const onChangeAuthorizedName = (e) => {
        const AuthorizedName = e.target.value
        setAuthorized_name(AuthorizedName)
    }

    const onChangeAuthorizedTitle = (e) => {
        const AuthorizedTitle = e.target.value
        setAuthorized_title(AuthorizedTitle)
    }

    const handleRegister = (e) => {
        e.preventDefault()

        setMessage("")
        setSuccessful(false)

        form.current.validateAll()

        if (checkBtn.current.context._errors.length === 0) {
            console.log(`process`)
            var data = {
                name,
                address,
                phone,
                fax,
                contact_person_name,
                contact_person_title,
                contact_person_phone,
                contact_person_email,
                authorized_name,
                authorized_title
            }
            MembershipService.create(data).then(
                (response) => {
                    window.scrollTo(0, 0)
                    setMessage(`Data ${response.data.name} successfully submitted. Thank you`);
                    setSuccessful(true);
                    setName("");
                    setAddress("");
                    setPhone("");
                    setFax("");
                    setContact_person_name("");
                    setContact_person_title("");
                    setContact_person_phone("");
                    setContact_person_email("");
                    setAuthorized_name("");
                    setAuthorized_title("");
                    console.log(`response: ${response}`)
                },
                (error) => {
                    console.log(`response error: ${error}`)
                    setSuccessful(false);
                }
            ).catch((error) => {
                console.log(`catch error: ${error}`)
                setSuccessful(false);
            })
        } else {
            console.log(`no process`)
            setSuccessful(false);
        }
    }
    


    return (
        <main>

            <div className="lernen_banner large bg-contact">
                <div className="container">
                    <div className="row">
                        <div className="lernen_banner_title">
                            <h1>Company membership registration</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div id="membership-registration" className="wrap-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <Form onSubmit={handleRegister} ref={form}>
                                {!successful && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="name">Company Name</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={name}
                                                onChange={onChangeName}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                value={address}
                                                onChange={onChangeAddress}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="phone"
                                                value={phone}
                                                onChange={onChangePhone}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="fax">Fax</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="fax"
                                                value={fax}
                                                onChange={onChangeFax}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="contact_person_name">Contact Person Name</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="contact_person_name"
                                                value={contact_person_name}
                                                onChange={onChangeContactPersonName}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="contact_person_title">Contact Person Title</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="contact_person_title"
                                                value={contact_person_title}
                                                onChange={onChangeContactPersonTitle}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="contact_person_phone">Contact Person Phone</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="contact_person_phone"
                                                value={contact_person_phone}
                                                onChange={onChangeContactPersonPhone}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="contact_person_email">Contact Person Email</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="contact_person_email"
                                                value={contact_person_email}
                                                onChange={onChangeContactPersonEmail}
                                                validations={[required, validEmail]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="authorized_name">Authorized Name</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="authorized_name"
                                                value={authorized_name}
                                                onChange={onChangeAuthorizedName}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="authorized_title">Authorized Title</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="authorized_title"
                                                value={authorized_title}
                                                onChange={onChangeAuthorizedTitle}
                                                validations={[required]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="color-two button">Sign Up</button>
                                        </div>
                                    </div>
                                )}

                                
                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                        </div>
                    </div>
                </div>

            </div>


        </main>
    )
}

export default Membership