import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import Login from "./auth/login/Login";
import App from "./Layouts/Main/App";
// import Home from "./Components/Home/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import Signup from "./auth/login/Signup";
import { AuthContextProvider } from "./auth/AuthContext";
import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
import FoodItems from "./Components/Screens/admin/FoodItems";
import AdminPanel from "./Components/Screens/admin/AdminPanel";
import ReportScreen from "./Components/Screens/admin/ReportScreen";
import Home from "./Components/Screens/Home";
import Profile from "./Components/Screens/Profile";
import NotFound from "./Components/Screens/NotFound";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route
              path="admin"
              element={
                <ProtectedAdminRoute>
                  <AdminPanel />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="admin/food/:id"
              element={
                <ProtectedAdminRoute>
                  <FoodItems />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="report/:id"
              element={
                <ProtectedAdminRoute>
                  <ReportScreen />
                </ProtectedAdminRoute>
              }
            />

            <Route path="/" element={<App />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </React.StrictMode>
  );
}

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.scss";
// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Auth from "./auth/Auth";
// import Login from "./auth/login/Login";
// import App from "./Layouts/Main/App";
// import Home from "./Components/Home/Home";
// import ProtectedRoute from "./utils/ProtectedRoute";
// import Signup from "./auth/login/Signup";
// import { AuthContextProvider } from "./auth/AuthContext";
// import Profile from "./Components/Home/Profile";
// import ProtectedAdminRoute from "./utils/ProtectedAdminRoute";
// import NotFound from "./Components/Screens/NotFound";
// import FoodItems from "./Components/Home/FoodItems";
// import ReportScreen from "./Components/Home/ReportScreen";
// import AdminPanel from "./Components/Home/AdminPanel";

// const rootElement = document.getElementById("root");

// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       <AuthContextProvider>
//         <BrowserRouter basename="">
//           <Routes>
//             <Route path="/auth" element={<Auth />}>
//               <Route path="login" element={<Login />} />
//               <Route path="signup" element={<Signup />} />
//             </Route>
//             <Route path="/admin" element={<ProtectedAdminRoute />}>
//               <Route path="panel" element={<AdminPanel />} />
//               <Route path="food/:id" element={<FoodItems />} />
//               <Route path="report/:id" element={<ReportScreen />} />
//             </Route>
//             <Route path="/" element={<App />}>
//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute>
//                     <Home />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="profile"
//                 element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               />
//             </Route>
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </AuthContextProvider>
//     </React.StrictMode>
//   );
// }
// reportWebVitals();
