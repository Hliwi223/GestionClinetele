
import './App.css'
import Login from "./Components/Login.tsx";
import Dashboard from "./Components/dashboard/Dashboard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Clients from "./Components/client/Clients.tsx";
import AddClient from "./Components/client/AddClient.tsx";
import AddAppareils from "./Components/Appareils/AddAppareils.tsx";
import Appareils from "./Components/Appareils/Appareils.tsx";
import DemandeReparation from "./Components/Reparation/DemandeReparation.tsx";
import Reparation from "./Components/Reparation/Reparation.tsx";
import ListFactures from "./Components/Facture/ListFactures.tsx";
import AddPiece from "./Components/priceDeRecharge/AddPiece.tsx";
import ListPirces from "./Components/priceDeRecharge/ListPirces.tsx";
import ListDemandeReparations from "./Components/Reparation/ListDemandeReparations.tsx";
import Reparations from "./Components/Reparation/Reparations.tsx";
import DemandeDetails from "./Components/customComponent/DemandeDetails.tsx";


function App() {

  return (
      <>

          <BrowserRouter>
              <Routes>
                  <Route path="/dashboard" element={<Dashboard sidebarOpen={true} setSidebarOpen={()=>true}/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/clients" element={<Clients/>}/>
                  <Route path="/AddClient" element={<AddClient/>}/>
                  <Route path="/AddAppareil" element={<AddAppareils/>}/>
                  <Route path="/Appareils" element={<Appareils/>}/>
                  <Route path="/demande-details" element={<DemandeDetails />} />
                  <Route path="/demandeReparation" element={<DemandeReparation/>}/>
                  <Route path="/listDemande" element={<ListDemandeReparations/>}/>
                  <Route path="/createReparation" element={<Reparation/>}/>
                  <Route path="/reparations" element={<Reparations/>}/>
                  <Route path="/listFacture" element={<ListFactures/>}/>
                  <Route path="/createPiece" element={<AddPiece/>}/>
                  <Route path="/listPieces" element={<ListPirces/>}/>

              </Routes>
          </BrowserRouter>

      </>
  )
}

export default App
