import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard.tsx";
import axios from "axios";
import { Table } from "flowbite-react";

function Clients() {
    const [clients, setClients] = useState([]); // Original clients from API
    const [filteredClients, setFilteredClients] = useState([]); // Clients to display
    const [searchQuery, setSearchQuery] = useState(""); // State for the search input
    const navigate = useNavigate();

    // Alert state
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsModalVisible(true);
        setTimeout(() => {
            setIsModalVisible(false);
        }, 4000);
    };

    const closeModal = () => setIsModalVisible(false);

    useEffect(() => {
        const fetchClients = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                showAlert("Session expirée. Veuillez vous reconnecter.", "error");
                navigate("/login");
                return;
            }
            try {
                const res = await axios.get("http://localhost:8080/api/clients", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClients(res.data);
                setFilteredClients(res.data); // Initialize filtered clients
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 403) {
                        localStorage.removeItem("token");
                        showAlert("Votre session a expiré. Veuillez vous reconnecter.", "error");
                        navigate("/login");
                    } else {
                        showAlert("Erreur lors du chargement des clients. Veuillez réessayer.", "error");
                    }
                } else {
                    console.error("Unexpected error:", err);
                    showAlert("Une erreur inattendue s'est produite.", "error");
                }
            }
        };
        fetchClients();
    }, [navigate]);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = clients.filter((client: any) =>
            client.nom.toLowerCase().includes(query)||
            client.adresse.toLowerCase().includes(query)||
            client.numTel.toLowerCase().includes(query)
        );
        setFilteredClients(filtered);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            {/* Main Content */}
            <div className="ml-72 mt-6 w-full">
                {/* Alert Modal */}
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

                {/* Search Bar */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher un client par nom, adresse, Numero Tel"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Client Table */}
                {filteredClients.length > 0 ? (
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Nom</Table.HeadCell>
                            <Table.HeadCell>Adresse</Table.HeadCell>
                            <Table.HeadCell>Numéro de Téléphone</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {filteredClients.map((c: any, index: number) => (
                                <Table.Row
                                    key={index}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {c.nom}
                                    </Table.Cell>
                                    <Table.Cell>{c.adresse}</Table.Cell>
                                    <Table.Cell>{c.numTel}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                ) : (
                    <div className="text-gray-500 text-center mt-4">
                        Aucun client à afficher.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Clients;
