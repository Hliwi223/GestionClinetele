import React, { useEffect, useState } from "react";
import Dashboard from "../dashboard/Dashboard.tsx";
import Alert from "../customComponent/Alerts.tsx";
import axios from "axios";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ListPieces: React.FC = () => {
    const [pieces, setPieces] = useState([]);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    const navigate = useNavigate();

    // Utility to display an alert with a timeout
    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 5000);
    };

    // Fetch pieces from API with token validation
    const fetchPieces = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login"); // Redirect to login if no token is present
            return;
        }

        try {
            const response = await axios.get("http://localhost:8080/api/pieces", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPieces(response.data);
        } catch (error: any) {
            console.error("Error fetching pieces:", error);

            if (error.response?.status === 403) {
                // If the token is invalid or expired, clear it and redirect
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                showAlert("Erreur lors du chargement des pièces. Veuillez réessayer.", "error");
            }
        }
    };

    useEffect(() => {
        fetchPieces();
    }, [navigate]);

    return (
        <div className="flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            <div className="ml-72 mt-6 w-full">
                {/* Alert */}
                {isAlertVisible && <Alert message={alertMessage} type={alertType} />}

                {/* Table */}
                <Table hoverable >
                    <Table.Head>
                        <Table.HeadCell>Code</Table.HeadCell>
                        <Table.HeadCell>Nom</Table.HeadCell>
                        <Table.HeadCell>Prix d'Achat</Table.HeadCell>
                        <Table.HeadCell>Prix HT</Table.HeadCell>
                        <Table.HeadCell>Prix TTC</Table.HeadCell>
                        <Table.HeadCell>Type de Pièce</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {pieces.length > 0 ? (
                            pieces.map((p: any, index: number) => (
                                <Table.Row
                                    key={index}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {p.code}
                                    </Table.Cell>
                                    <Table.Cell>{p.nom}</Table.Cell>
                                    <Table.Cell>{p.prixAchat} TND</Table.Cell>
                                    <Table.Cell>{p.prixHT} TND</Table.Cell>
                                    <Table.Cell>{p.prixTTC} TND</Table.Cell>
                                    <Table.Cell>{p.typePiece?.type || "N/A"}</Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            <Table.Row>
                                <Table.Cell colSpan={6} className="text-center py-4">
                                    Aucune pièce disponible.
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default ListPieces;
