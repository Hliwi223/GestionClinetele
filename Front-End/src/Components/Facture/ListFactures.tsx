import { List, Popover, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard.tsx";
import Alert from "../customComponent/Alerts.tsx";

const ListFactures = () => {
    const navigate = useNavigate();

    // State Management
    const [listFacture, setListFacture] = useState([]);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    // Function to show alerts dynamically
    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 5000);
    };

    // Centralized API Fetch Logic
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
                showAlert("Erreur lors du chargement des factures.", "error");
            }
            return null;
        }
    };

    // Fetch Factures Data
    const fetchFactures = async () => {
        const data = await fetchData("http://localhost:8080/api/factures");
        if (data) {
            setListFacture(data);
        }
    };

    useEffect(() => {
        fetchFactures();
    }, []);

    // Print Handler (Updated to show all information)
    const handlePrint = (facture: any) => {
        const printWindow = window.open("", "_blank");
        const content = `
        <html>
            <head>
                <title>Facture ${facture.numero}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                    .facture { padding: 30px; }
                    .facture h1 { text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
                    .section { margin-bottom: 20px; }
                    .section strong { font-weight: bold; color: #333; }
                    .section p { font-size: 16px; line-height: 1.6; margin: 5px 0; }
                    .section h3 { font-size: 20px; font-weight: bold; color: #0070f3; margin-bottom: 15px; }
                    .footer { text-align: center; margin-top: 50px; font-size: 14px; color: #999; }
                </style>
            </head>
            <body>
                <div class="facture">
                    <h1>Facture ${facture.numero}</h1>

                    <!-- Facture Information -->
                    <div class="section">
                        <h3>Facture Information</h3>
                        <p><strong>Date Création:</strong> ${new Date(facture.date).toLocaleDateString()}</p>
                        <p><strong>Montant Total:</strong> ${facture.montantTotal} TND</p>
                    </div>

                    <!-- Reparation Information -->
                    <div class="section">
                        <h3>Réparation Details</h3>
                        <p><strong>Réparation ID:</strong> ${facture.reparation.id}</p>
                        <p><strong>Description:</strong> ${facture.reparation.description}</p>
                        <p><strong>Tarif HMO:</strong> ${facture.reparation.tarifHMO} TND</p>
                        <p><strong>Temps MO:</strong> ${facture.reparation.tempsMO} heures</p>
                        <p><strong>Date Réparation:</strong> ${new Date(facture.reparation.dateRep).toLocaleDateString()}</p>
                    </div>

                    <!-- Demande Reparation Information -->
                    <div class="section">
                        <h3>Demande Réparation Details</h3>
                        <p><strong>Demande ID:</strong> ${facture.reparation.demandeReparation.id}</p>
                        <p><strong>Date Depot Appareil :  </strong> ${facture.reparation.demandeReparation.dateDepotAppareil}</p>
                        <p><strong>Symptomes Panne :</strong> ${facture.reparation.demandeReparation.symptomesPanne}</p>
                    </div>

                    <!-- Appareil Information -->
                    <div class="section">
                        <h3>Appareil Details</h3>
                        <p><strong>Marque:</strong> ${facture.reparation.demandeReparation.appareil.marque}</p>
                        <p><strong>Modèle:</strong> ${facture.reparation.demandeReparation.appareil.modele}</p>
                        <p><strong>Numéro de Série:</strong> ${facture.reparation.demandeReparation.appareil.numSerie}</p>
                    </div>

                    <!-- Client Information -->
                    <div class="section">
                        <h3>Client Details</h3>
                        <p><strong>Nom:</strong> ${facture.reparation.demandeReparation.client.nom}</p>
                        <p><strong>Numéro Téléphone:</strong> ${facture.reparation.demandeReparation.client.numTel}</p>
                    </div>

                    <div class="footer">
                        <p>Merci pour votre confiance !</p>
                    </div>
                </div>
            </body>
        </html>
    `;
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
        navigate("/listFacture");
    };

    // Popover Content for Client, Appareil, and Reparation
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

    const contentR = (r: any) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b bg-gray-100 px-3 py-2 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Réparation</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item><strong>Date Rép:</strong> {new Date(r.dateRep).toLocaleDateString()}</List.Item>
                    <List.Item><strong>Description:</strong> {r.description}</List.Item>
                    <List.Item><strong>Tarif HMO:</strong> {r.tarifHMO}</List.Item>
                    <List.Item><strong>Temps MO:</strong> {r.tempsMO}</List.Item>
                    <List.Item>
                        <strong>Appareil:</strong>
                        <Popover content={contentA(r.demandeReparation.appareil)} placement="right">
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                {r.demandeReparation.appareil.id}
                            </a>
                        </Popover>
                    </List.Item>
                    <List.Item>
                        <strong>Client:</strong>
                        <Popover content={contentC(r.demandeReparation.client)} placement="right">
                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                {r.demandeReparation.client.id}
                            </a>
                        </Popover>
                    </List.Item>
                </List>
            </div>
        </div>
    );


    return (
        <div className="flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            <div className="ml-72 mt-6 w-full">
                {/* Dynamic Alert */}
                {isAlertVisible && <Alert message={alertMessage} type={alertType} />}

                {/* Factures Table */}
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>Numéro Facture</Table.HeadCell>
                        <Table.HeadCell>Date Création</Table.HeadCell>
                        <Table.HeadCell>Montant Total</Table.HeadCell>
                        <Table.HeadCell>Réparation</Table.HeadCell>
                        <Table.HeadCell>Imprimer</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {listFacture.map((facture: any) => (
                            <Table.Row key={facture.id}>
                                <Table.Cell>{facture.numero}</Table.Cell>
                                <Table.Cell>{new Date(facture.date).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{facture.montantTotal} TND</Table.Cell>
                                <Table.Cell>
                                    <Popover content={contentR(facture.reparation)} placement="right">
                                        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            {facture.reparation.id}
                                        </a>
                                    </Popover>
                                </Table.Cell>
                                <Table.Cell>
                                    <a
                                        href="#"
                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                        onClick={() => handlePrint(facture)}
                                    >
                                        Imprimer
                                    </a>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
};

export default ListFactures;
