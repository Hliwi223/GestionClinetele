import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard.tsx";
import { List, Popover, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ListDemandeReparations() {
    const [reparations, setReparations] = useState([]);
    const [selectedDemande, setSelectedDemande] = useState<{ id: number } | null>(null);
    const [status, setStatus] = useState("EN_ATTENTE");
    const [showModal, setShowModal] = useState(false);

    // Alert State
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [isModalVisible, setIsModalVisible] = useState(false);
    // Close Modal
    const closeModal = () => setIsModalVisible(false);

    const navigate = useNavigate();

    // Function to show alerts dynamically in a modal with timeout
    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsModalVisible(true);

        // Close modal after 5 seconds
        setTimeout(() => {
            setIsModalVisible(false);
        }, 4000);
    };

    // Fetch Reparations
    const fetchReparations = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            showAlert("Session expirée. Veuillez vous reconnecter.", "error");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.get("http://localhost:8080/api/getReparations", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReparations(response.data);
        } catch (error: any) {
            if (error.response?.status === 403) {
                localStorage.removeItem("token");
                showAlert("Session expirée. Veuillez vous reconnecter.", "error");
                navigate("/login");
            } else {
                console.error("Error fetching reparations:", error);
                showAlert("Erreur lors du chargement des réparations.", "error");
            }
        }
    };

    // Update Status
    const handleUpdateStatus = async (id: number, newStatus: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            showAlert("Session expirée. Veuillez vous reconnecter.", "error");
            navigate("/login");
            return;
        }

        try {
            await axios.put(
                `http://localhost:8080/api/update-status/${id}`,
                {},
                {
                    params: { status: newStatus },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            showAlert("Statut mis à jour avec succès !", "success");
            setShowModal(false);
            setStatus("EN_ATTENTE");
            fetchReparations();
        } catch (error: any) {
            if (error.response?.status === 403) {
                localStorage.removeItem("token");
                showAlert("Session expirée. Veuillez vous reconnecter.", "error");
                navigate("/login");
            } else {
                console.error("Error updating status:", error);
                showAlert("Erreur lors de la mise à jour du statut.", "error");
            }
        }
    };

    // Popover Content for Client
    const contentC = (c: any) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Nom : {c.nom}</List.Item>
                    <List.Item>Numéro Tel : {c.numTel}</List.Item>
                </List>
            </div>
        </div>
    );

    // Popover Content for Appareil
    const contentA = (a: any) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Appareil</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Marque: {a.marque}</List.Item>
                    <List.Item>Modèle : {a.modele}</List.Item>
                    <List.Item>Numéro de Série: {a.numSerie}</List.Item>
                </List>
            </div>
        </div>
    );

    useEffect(() => {
        fetchReparations();
    }, []);

    return (
        <div className="flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            <div className="ml-48 mt-6 w-full">
                {/* Alert */}
                {isModalVisible && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                            <h3
                                className={`text-lg font-semibold ${
                                    alertType === "success" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {alertType === "success" ? "Succès" : "Erreur"}
                            </h3>
                            <p className="mt-2 text-gray-700">{alertMessage}</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Reparations Table */}
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Date Dépôt</Table.HeadCell>
                        <Table.HeadCell>Date Prévue</Table.HeadCell>
                        <Table.HeadCell>Symptômes</Table.HeadCell>
                        <Table.HeadCell>Client</Table.HeadCell>
                        <Table.HeadCell>Appareil</Table.HeadCell>
                        <Table.HeadCell>État</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {reparations.map((r: any) => (
                            <Table.Row key={r.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{new Date(r.dateDepotAppareil).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{new Date(r.datePrevueRep).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{r.symptomesPanne}</Table.Cell>
                                <Table.Cell>
                                    <Popover content={contentC(r.client)} placement="right">
                                        <span className="text-cyan-600 cursor-pointer hover:underline">
                                            {r.client.id}
                                        </span>
                                    </Popover>
                                </Table.Cell>
                                <Table.Cell>
                                    <Popover content={contentA(r.appareil)} placement="right">
                                        <span className="text-cyan-600 cursor-pointer hover:underline">
                                            {r.appareil.id}
                                        </span>
                                    </Popover>
                                </Table.Cell>
                                <Table.Cell>{r.etat}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        onClick={() => {
                                            setSelectedDemande(r);
                                            setShowModal(true);
                                        }}
                                        className="text-cyan-600 hover:underline"
                                    >
                                        Modifier
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                {/* Modal for Updating Status */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg w-96 p-6">
                            <h3 className="text-xl font-semibold mb-4">Mettre à jour le statut</h3>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                            >
                                <option value="EN_ATTENTE">En attente</option>
                                <option value="EN_COURS">En cours</option>
                                <option value="TERMINE">Terminé</option>
                            </select>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => selectedDemande && handleUpdateStatus(selectedDemande.id, status)}
                                    className="bg-black text-white px-4 py-2 rounded-md"
                                >
                                    Mettre à jour
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default ListDemandeReparations;
