import { useDebugValue, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import ConvertModal from "../../components/UI/Modal";
import { addProduct, deleteProductById } from "../../redux/actions";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

function Products() {
  const product = useSelector((state) => state.product);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("category", categoryId);
    form.append("description", description);
    form.append("quantity", quantity);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setName("");
    setPrice("");
    setCategoryId("");
    setDescription("");
    setQuantity("");
    setProductPictures([]);
    setShow(false);
  };
  const handleDeleteProduct = (id) => {
    dispatch(deleteProductById(id));
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children && category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const handleProductPictures = (e) => {
    if (e.target.files[0]) {
      setProductPictures([...productPictures, e.target.files[0]]);
    }
  };
  const renderProducts = (data) => {
    return (
      <Table style={{ fontSize: 12 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((pro, index) => {
                return (
                  <tr key={pro._id}>
                    <td>{index}</td>
                    <td>{pro.name}</td>
                    <td>{pro.price}</td>
                    <td>{pro.quantity}</td>
                    <td>{pro.category && pro.category.name}</td>
                    <td>
                      <span
                        onClick={() => handleShowProductDetails(pro)}
                        className="btn btn-sm btn-primary"
                        style={{ marginRight: "10px" }}
                      >
                        View
                      </span>
                      <span
                        onClick={() => handleDeleteProduct(pro._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <ConvertModal
        show={show}
        handleShow={handleShow}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        title="Add new product"
      >
        <Input
          value={name}
          type="text"
          label="Product Name"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={quantity}
          type="text"
          label="Quantity"
          placeholder="Quantity"
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          value={price}
          type="text"
          label="Price"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          value={description}
          type="text"
          label="Description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value={undefined}>Select category</option>
          {createCategoryList(category.categories).map((category) => {
            return (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            );
          })}
        </select>
        <Input type="file" onChange={(e) => handleProductPictures(e)} />
        {productPictures.length > 0 &&
          productPictures.map((pic, index) => {
            console.log(productPictures);
            return <div key={index}>{JSON.stringify(pic && pic.name)}</div>;
          })}
      </ConvertModal>
    );
  };

  const renderShowProductDetails = () => {
    if (productDetail) {
      return (
        <ConvertModal
          show={productDetailModal}
          handleClose={() => setProductDetailModal(false)}
          title="Product Details"
          size="lg"
        >
          <Row>
            <Col md={6}>
              <label className="key">Name</label>
              <p className="value">{productDetail.name}</p>
            </Col>
            <Col md={6}>
              <label className="key">Price</label>
              <p className="value">{productDetail.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <label className="key">Quantity</label>
              <p className="value">{productDetail.quantity}</p>
            </Col>
            <Col md={6}>
              <label className="key">Category</label>
              <p className="value">
                {productDetail.category && productDetail.category.name}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <label className="key">Description</label>
              <p className="value">{productDetail.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="key">Product Pictures</label>
              <div style={{ display: "flex" }}>
                {productDetail.productPictures.map((picture) => {
                  return (
                    <div key={picture._id} className="productContainer">
                      <img
                        src={generatePublicUrl(picture.img)}
                        alt="Product_Picture"
                      />
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </ConvertModal>
      );
    }
  };

  const handleShowProductDetails = (product) => {
    setProductDetail(product);
    setProductDetailModal(true);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Product</h3>
              <Button
                style={{ margin: "10px 0" }}
                variant="btn btn-sm btn-primary"
                onClick={handleShow}
              >
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderShowProductDetails()}
    </Layout>
  );
}

export default Products;
