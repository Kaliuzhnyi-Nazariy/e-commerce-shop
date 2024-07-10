import { Formik, Field, Form, FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { selectCategories } from "../../axios/selectors";
import { useAppDispatch } from "../../hooks/useDispatch";
import { INewProduct } from "../../typesOrInterfaces/typesOrInterfaces";
import * as Yup from "yup";
import { MdOutlineTitle } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { FaAudioDescription } from "react-icons/fa";
import { ImFilePicture } from "react-icons/im";
import { useState } from "react";
import { Dropdown, DropdownButton, Stack } from "react-bootstrap";
import { addProduct } from "../../axios/operations";

const validationSchema = Yup.object({
  title: Yup.string().min(2).required("Title is required!"),
  price: Yup.number()
    .positive("Must be greater than 0!")
    .required("Price is required!"),
  description: Yup.string().min(16).required("Description is required!"),
  category: Yup.string().required("Category is required!"),
});

export const AddProductForm = ({ onClick }) => {
  const dispatch = useAppDispatch();

  const categories = useSelector(selectCategories);

  const [category, setCategory] = useState("");

  // const handleAddProduct = () => {
  //   if (!userIsLoggedIn) return;
  //   dispatch(
  //     addProduct({
  //       title: "nameProduct",
  //       price: 15,
  //       description: "lorem ipsum lalalal",
  //       image:
  //         "https://cdn.pixabay.com/photo/2017/06/15/13/06/retro-2405404_1280.jpg",
  //       category: "jewelry",
  //     })
  //   );
  // };

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
  };

  return (
    <>
      <div>
        <h1>ADD PRODUCT</h1>
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

              <Stack direction="horizontal">
                <DropdownButton
                  id="dropdown-button"
                  title="Select category"
                  className="mb-2 btn-dark"
                >
                  <Dropdown.Menu
                    className="dropdown-menu"
                    style={{ height: "16vh", overflowY: "scroll" }}
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
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </DropdownButton>
                <p className="ms-auto">
                  {touched.category && category.length === 0
                    ? errors.category
                    : category}
                </p>
              </Stack>
              <button type="submit" onClick={() => onClick()}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddProductForm;
