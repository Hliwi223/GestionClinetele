import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard.tsx";
import { List, Popover, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ListDemandeReparations() {
    const [reparations, setReparations] = useState([]); // Original data
    const [filteredReparations, setFilteredReparations] = useState([]); // Filtered data
    const [searchQuery, setSearchQuery] = useState(""); // Search input state

    const [selectedDemande, setSelectedDemande] = useState<{ id: number } | null>(null);
    const [status, setStatus] = useState("EN_ATTENTE");
    const [showModal, setShowModal] = useState(false);

    // Alert State
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const closeModal = () => setIsModalVisible(false);

    const navigate = useNavigate();

    // Function to show alerts dynamically in a modal with timeout
    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsModalVisible(true);
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
            setFilteredReparations(response.data); // Initialize filtered list
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

    useEffect(() => {
        fetchReparations();
    }, []);

    // Search Logic
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = reparations.filter((r: any) => {
            const dateDepot = new Date(r.dateDepotAppareil).toLocaleDateString().toLowerCase();
            const symptomes = r.symptomesPanne?.toLowerCase() || "";
            const clientNom = r.client?.nom?.toLowerCase() || "";
            const appareilMarque = r.appareil?.marque?.toLowerCase() || "";
            const etat = r.etat?.toLowerCase() || "";

            return (
                dateDepot.includes(query) ||
                symptomes.includes(query) ||
                clientNom.includes(query) ||
                appareilMarque.includes(query)||
                    etat.includes(query)
            );
        });
        setFilteredReparations(filtered);
    };

    // Popover Content for Client
    const contentC = (c: any) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Id : {c.id}</List.Item><List.Item>Nom : {c.nom}</List.Item>
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
                    <List.Item>ID: {a.id}</List.Item>
                    <List.Item>Marque: {a.marque}</List.Item>
                    <List.Item>Modèle : {a.modele}</List.Item>
                    <List.Item>Numéro de Série: {a.numSerie}</List.Item>
                </List>
            </div>
        </div>
    );

    return (
        <div className="flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            <div className="ml-48 mt-6 w-full">
                {/* Search Bar */}
                <div className="flex justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher par date, symptômes, client ou appareil..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Reparations Table */}
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Date Dépôt</Table.HeadCell>
                        <Table.HeadCell>Date Prévue</Table.HeadCell>
                        <Table.HeadCell>Symptômes</Table.HeadCell>
                        <Table.HeadCell>Client</Table.HeadCell>
                        <Table.HeadCell>Appareil</Table.HeadCell>
                        <Table.HeadCell>État</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {filteredReparations.map((r: any) => (
                            <Table.Row key={r.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{new Date(r.dateDepotAppareil).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{new Date(r.datePrevueRep).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{r.symptomesPanne}</Table.Cell>
                                <Table.Cell>
                                    <Popover content={contentC(r.client)} placement="right">
                                        <span className="text-cyan-600 cursor-pointer hover:underline">
                                            {r.client?.nom || "N/A"}
                                        </span>
                                    </Popover>
                                </Table.Cell>
                                <Table.Cell>
                                    <Popover content={contentA(r.appareil)} placement="right">
                                        <span className="text-cyan-600 cursor-pointer hover:underline">
                                            {r.appareil?.marque || "N/A"}
                                        </span>
                                    </Popover>
                                </Table.Cell>
                                <Table.Cell>{r.etat}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default ListDemandeReparations;
