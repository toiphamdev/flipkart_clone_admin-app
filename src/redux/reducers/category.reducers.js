import { categoryConstans } from "../constants";

const initState = {
  categories: [],
  error: null,
  loading: false,
};

const buildNewCategories = (parentId, categories, category) => {
  let categoryArr = [];
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        children: [],
      },
    ];
  }
  for (let cat of categories) {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        children: category.children,
      };
      categoryArr.push({
        ...cat,
        children:
          cat.children && cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      categoryArr.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }

  return categoryArr;
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstans.GET_ALL_CATEGORIES_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case categoryConstans.GET_ALL_CATEGORIES_SUCCESS: {
      let stateCoppy = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      return stateCoppy;
    }

    case categoryConstans.GET_ALL_CATEGORIES_FAILURE: {
      let stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }

    case categoryConstans.ADD_NEW_CATEGORY_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }

    case categoryConstans.ADD_NEW_CATEGORY_SUCCESS: {
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId ? category.parentId : undefined,
        state.categories,
        category
      );
      const stateCoppy = {
        ...state,
        loading: false,
        categories: updatedCategories,
      };
      return stateCoppy;
    }

    case categoryConstans.ADD_NEW_CATEGORY_FAILURE: {
      let stateCoppy = {
        ...initState,
      };
      return stateCoppy;
    }

    case categoryConstans.UPDATE_CATEGORIES_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }

    case categoryConstans.UPDATE_CATEGORIES_SUCCESS: {
      const stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }

    case categoryConstans.UPDATE_CATEGORIES_FAILURE: {
      let stateCoppy = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      return stateCoppy;
    }
    case categoryConstans.DELETE_CATEGORIES_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }

    case categoryConstans.DELETE_CATEGORIES_SUCCESS: {
      const stateCoppy = {
        ...state,
        loading: false,
      };
      return stateCoppy;
    }

    case categoryConstans.DELETE_CATEGORIES_FAILURE: {
      let stateCoppy = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return stateCoppy;
    }

    default:
      break;
  }
  return state;
};

export default categoryReducer;
