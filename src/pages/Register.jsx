import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Header, Icon, Message } from "semantic-ui-react";
import { APIClient } from "../utils/APIClient";
import { useForm } from "../utils/hooks";

const initialValue = {
  firstName: "",
  lastName: "",
  password: "",
  email: "",
};

export const Register = (props) => {
  const { error, setError, value, handleSubmit, handleInput } = useForm(
    initialValue,
    handleRegisterUser
  );
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleRegisterUser() {
    setLoading(true);
    APIClient.post("/auth/register", {
      email: value.email,
      password: value.password,
      firstName: value.firstName,
      lastName: value.lastName,
    })
      .then(() => {
        setLoading(false);
        props.history.push("/login");
      })
      .catch((error) => {
        if (
          error?.response?.status === 400 ||
          error?.response?.status === 404
        ) {
          return setError(error?.response?.data);
        }
        setLoading(false);
        setError({ error: error.message });
      });
  }
  return (
    <div>
      <Grid verticalAlign="middle" style={{ height: "70vh" }}>
        <Grid.Column>
          <Card raised fluid style={{ maxWidth: 700, margin: "auto" }}>
            <Card.Content>
              <div style={{ textAlign: "center" }}>
                <Icon name="user plus" size="huge" />
              </div>
              <Header
                textAlign="center"
                content="Register for a new Account"
                size="huge"
              />

              <Form
                autoComplete="true"
                onSubmit={handleSubmit}
                noValidate
                loading={loading}
                success={false}
                error={!!Object.keys(error).length}
                size="big"
              >
                <Message success header="Success" content="Sign up completed" />

                <Form.Group widths="equal">
                  <Form.Input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    icon="user"
                    error={error.firstName}
                    value={value.firstName}
                    onChange={handleInput}
                    label="First name"
                    required={!!error.firstName}
                  />
                  <Form.Input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    icon="user"
                    error={error.lastName}
                    value={value.lastName}
                    onChange={handleInput}
                    label="Last name"
                    required={!!error.lastName}
                  />
                </Form.Group>
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  icon="mail"
                  error={error.email}
                  value={value.email}
                  onChange={handleInput}
                  label="Email"
                  required={!!error.email}
                />
                <Form.Input
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  placeholder="Your password"
                  icon={
                    <Icon
                      link
                      name={togglePassword ? "eye" : "eye slash"}
                      onClick={(e) => setTogglePassword(!togglePassword)}
                    />
                  }
                  error={error.password}
                  value={value.password}
                  onChange={handleInput}
                  label="Password"
                  required={!!error.password}
                />

                <Form.Button
                  content="Submit"
                  fluid
                  size="large"
                  color="green"
                />

                <Message error header="Fix all errors" content={error.error} />
              </Form>

              <p style={{ marginTop: 30, textAlign: "center" }}>
                Already have an Account?{" "}
                <Link to="/login">Login to your Account</Link>
              </p>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};
