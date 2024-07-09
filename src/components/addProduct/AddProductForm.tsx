import { Formik, Field, Form, FormikHelpers } from "formik";
import { addProduct } from "../../axios/operations";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../axios/selectors";
import { useAppDispatch } from "../../hooks/useDispatch";
import { INewProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import * as Yup from "yup";
import { MdOutlineTitle } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { FaAudioDescription } from "react-icons/fa";
import { ImFilePicture } from "react-icons/im";

// interface INewProduct {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

const validationSchema = Yup.object({
  title: Yup.string().min(2).required("Title is required!"),
  price: Yup.number()
    .positive("Must be greater than 0!")
    .required("Price is required!"),
  description: Yup.string().min(16).required("Description is required!"),
  // category: Yup
});

export const AddProductForm = () => {
  const userIsLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    if (!userIsLoggedIn) return;
    dispatch(
      addProduct({
        title: "nameProduct",
        price: 15,
        description: "lorem ipsum lalalal",
        image:
          "https://cdn.pixabay.com/photo/2017/06/15/13/06/retro-2405404_1280.jpg",
        category: "jewelry",
      })
    );
  };

  const checValues = (values: INewProduct) => {
    console.log(values);
  };

  return (
    <>
      <div>
        <h1>Signup</h1>
        <Formik
          initialValues={{
            title: "",
            price: 0,
            description: "",
            image: "",
            category: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(
            values: INewProduct,
            { setSubmitting }: FormikHelpers<INewProduct>
          ) => {
            checValues(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="col-auto">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text h-100">
                      <MdOutlineTitle />
                    </div>
                  </div>
                  <Field
                    id="title"
                    name="title"
                    placeholder="Title"
                    className="form-control"
                  />
                </div>
              </div>

              {errors.title && touched.title ? (
                <div className="text-danger">{errors.title}</div>
              ) : null}

              <div className="col-auto">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text h-100">
                      <IoMdPricetag />
                    </div>
                  </div>
                  <Field
                    id="price"
                    name="price"
                    placeholder="How much is it?"
                    className="form-control"
                  />
                </div>
              </div>

              {errors.price && touched.price ? (
                <div className="text-danger">{errors.price}</div>
              ) : null}

              <div className="col-auto">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text h-100">
                      <FaAudioDescription />
                    </div>
                  </div>
                  <Field
                    id="description"
                    name="description"
                    placeholder="What it is?"
                    className="form-control"
                  />
                </div>
              </div>

              {errors.description && touched.description ? (
                <div className="text-danger">{errors.description}</div>
              ) : null}

              <div className="col-auto">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text h-100">
                      <ImFilePicture />
                    </div>
                  </div>
                  <Field
                    id="image"
                    name="image"
                    placeholder="What it is?"
                    type="file"
                    className="form-control"
                  />
                </div>
              </div>

              {errors.image && touched.image ? (
                <div className="text-danger">{errors.image}</div>
              ) : null}

              <p>
                <b>here will be dropdown where user will select a category</b>
              </p>

              {/* <div className="col-auto">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text h-100">
                      <ImFilePicture />
                    </div>
                  </div>
                  <Field
                    id="image"
                    name="image"
                    placeholder="What it is?"
                    className="form-control"
                  />
                </div>
              </div>

              {errors.image && touched.image ? (
                <div className="text-danger">{errors.image}</div>
              ) : null} */}

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProductForm;
