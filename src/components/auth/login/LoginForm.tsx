import { Formik, Field, Form, FormikHelpers } from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { extraLoginUser, loginUser } from "../../../axios/authOperations";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../axios/selectors";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";

interface Values {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = useSelector(selectAllUsers);
  //   console.log(users.map((user) => user.username));

  const checkValues = () => {
    if (username.length === 0) return;
    if (password.length === 0) return;

    dispatch(
      loginUser({
        username: username,
        password: password,
      })
    );

    dispatch(
      extraLoginUser({
        username: username,
        password: password,
      })
    );
  };

  return (
    <div>
      <DropdownButton
        id="dropdown-button"
        title="Login accounts"
        className="mb-2 btn-dark"
      >
        <Dropdown.Menu
          className="dropdown-menu"
          style={{ height: "16vh", overflowY: "scroll" }}
        >
          {users.map((user) => (
            <Dropdown.Item
              key={user.id}
              onClick={() => {
                setUsername(user.username);
                setPassword(user.password);
              }}
            >
              {user.username}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </DropdownButton>

      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        // validationSchema={validationSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          checkValues();
          setSubmitting(false);
        }}
      >
        <Form>
          <InputGroup>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <Field
                id="username"
                name="username"
                className="form-control"
                placeholder="username"
                value={username}
                readOnly
              />
            </div>
          </InputGroup>

          <InputGroup>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text h-100">
                  <RiLockPasswordFill />
                </div>
              </div>
              <Field
                id="password"
                name="password"
                placeholder="password"
                type="password"
                className="form-control"
                value={password}
                readOnly
              />
            </div>
          </InputGroup>

          <div className="d-flex justify-content-center ">
            <button type="submit" className="border rounded">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
