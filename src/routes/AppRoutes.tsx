import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "@/layouts/layout";
import ProtectedRoute from "@/auth/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import AuthCallbackPage from "@/pages/AuthCallbackPage";
import UserProfilePage from "@/pages/UserProfilePage";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/profil-utilisateur"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/mon-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
