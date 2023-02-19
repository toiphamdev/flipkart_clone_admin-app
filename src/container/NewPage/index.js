import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import ConvertModal from "../../components/UI/Modal";
import linearCategories from "../../helpers/linearCategories";
import { createPage } from "../../redux/actions";

function NewPage() {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const page = useSelector((state) => state.page);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    initCategories();
  }, [category.categories]);
  useEffect(() => {
    console.log(page);
  }, [page]);
  const initCategories = () => {
    setCategories(linearCategories(category.categories));
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };
  const onChangeCategory = (e) => {
    setCategoryId(e.target.value);
    const category = categories.find((cat) => cat.value === e.target.value);
    setType(category.type);
  };

  const renderCreatePageModal = () => {
    return (
      <ConvertModal
        title="Create New Page"
        show={createModal}
        handleClose={() => setCreateModal(false)}
        handleSubmit={handleSubmitPageForm}
      >
        <Container>
          <Row>
            <Col>
              <Input
                type="select"
                options={categories}
                placeholder="Select Category"
                className="form-select mb-3 form-select-sm"
                value={categoryId}
                onChange={onChangeCategory}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                className="form-control-sm"
                placeholder="Page Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={desc}
                className="form-control-sm"
                placeholder="Page Description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            {banners.length > 0 &&
              banners.map((banner, index) => {
                return (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                );
              })}
            <Col>
              <Input
                type="file"
                className="form-control-sm"
                onChange={(e) => handleBannerImages(e)}
              />
            </Col>
          </Row>
          <Row>
            {products.length > 0 &&
              products.map((product, index) => {
                return (
                  <Row key={index}>
                    <Col>{product.name}</Col>
                  </Row>
                );
              })}
            <Col>
              <Input
                type="file"
                className="form-control-sm"
                onChange={(e) => handleProductImages(e)}
              />
            </Col>
          </Row>
        </Container>
      </ConvertModal>
    );
  };

  const handleSubmitPageForm = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Title is required");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    for (let pic of banners) {
      form.append("banners", pic);
    }
    for (let pic of products) {
      form.append("products", pic);
    }
    dispatch(createPage(form));
    setCreateModal(false);
    setTitle("");
    setDesc("");
    setBanners([]);
    setCategoryId("");
    setProducts([]);
    setType("");
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <>Creating page ... please wait</>
      ) : (
        <>
          <button onClick={() => setCreateModal(true)}>add</button>
          {renderCreatePageModal()}
        </>
      )}
    </Layout>
  );
}

export default NewPage;
