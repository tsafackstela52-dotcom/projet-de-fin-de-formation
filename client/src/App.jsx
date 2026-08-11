import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Pied from "./components/Pied";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";
import Maladies from "./pages/Maladies";
import ProtectedRoute from "./components/ProtectedRoute";
import MaladieDetail from "./pages/MaladieDetail";
import AdminSymptoms from "./pages/AdminSymptoms";
import AdminDrugs from "./pages/AdminDrugs";
import AdminQuestions from "./pages/AdminQuestions";
import InteractionChecker from "./pages/InteractionChecker";
import Wellbeing from "./pages/Wellbeing";
import WellbeingDetail from "./pages/WellbeingDetail";
import AdminLayout from "./components/AdminLayout";
import PillIdentifier from "./pages/PillIdentifier";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import RendezVous from "./pages/RendezVous";
import Contact from "./pages/Contact";
import Symptomes from "./pages/Symptomes";
import SymptomeDetail from "./pages/SymptomeDetail";
import AdminConditions from "./pages/AdminConditions";
import Urgences from "./pages/Urgences";
import Historique from "./pages/Historique";
import Medicaments from "./pages/Medicaments";
import MedicamentDetail from "./pages/MedicamentDetail";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import TableauDeBord from "./pages/TableauDeBord";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/assistant"
          element={
            <ProtectedRoute>
              <Assistant />
            </ProtectedRoute>
          }
        />
        <Route path="/medicaments" element={<Medicaments />} />
        <Route path="/medicaments/:id" element={<MedicamentDetail />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="maladies" element={<AdminConditions />} />
          <Route path="symptomes" element={<AdminSymptoms />} />
          <Route path="questions" element={<AdminQuestions />} />
          <Route path="utilisateurs" element={<AdminUsers />} />
          <Route path="medicaments" element={<AdminDrugs />} />
        </Route>
        <Route
          path="/tableau-de-bord"
          F
          element={
            <ProtectedRoute>
              <TableauDeBord />
            </ProtectedRoute>
          }
        />
        <Route path="/maladies" element={<Maladies />} />
        <Route path="/maladies/:id" element={<MaladieDetail />} />
        <Route
          path="/rendez-vous"
          element={
            <ProtectedRoute>
              <RendezVous />
            </ProtectedRoute>
          }
        />
        <Route path="/interactions" element={<InteractionChecker />} />
        <Route path="/identifier-pilule" element={<PillIdentifier />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/urgences" element={<Urgences />} />
        <Route path="/symptomes" element={<Symptomes />} />
        <Route path="/symptomes/:id" element={<SymptomeDetail />} />
        <Route
          path="/historique"
          element={
            <ProtectedRoute>
              <Historique />
            </ProtectedRoute>
          }
        />
        <Route path="/bien-etre" element={<Wellbeing />} />
        <Route path="/bien-etre/:id" element={<WellbeingDetail />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>
      <Pied />
    </>
  );
}

export default App;
