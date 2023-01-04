import React from "react";
import {
  unstable_HistoryRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import history from "./history";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";

const App = () => {
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  let user;

  if (token) {
    user = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    user = (
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <Router history={history}>
      <Layout>{user}</Layout>
    </Router>
  );
};

export default App;
