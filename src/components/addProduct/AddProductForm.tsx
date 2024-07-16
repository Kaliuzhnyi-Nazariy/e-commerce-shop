import { Formik, Field, Form, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useDispatch";
import { INewProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import * as Yup from "yup";
import { MdOutlineTitle } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { FaAudioDescription } from "react-icons/fa";
import { ImFilePicture } from "react-icons/im";
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { addProduct } from "../../axios/products/operations";
import { selectCategories } from "../../axios/categories/categoriesSelectors";
import toast from "react-hot-toast";

type Prop = {
  onClick: () => void;
  handleClose: () => void;
};

const validationSchema = Yup.object({
  title: Yup.string().min(2).required("Title is required!"),
  price: Yup.number()
    .positive("Must be greater than 0!")
    .required("Price is required!"),
  description: Yup.string().min(16).required("Description is required!"),
  image: Yup.string().url().required("Image is required!"),
  category: Yup.string().required("Category is required!"),
});

export const AddProductForm = ({ onClick, handleClose }: Prop) => {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);

  const [category, setCategory] = useState("");

  const checkValues = (values: INewProduct) => {
    if (values.title.length === 0) return;
    if (values.price === 0) return;
    if (values.description.length === 0) return;
    if (values.image.length === 0) return;
    if (values.category.length === 0) return;

    dispatch(
      addProduct({
        title: values.title,
        price: values.price,
        description: values.description,
        image: values.image,
        category: values.category,
      })
    );

    onClick();
    toast.success("Product created  !");
  };

  return (
    <>
      <div>
        <span className="d-flex align-items-center justify-content-center">
          <h1>ADD PRODUCT</h1>
          <button
            type="button"
            className="close ms-auto d-flex justify-content-center align-items-center"
            aria-label="Close"
            style={{
              background: "transparent",
              width: "40px",
              height: "40px",
              border: "none",
            }}
            onClick={() => handleClose()}
          >
            <span
              aria-hidden="true"
              style={{ fontSize: "32px", marginBottom: "32%", lineHeight: "0" }}
            >
              &times;
            </span>
          </button>
        </span>
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
            checkValues(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
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
                    placeholder="Image link"
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>

              {errors.image && touched.image ? (
                <div className="text-danger">{errors.image}</div>
              ) : null}

              {/* <Stack direction="horizontal"> */}
              <DropdownButton
                key="secondary"
                id={`dropdown-variants-secondary`}
                variant="dark"
                title="Categories"
              >
                {categories.map((categoryItem) => (
                  <Dropdown.Item
                    key={categoryItem}
                    onClick={() => {
                      setFieldValue("category", categoryItem);
                      setCategory(categoryItem);
                    }}
                  >
                    {categoryItem}
                    <Dropdown.Divider />
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <p className="ms-auto">
                {touched.category && category.length === 0
                  ? errors.category
                  : category}
              </p>
              {/* </Stack> */}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProductForm;
