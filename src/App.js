import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./container/Home";
import Signin from "./container/Signin";
import Signup from "./container/Signup";
import PrivateRoute from "./HOC/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, isUserLoggedIn } from "./redux/actions";
import Orders from "./container/Orders";
import Products from "./container/Products";
import Category from "./container/Category";
import NewPage from "./container/NewPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    } else {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/products" element={<PrivateRoute />}>
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="/orders" element={<PrivateRoute />}>
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/category" element={<PrivateRoute />}>
          <Route path="/category" element={<Category />} />
        </Route>
        <Route path="/page" element={<PrivateRoute />}>
          <Route path="/page" element={<NewPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
