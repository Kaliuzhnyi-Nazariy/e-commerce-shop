import { Formik, Field, Form, FormikHelpers } from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import { TbWorldLatitude, TbWorldLongitude, TbZip } from "react-icons/tb";
import { FaCity, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { SiGooglestreetview } from "react-icons/si";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import * as Yup from "yup";
import { useAppDispatch } from "../../../hooks/useDispatch";
import {
  createUser,
  getAllUsers,
  loginUser,
} from "../../../axios/authOperations";

interface Values {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  number: number;
  zipCode: string;
  lat: string;
  long: string;
  phone: string;
}

const passwordValidation =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required!"),
  username: Yup.string().min(3).required("Username is obvious!"),
  password: Yup.string()
    .min(8)
    .max(16)
    .matches(
      passwordValidation,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required!"),
  firstName: Yup.string().min(3).required("First name is required!"),
  lastName: Yup.string().min(3).required("Last name is required!"),
  city: Yup.string().min(2).required("City is required!"),
  street: Yup.string().min(2).required("Street is required!"),
  zipCode: Yup.string().min(3).required("Zip-code is required!"),
  lat: Yup.string().min(2).required("Latitude is required!"),
  long: Yup.string().min(2).required("Longitude is required!"),
  phone: Yup.number()
    .required("Required")
    .min(7, "Must have 7 numbers")
    .integer("A phone number can't include a decimal point")
    .min(7, "Must have 7 numbers"),
});

export const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const checkValues = (values: Values) => {
    if (values.email.length === 0) return;
    if (values.username.length === 0) return;
    if (values.password.length === 0) return;
    if (values.firstName.length === 0) return;
    if (values.lastName.length === 0) return;
    if (values.city.length === 0) return;
    if (values.street.length === 0) return;
    if (values.number === 0) return;
    if (values.zipCode.length === 0) return;
    if (values.lat.length === 0) return;
    if (values.long.length === 0) return;
    if (values.phone.length === 0) return;

    dispatch(getAllUsers());

    dispatch(
      createUser({
        email: values.email,
        username: values.username,
        password: values.password,
        name: { firstname: values.firstName, lastname: values.lastName },
        address: {
          city: values.city,
          street: values.street,
          number: values.number,
          zipcode: values.zipCode,
          geolocation: {
            lat: values.lat,
            long: values.long,
          },
        },
        phone: values.phone,
      })
    );

    dispatch(
      loginUser({
        username: values.username,
        password: values.password,
      })
    );
  };

  return (
    <div
      style={{
        height: "75vh",
        overflowY: "scroll",
        margin: "8px",
      }}
    >
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          city: "",
          street: "",
          number: 0,
          zipCode: "",
          lat: "",
          long: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          checkValues(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="col-auto">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <MdEmail />
                  </div>
                </div>
                <Field
                  id="email"
                  name="email"
                  placeholder="john@acme.com"
                  type="email"
                  className="form-control"
                />
              </div>
            </div>
            {errors.email && touched.email ? (
              <div className="text-danger">{errors.email}</div>
            ) : null}

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
                />
              </div>
            </InputGroup>

            {errors.username && touched.username ? (
              <div className="text-danger">{errors.username}</div>
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
                />
              </div>
            </InputGroup>

            {errors.password && touched.password ? (
              <div className="text-danger">{errors.password}</div>
            ) : null}

            <h3>Name</h3>

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">First</div>
                </div>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.firstName && touched.firstName ? (
              <div className="text-danger">{errors.firstName} </div>
            ) : null}

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">Last </div>
                </div>
                <Field
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Doe"
                />
              </div>
            </InputGroup>

            {errors.lastName && touched.lastName ? (
              <div className="text-danger">{errors.lastName}</div>
            ) : null}

            <h3>Address</h3>

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <FaCity />
                  </div>
                </div>
                <Field
                  id="city"
                  name="city"
                  placeholder="New York"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.city && touched.city ? (
              <div className="text-danger">{errors.city}</div>
            ) : null}

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <SiGooglestreetview />
                  </div>
                </div>
                <Field
                  id="street"
                  name="street"
                  placeholder="Broadway"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.street && touched.street ? (
              <div className="text-danger">{errors.street}</div>
            ) : null}

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <AiOutlineFieldNumber />
                  </div>
                </div>
                <Field
                  id="number"
                  name="number"
                  placeholder="111"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.number && touched.number ? (
              <div className="text-danger">{errors.number}</div>
            ) : null}

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <TbZip />
                  </div>
                </div>
                <Field
                  id="zipCode"
                  name="zipCode"
                  placeholder="10006"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.zipCode && touched.zipCode ? (
              <div className="text-danger">{errors.zipCode}</div>
            ) : null}

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <TbWorldLatitude />
                  </div>
                </div>
                <Field
                  id="lat"
                  name="lat"
                  placeholder="40.709735"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.lat && touched.lat ? (
              <div className="text-danger">{errors.lat}</div>
            ) : null}

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <TbWorldLongitude />
                  </div>
                </div>
                <Field
                  id="long"
                  name="long"
                  placeholder="-74.012848"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.long && touched.long ? (
              <div className="text-danger">{errors.long}</div>
            ) : null}

            <h3>Phone</h3>

            <InputGroup>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text h-100">
                    <FaPhoneAlt />
                  </div>
                </div>
                <Field
                  id="phone"
                  name="phone"
                  placeholder="1 234 567 8901"
                  className="form-control"
                />
              </div>
            </InputGroup>

            {errors.phone && touched.phone ? (
              <div className="text-danger">{errors.phone}</div>
            ) : null}

            <div className="d-flex justify-content-center ">
              <button type="submit" className="border rounded">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
