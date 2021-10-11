import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Header, Icon, Message } from "semantic-ui-react";
import { useAuthState } from "../context/auth";
import { APIClient } from "../utils/APIClient";

import { useForm } from "../utils/hooks";

const initialValue = {
  email: "",
  password: "",
};

export const Login = (props) => {
  const { error, setError, value, handleSubmit, handleInput } = useForm(
    initialValue,
    handleLoginUser
  );
  const [togglePassword, setTogglePassword] = useState(false);

  const { login } = useAuthState();
  const [loading, setLoading] = useState(false);

  function handleLoginUser() {
    setLoading(true);
    APIClient.post("/auth/login", {
      email: value.email,
      password: value.password,
    })
      .then((res) => {
        const { data } = res;
        setLoading(false);
        login(data);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error?.response?.status === 400 ||
          error?.response?.status === 404
        ) {
          return setError(error?.response?.data);
        }
        setError({ error: error.message });
      });
  }

  return (
    <Grid verticalAlign="middle" style={{ height: "70vh" }}>
      <Grid.Column>
        <Card raised fluid style={{ maxWidth: 700, margin: "auto" }}>
          <Card.Content>
            <div style={{ textAlign: "center" }}>
              <Icon name="user" size="huge" />
            </div>
            <Header textAlign="center" content="Login to Account" size="huge" />
            <Form
              autoComplete="true"
              onSubmit={handleSubmit}
              noValidate
              loading={loading}
              success={false}
              error={!!Object.keys(error).length}
              size="big"
            >
              <Message success header="Success" content="Login successful" />

              <Form.Input
                type="text"
                name="email"
                placeholder="Your email"
                icon="user"
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

              <Form.Button content="Login" fluid size="large" color="green" />

              <Message error header="Fix all errors" content={error.error} />
            </Form>
            <p style={{ marginTop: 30, textAlign: "center" }}>
              Not a member? <Link to="/register">Sign up now</Link>
            </p>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
};
