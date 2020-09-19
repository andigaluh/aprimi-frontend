import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import MembershipService from "../../../services/CompanyServices"
import { Container, Row, Col, FormGroup, Label } from "reactstrap"
import MembershipHeader from "./MembershipHeader";
import { PDFDownloadLink } from '@react-pdf/renderer'
import PdfGenerateFile from "./PdfGenerateFile";
import { Link } from 'react-router-dom';

const YEAR_NOW = new Date().getFullYear();

const Membership = () => {

  const required = (value) => {
    if (!value) {
      return (
        <p className="text-danger">
          This field is required!
        </p>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <p className="text-danger">
          This is not a valid email.
        </p>
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
  const [isLoading, setIsLoading] = useState(false);
  const [pdfVersion, setPdfVersion] = useState(false);
  const [namePdf, setNamePdf] = useState("");
  const [addressPdf, setAddressPdf] = useState("");
  const [phonePdf, setPhonePdf] = useState("");
  const [faxPdf, setFaxPdf] = useState("");
  const [contact_person_namePdf, setContact_person_namePdf] = useState("");
  const [contact_person_titlePdf, setContact_person_titlePdf] = useState("");
  const [contact_person_phonePdf, setContact_person_phonePdf] = useState("");
  const [contact_person_emailPdf, setContact_person_emailPdf] = useState("");
  const [authorized_namePdf, setAuthorized_namePdf] = useState("");
  const [authorized_titlePdf, setAuthorized_titlePdf] = useState("");
  const [idMembership, setIdMembership] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value
    setName(name)
    setNamePdf(name)
  }

  const onChangeAddress = (e) => {
    const address = e.target.value
    setAddress(address)
    setAddressPdf(address)
  }

  const onChangePhone = (e) => {
    const phone = e.target.value
    setPhone(phone)
    setPhonePdf(phone)
  }

  const onChangeFax = (e) => {
    const fax = e.target.value
    setFax(fax)
    setFaxPdf(fax)
  }

  const onChangeContactPersonName = (e) => {
    const ContactPersonName = e.target.value
    setContact_person_name(ContactPersonName)
    setContact_person_namePdf(ContactPersonName)
  }

  const onChangeContactPersonTitle = (e) => {
    const ContactPersonTitle = e.target.value
    setContact_person_title(ContactPersonTitle)
    setContact_person_titlePdf(ContactPersonTitle)
  }

  const onChangeContactPersonPhone = (e) => {
    const ContactPersonPhone = e.target.value
    setContact_person_phone(ContactPersonPhone)
    setContact_person_phonePdf(ContactPersonPhone)
  }

  const onChangeContactPersonEmail = (e) => {
    const ContactPersonEmail = e.target.value
    setContact_person_email(ContactPersonEmail)
    setContact_person_emailPdf(ContactPersonEmail)
  }

  const onChangeAuthorizedName = (e) => {
    const AuthorizedName = e.target.value
    setAuthorized_name(AuthorizedName)
    setAuthorized_namePdf(AuthorizedName)
  }

  const onChangeAuthorizedTitle = (e) => {
    const AuthorizedTitle = e.target.value
    setAuthorized_title(AuthorizedTitle)
    setAuthorized_titlePdf(AuthorizedTitle)
  }

  const handleRegister = (e) => {
    e.preventDefault()

    setMessage("")
    setSuccessful(false)
    setIsLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
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
          setMessage(`Data ${response.data.name} successfully submitted`);
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
          setIdMembership(response.data.id);
          console.log(response.data.id);
          setIsLoading(false);
          setPdfVersion(true);

        },
        (error) => {
          console.log(`response error: ${error}`)
          setSuccessful(false);
          setIsLoading(false);
        }
      ).catch((error) => {
        console.log(`catch error: ${error}`)
        setSuccessful(false);
        setIsLoading(false);
      })
    } else {
      console.log(`no process`)
      setSuccessful(false);
      setIsLoading(false);
    }
  }

  return (
    <main>
      <MembershipHeader />

      <div id="membership-registration" className="wrap-bg">
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              {message && (
                <div className="text-center">
                  <h4>Membership registration notification</h4>
                  <hr />
                  <FormGroup>
                    <div
                      className={
                        successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      }
                      role="alert"
                    >
                      {message}
                    </div>
                  </FormGroup>
                  {pdfVersion && (
                    <FormGroup>
                      <h4>please download the pdf file below : </h4>
                      <PDFDownloadLink document={
                        <PdfGenerateFile
                          namePdf={namePdf}
                          addressPdf={addressPdf}
                          phonePdf={phonePdf}
                          faxPdf={faxPdf}
                          contact_person_namePdf={contact_person_namePdf}
                          contact_person_titlePdf={contact_person_titlePdf}
                          contact_person_phonePdf={contact_person_phonePdf}
                          contact_person_emailPdf={contact_person_emailPdf}
                          authorized_namePdf={authorized_namePdf}
                          authorized_titlePdf={authorized_titlePdf}
                          returnDate={process.env.REACT_APP_RETURN_DATE_PDF_MEMBERSHIP}
                          logo_path={process.env.REACT_APP_LOGO_PATH}
                          year_now={YEAR_NOW}
                          secretarial_address={process.env.REACT_APP_SECRETARIAL_ADDRESS}
                          return_date_pdf_membership={process.env.REACT_APP_RETURN_DATE_PDF_MEMBERSHIP}
                          title_pdf_membership={process.env.REACT_APP_TITLE_PDF_MEMBERSHIP}
                          subtitle_pdf_membership={process.env.REACT_APP_SUBTITLE_PDF_MEMBERSHIP}
                          content_pdf_membership={process.env.REACT_APP_CONTENT_PDF_MEMBERSHIP}
                          text_company_details={process.env.REACT_APP_TEXT_COMPANY_DETAILS}
                          footer_pdf_membership={process.env.REACT_APP_FOOTER_PDF_MEMBERSHIP}
                          idMembership={idMembership}
                        />
                      } fileName={`${namePdf}.pdf`}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : (<button>Download now!</button>))}
                      </PDFDownloadLink>
                    </FormGroup>
                  )}
                </div>
              )}
              <Form onSubmit={handleRegister} ref={form}>
                {!successful && (
                  <div>
                    <h4>Aprimi Participation {YEAR_NOW}</h4>
                    <hr />
                    <p>Please fill in form below and submit it. after submit please download the pdf file, signed it and you can upload it on this <Link to={'/membership-confirmation'} className="color-blue">LINK</Link></p>
                    <FormGroup>
                      <Label for="name">Company Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="address"
                        value={address}
                        onChange={onChangeAddress}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={phone}
                        onChange={onChangePhone}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="fax">Fax</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="fax"
                        value={fax}
                        onChange={onChangeFax}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="contact_person_name">
                        Contact Person Name
                        </Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="contact_person_name"
                        value={contact_person_name}
                        onChange={onChangeContactPersonName}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="contact_person_title">
                        Contact Person Title
                        </Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="contact_person_title"
                        value={contact_person_title}
                        onChange={onChangeContactPersonTitle}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="contact_person_phone">
                        Contact Person Phone
                        </Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="contact_person_phone"
                        value={contact_person_phone}
                        onChange={onChangeContactPersonPhone}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="contact_person_email">
                        Contact Person Email
                        </Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="contact_person_email"
                        value={contact_person_email}
                        onChange={onChangeContactPersonEmail}
                        validations={[required, validEmail]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="authorized_name">Authorized Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="authorized_name"
                        value={authorized_name}
                        onChange={onChangeAuthorizedName}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="authorized_title">Authorized Title</Label>
                      <Input
                        type="text"
                        className="form-control"
                        name="authorized_title"
                        value={authorized_title}
                        onChange={onChangeAuthorizedTitle}
                        validations={[required]}
                      />
                    </FormGroup>

                    <FormGroup className="text-center">
                      <button
                        type="submit"
                        className="color-two button"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>
                            <span className="spinner-border spinner-border-sm"></span>
                              Please wait
                          </span>
                        ) : (
                            <span>Sign Up</span>
                          )}
                      </button>
                    </FormGroup>
                  </div>
                )}

                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  );
}

export default Membership