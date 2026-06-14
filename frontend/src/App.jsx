import NavbarMain from "./component/navbarmain";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentCard from "./component/studentcard";
import AddStudentPage from "./pages/AddStudentPage";
import EditStudentPage from "./pages/EditStudentPage";

function App() {
  return (
    <BrowserRouter>
      <NavbarMain />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddStudentPage />} />
        <Route path="/showstudents" element={<StudentCard />} />
        <Route path="/edit/:id" element={<EditStudentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
