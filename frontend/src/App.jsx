import NavbarMain from "./component/navbarmain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentCard from "./component/studentcard";
import AddStudentPage from "./pages/AddStudentPage";
import EditStudentPage from "./pages/EditStudentPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProtectedRoute from "./component/protectedroute";


function App() {
  return (
    <BrowserRouter>
      <NavbarMain />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/add" element={
          <ProtectedRoute>
            <AddStudentPage />
          </ProtectedRoute>
        } />
        <Route path="/all" element={
          <ProtectedRoute>
            <StudentCard />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditStudentPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
