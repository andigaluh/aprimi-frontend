import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import JoditEditor from "jodit-react";
import {
  Container,
  Row,
  Col,
  Alert,
  FormGroup,
  Label,
  UncontrolledAlert,
} from "reactstrap";
import ArticleServices from '../../../services/ArticleServices';

const required = (value) => {
  if (!value) {
    return (
      <Alert>
        This field is required!
      </Alert>
    );
  }
};

const AddArticleByUser = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [inputTitle, setInputTitle] = useState("")
    const [inputHeadline, setInputHeadline] = useState("")
    const [inputNewsCategoryId] = useState(1)
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const config = {
      minHeight: 500,
    };

    const onChangeInputTitle = (e) => {
        const v = e.target.value
        setInputTitle(v)
    }

    const onChangeInputHeadline = (e) => {
      const v = e.target.value;
      setInputHeadline(v);
    };

    const handleInput = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            console.log('process')
            var data = {
              title: inputTitle,
              headline: inputHeadline,
              content: content,
              news_category_id: inputNewsCategoryId,
            };
            ArticleServices.createByMe(data).then(
              (response) => {
                console.log(response);
                setMessage("Your data successfully submit");
                setSuccessful(true);
                console.log(response)
              },
              (error) => {
                const _content =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();

                setSuccessful(false)
                setMessage(_content);
                console.log(_content);
              }
            );
        } else {
            console.log('no process')
        }
        
    }

    return (
      <Container>
        <Row>
          <Col>
            <h4>Add Article By User</h4>
            <hr />
            {message && (
              <FormGroup>
                <UncontrolledAlert color={successful ? "success" : "danger"}>
                  {message}
                </UncontrolledAlert>
              </FormGroup>
            )}
            <Form onSubmit={handleInput} ref={form}>
              {!successful && (
                <div>
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={inputTitle}
                      onChange={onChangeInputTitle}
                      validations={[required]}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="headline">Headline</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="headline"
                      name="headline"
                      value={inputHeadline}
                      onChange={onChangeInputHeadline}
                      validations={[required]}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="content">Content</Label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      onBlur={(ContentBaru) => setContent(ContentBaru)}
                      name="content"
                      config={config}
                    />
                  </FormGroup>
                  <FormGroup>
                    <button type="submit" className="color-two button">
                      Submit
                    </button>
                  </FormGroup>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </Col>
        </Row>
      </Container>
    );
}

export default AddArticleByUser;