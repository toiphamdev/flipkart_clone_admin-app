import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import ConvertModal from "../../../components/UI/Modal";

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    handleSubmit,
    title,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    setCategoryImage,
  } = props;
  return (
    <ConvertModal
      show={show}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      title={title}
    >
      <Row>
        <Col>
          <Input
            type="text"
            value={categoryName}
            placeholder="Category Name"
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <Input
            type="select"
            className="form-select form-select-sm"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            placeholder="Select Category"
            options={categoryList}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type="file"
            placeholder="Category Image"
            // value={categoryImage}
            onChange={(e) => setCategoryImage(e.target.files[0])}
          />
        </Col>
      </Row>
    </ConvertModal>
  );
};

export default AddCategoryModal;
