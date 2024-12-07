import React, { useEffect, useState} from "react";
import Dashboard from "../dashboard/Dashboard.tsx";
import axios from "axios";
import Alert from "../customComponent/Alerts.tsx";
import {List, Popover, Table} from "flowbite-react";




function  Reparations(){


    const [reparations, setReparations] = useState([]);
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [status, setStatus] = useState('EN_ATTENTE');
    const [showModal, setShowModal] = useState(false);

    //alert
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleUpdateStatus=async (id, status)=> {
        console.log(id);
        console.log(status);
      try {
          await axios.put(`http://localhost:8080/api/update-status/${id}?status=${status}`)
              .then(res =>
                        console.log(res.data))
          setShowModal(false);
          setStatus('EN_ATTENTE');
          setAlertMessage("Status de la demande mis à jour avec succès");
          setAlertType('suc');
          setIsAlertVisible(true);
          fetchDemandeReparation();
      }catch (err){
          console.log(err);
          setAlertMessage("Une erreur s'est produite lors de la mise à jour.");
          setAlertType('error');
          setIsAlertVisible(true);
      }
      }

     const fetchDemandeReparation = async () => {
         axios.get("http://localhost:8080/api/getReparations").then(
             res=>{
                 setReparations(res.data);
             }).catch(error => {
             console.log(error);
         });
     }
    useEffect(() => {
        fetchDemandeReparation();
    }, []);
    const contentC=(c) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Nom : {c.nom}</List.Item>
                    <List.Item>Numero Tel : {c.numTel}</List.Item>
                </List>
            </div>
        </div>
    );
    const contentA=(a) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Marque: {a.marque}</List.Item>
                    <List.Item>Modele : {a.modele}</List.Item>
                    <List.Item>NumSerie: {a.numSerie}</List.Item>
                </List>
            </div>
        </div>
    );
    return (
        <div className=" flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={true}/>
            <div className="">
                <div className=" flex">
                    <Dashboard sidebarOpen={true} setSidebarOpen={() => true}/>
                    <div className="">
                        <Table hoverable className="ml-36">
                            <Table.Head>
                                <Table.HeadCell>Date Depot</Table.HeadCell>
                                <Table.HeadCell>Date Prevue</Table.HeadCell>
                                <Table.HeadCell>Stmptomes Panne</Table.HeadCell>
                                <Table.HeadCell>Client</Table.HeadCell>
                                <Table.HeadCell>Appareil</Table.HeadCell>
                                <Table.HeadCell>Etat</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {reparations.map((r: any) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell
                                            className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            { new Date(r.dateDepotAppareil).toLocaleDateString()}
                                        </Table.Cell>
                                        <Table.Cell>{ new Date(r.datePrevueRep).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>{r.symptomesPanne}</Table.Cell>

                                        <Table.Cell>
                                            <Popover content={contentC(r.client)} placement="right">
                                                <a href="#"
                                                   className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    {r.client.id}
                                                </a>
                                            </Popover>

                                        </Table.Cell>
                                        <Table.Cell>
                                            <Popover content={contentA(r.appareil)} placement="right">
                                                <a href="#"
                                                   className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    {r.appareil.id}
                                                </a>
                                            </Popover>

                                        </Table.Cell>
                                        <Table.Cell>{r.etat}</Table.Cell>
                                        <Table.Cell>
                                            <a href="#" onClick={() => {
                                                setSelectedDemande(r);
                                                setShowModal(true);
                                            }} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                Update
                                            </a>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}


                            </Table.Body>
                        </Table>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg w-96 p-6">
                            <h3 className="text-xl font-semibold mb-4">Mettre à jour le statut</h3>
                            <label htmlFor="status" className="block mb-2 text-gray-700">Sélectionner un
                                statut:</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} // Update the status on selection
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            >
                                <option value="EN_ATTENTE">En attente</option>
                                <option value="EN_COURS">EN COURS</option>
                                <option value="TERMINE">Terminé</option>

                            </select>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => {
                                        handleUpdateStatus(selectedDemande.id, status);
                                    }}
                                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
                                >
                                    Mettre à jour
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>

)
    ;

}

export default Reparations;