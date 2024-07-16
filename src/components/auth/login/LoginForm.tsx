import { Formik, Field, Form } from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAppDispatch } from "../../../hooks/useDispatch";
import { extraLoginUser, loginUser } from "../../../axios/auth/authOperations";
import { useSelector } from "react-redux";

import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { useState } from "react";
import { getUserCart } from "../../../axios/cart/cartOperations";
import {
  selectAllUsers,
  selectIsLoading,
} from "../../../axios/auth/authSelectors";
import toast from "react-hot-toast";

type Prop = {
  onClose: () => void;
};

export const LoginForm = ({ onClose }: Prop) => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = useSelector(selectAllUsers);
  const userLoading = useSelector(selectIsLoading);

  const checkValues = () => {
    if (username.length === 0 || password.length === 0)
      return toast.error("All fields are required!");

    dispatch(loginUser({ username, password }));
    dispatch(extraLoginUser({ username, password }));

    const user = users.find((user) => user.username === username);
    if (user) {
      onClose();
      dispatch(getUserCart(user.id));
      toast.success("You are logged in!");
    }
  };

  return (
    <div>
      <DropdownButton
        key="primary"
        id={`dropdown-variants-primary`}
        variant="primary"
        title="Login user"
      >
        <Dropdown.Menu style={{ height: "16vh", overflowY: "scroll" }}>
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
          username: username,
          password: password,
        }}
        onSubmit={() => {
          checkValues();
        }}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
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
            {errors.username && touched.username ? (
              <p className="text-danger">{errors.username}</p>
            ) : null}

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
            {errors.password && touched.password ? (
              <p className="text-danger"> {errors.password} </p>
            ) : null}

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="border rounded btn btn-dark"
                disabled={userLoading}
              >
                {userLoading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  <></>
                )}
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
