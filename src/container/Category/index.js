import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import ConvertModal from "../../components/UI/Modal";
import {
  addCategory,
  updatedCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../redux/actions";
import CheckboxTree from "react-checkbox-tree";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoMdCreate,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";
import "./style.css";
import { default as createCategoryList } from "../../helpers/linearCategories";

function Category() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArr, setCheckedArr] = useState([]);
  const [expandedArr, setExpandedArr] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    if (!categoryName) {
      alert("Name is required");
      return;
    }
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");
    setShow(false);
  };
  const renderCategories = (categories) => {
    let categoryArr = [];
    for (let category of categories) {
      categoryArr.push({
        label: category.name,
        value: category._id,
        children:
          category.children && category.children.length > 0
            ? renderCategories(category.children)
            : null,
      });
    }
    return categoryArr;
  };

  const handleUpdateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckArr = checkedArr.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArr(updatedCheckArr);
    } else if (type === "expanded") {
      const updatedExpandedArr = expandedArr.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArr(updatedExpandedArr);
    }
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);
    const checkedArr = [];
    const expandedArr = [];
    checked.length > 0 &&
      checked.map((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArr.push(category);
      });
    expanded.length > 0 &&
      expanded.map((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArr.push(category);
      });

    setCheckedArr(checkedArr);
    setExpandedArr(expandedArr);
  };

  const updateCategoryForm = () => {
    const form = new FormData();
    expandedArr.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArr.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updatedCategories(form));
    setUpdateCategoryModal(false);
  };

  const deleteCategories = () => {
    const checkedIdArr = checkedArr.map((item, index) => {
      return {
        _id: item.value,
      };
    });
    const expandedIdArr = expandedArr.map((item, index) => {
      return {
        _id: item.value,
      };
    });

    const idsArr = expandedIdArr.concat(checkedIdArr);
    if (checkedIdArr.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdArr));
      setDeleteCategoryModal(false);
    }
  };
  const renderDeleteCategoryModal = () => {
    return (
      <ConvertModal
        title="Confirm"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: () => {
              deleteCategories();
            },
          },
        ]}
      >
        <h6>Expanded</h6>
        {expandedArr.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
        <h6>Checked</h6>
        {checkedArr.map((item, index) => {
          return <span key={index}>{item.name}</span>;
        })}
      </ConvertModal>
    );
  };
  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };
  const categoryList = category.categories
    ? createCategoryList(category.categories)
    : [];
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>category</h3>
              <div className="actionBtnContainer">
                <span>Actions:</span>
                <Button
                  className="btn-sm"
                  variant="primary"
                  onClick={handleShow}
                >
                  <IoIosAdd />
                  <span>Add</span>
                </Button>
                <Button
                  className="btn-sm"
                  variant="danger"
                  onClick={() => deleteCategory()}
                >
                  <IoIosTrash />
                  <span>Delete</span>
                </Button>
                <Button
                  className="btn-sm"
                  variant="secondary"
                  onClick={() => handleUpdateCategory()}
                >
                  <IoMdCreate />
                  <span>Edit</span>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
                expandAll: <span className="rct-icon rct-icon-expand-all" />,
                // collapseAll: (
                //   <span className="rct-icon rct-icon-collapse-all" />
                // ),
                // parentClose: (
                //   <span className="rct-icon rct-icon-parent-close" />
                // ),
                // parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                // leaf: <span className="rct-icon rct-icon-leaf" />,
              }}
            />
          </Col>
        </Row>
      </Container>
      {renderDeleteCategoryModal()}
      <UpdateCategoriesModal
        size="lg"
        title="Update Category"
        show={updateCategoryModal}
        handleSubmit={updateCategoryForm}
        handleClose={() => setUpdateCategoryModal(false)}
        category={category}
        expandedArr={expandedArr}
        checkedArr={checkedArr}
        categoryList={categoryList}
        handleCategoryInput={handleCategoryInput}
      />
      <AddCategoryModal
        show={show}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title="Add New Category"
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        setCategoryImage={setCategoryImage}
      />
    </Layout>
  );
}

export default Category;
