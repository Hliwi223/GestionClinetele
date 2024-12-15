import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard.tsx";
import { List, Popover, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

interface Client {
    id: number;
    adresse: string;
    nom: string;
    numTel: string;
}

function Appareils() {
    const [appareils, setAppareils] = useState([]); // Original list of appareils
    const [filteredAppareils, setFilteredAppareils] = useState([]); // Filtered list
    const [searchQuery, setSearchQuery] = useState(""); // Search input state

    // Alert State
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();

    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsModalVisible(true);
        setTimeout(() => {
            setIsModalVisible(false);
        }, 4000);
    };

    useEffect(() => {
        const fetchAppareils = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                showAlert("Session expirée. Veuillez vous reconnecter.", "error");
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get("http://localhost:8080/api/appareils", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAppareils(res.data);
                setFilteredAppareils(res.data); // Initialize filtered list
            } catch (error: any) {
                if (error.response && error.response.status === 403) {
                    localStorage.removeItem("token");
                    showAlert("Votre session a expiré. Veuillez vous reconnecter.", "error");
                    navigate("/login");
                } else {
                    console.error("Error fetching appareils:", error);
                    showAlert("Erreur lors du chargement des appareils.", "error");
                }
            }
        };

        fetchAppareils();
    }, [navigate]);

    // Handle Search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = appareils.filter(
            (a: any) =>
                a.marque.toLowerCase().includes(query) ||
                a.modele.toLowerCase().includes(query) ||
                a.numSerie.toLowerCase().includes(query)
        );
        setFilteredAppareils(filtered);
    };

    // Client Popover Content
    const content = (c: Client) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>ID : {c.id}</List.Item>
                    <List.Item>Nom : {c.nom}</List.Item>
                    <List.Item>Numéro Tel : {c.numTel}</List.Item>
                </List>
            </div>
        </div>
    );

    return (
        <div className="flex">
            {/* Sidebar */}
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            {/* Main Content */}
            <div className="ml-72 mt-6 w-full">
                {/* Modal Alert */}
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
                                    onClick={() => setIsModalVisible(false)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Bar */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher par marque, modèle ou numéro de série..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Appareils Table */}
                {filteredAppareils.length > 0 ? (
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Marque</Table.HeadCell>
                            <Table.HeadCell>Modèle</Table.HeadCell>
                            <Table.HeadCell>Numéro de Série</Table.HeadCell>
                            <Table.HeadCell>Client</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredAppareils.map((a: any, index: number) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {a.marque}
                                    </Table.Cell>
                                    <Table.Cell>{a.modele}</Table.Cell>
                                    <Table.Cell>{a.numSerie}</Table.Cell>
                                    <Table.Cell>
                                        {a.client == null ? (
                                            "Non sélectionné"
                                        ) : (
                                            <Popover content={content(a.client)} placement="right">
                                                <a
                                                    href="#"
                                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                >
                                                    {a.client.id}
                                                </a>
                                            </Popover>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                ) : (
                    <div className="text-gray-500 text-center mt-4">Aucun appareil à afficher.</div>
                )}
            </div>
        </div>
    );
}

export default Appareils;
