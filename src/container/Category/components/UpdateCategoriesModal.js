import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input";
import ConvertModal from "../../../components/UI/Modal";

const UpdateCategoriesModal = (props) => {
  const {
    size,
    handleClose,
    show,
    handleSubmit,
    expandedArr,
    checkedArr,
    handleCategoryInput,
    categoryList,
    title,
  } = props;
  return (
    <ConvertModal
      show={show}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      size={size}
      title={title}
    >
      <Row>
        <h6>Expanded</h6>
      </Row>
      {expandedArr.length > 0 &&
        expandedArr.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  type="text"
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-select"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option value={undefined}>Select category</option>
                  {categoryList.map((category) => {
                    return (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </Col>
              <Col>
                <select
                  className="form-select"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option value=""> Select Type</option>
                  <option value="storage"> Storage</option>
                  <option value="product"> Product</option>
                  <option value="page"> Page</option>
                </select>
              </Col>
              {/* <Input
                  type="file"
                  label="Category Image"
                  placeholder="Category Image"
                  // value={categoryImage}
                  onChange={(e) => setCategoryImage(e.target.files[0])}
                /> */}
            </Row>
          );
        })}
      <Row>
        <h6>Checked</h6>
      </Row>
      {checkedArr.length > 0 &&
        checkedArr.map((item, index) => {
          return (
            <Row key={index}>
              <Col>
                <Input
                  type="text"
                  value={item.name}
                  placeholder="Category Name"
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <Input
                  className="form-select"
                  value={item.parentId}
                  type="select"
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                  placeholder="Select Category"
                  options={categoryList}
                />
              </Col>
              <Col>
                <select
                  className="form-select"
                  value={item.type}
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option value=""> Select Type</option>
                  <option value="store"> Store</option>
                  <option value="product"> Product</option>
                  <option value="page"> Page</option>
                </select>
              </Col>
              {/* <Input
                  type="file"
                  label="Category Image"
                  placeholder="Category Image"
                  // value={categoryImage}
                  onChange={(e) => setCategoryImage(e.target.files[0])}
                /> */}
            </Row>
          );
        })}
    </ConvertModal>
  );
};

export default UpdateCategoriesModal;
