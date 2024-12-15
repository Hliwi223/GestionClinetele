import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard.tsx";
import { List, Popover, Table } from "flowbite-react";
import Alert from "../customComponent/Alerts";

const Reparations = () => {
    const navigate = useNavigate();

    // State Management
    const [reparations, setReparations] = useState([]);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    // Function to Display Alerts
    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 5000);
    };

    // Centralized API Fetch Function
    const fetchData = async (url: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return null;
        }

        try {
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error("Error fetching data:", error);
                showAlert("Erreur lors du chargement des données", "error");
            }
            return null;
        }
    };

    // Fetch Reparations Data
    const fetchReparations = async () => {
        const data = await fetchData("http://localhost:8080/api/reparations");
        if (data) {
            setReparations(data);
        }
    };

    useEffect(() => {
        fetchReparations();
    }, []);

    // Content for Popover (Client and Appareil Details)
    const contentC = (c: any) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b bg-gray-100 px-3 py-2 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Nom: {c.nom}</List.Item>
                    <List.Item>Numéro Tel: {c.numTel}</List.Item>
                </List>
            </div>
        </div>
    );

    const contentA = (a: any) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b bg-gray-100 px-3 py-2 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Appareil</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Marque: {a.marque}</List.Item>
                    <List.Item>Modèle: {a.modele}</List.Item>
                    <List.Item>Numéro Série: {a.numSerie}</List.Item>
                </List>
            </div>
        </div>
    );

    const content = (r: any) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b bg-gray-100 px-3 py-2 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Demande Réparation</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Date Dépôt: {new Date(r.dateDepotAppareil).toLocaleDateString()}</List.Item>
                    <List.Item>Date Prévue: {new Date(r.datePrevueRep).toLocaleDateString()}</List.Item>
                    <List.Item>État: {r.etat}</List.Item>
                    <List.Item>
                        Appareil:{" "}
                        <Popover content={contentA(r.appareil)} placement="right">
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                {r.appareil.id}
                            </a>
                        </Popover>
                    </List.Item>
                    <List.Item>
                        Client:{" "}
                        <Popover content={contentC(r.client)} placement="right">
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                {r.client.id}
                            </a>
                        </Popover>
                    </List.Item>
                </List>
            </div>
        </div>
    );

    return (
        <div className="d-flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            <div className="ml-44 mt-6 w-full">
                {/* Alert Display */}
                {isAlertVisible && <Alert message={alertMessage} type={alertType} />}

                {/* Reparations Table */}
                <div className="card p-4">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Date Réparation</Table.HeadCell>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Tarif HMO</Table.HeadCell>
                            <Table.HeadCell>Temps MO</Table.HeadCell>
                            <Table.HeadCell>Demande Réparation</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {reparations.map((r: any, index: number) => (
                                <Table.Row key={index} className="bg-white dark:bg-gray-800">
                                    <Table.Cell>{new Date(r.dateRep).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{r.description}</Table.Cell>
                                    <Table.Cell>{r.tarifHMO}</Table.Cell>
                                    <Table.Cell>{r.tempsMO}</Table.Cell>
                                    <Table.Cell>
                                        <Popover content={content(r.demandeReparation)} placement="right">
                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                {r.demandeReparation.id}
                                            </a>
                                        </Popover>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Reparations;
