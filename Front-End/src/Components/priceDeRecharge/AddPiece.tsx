import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Alert from "../customComponent/Alerts";

const AddPiece: React.FC = () => {
    const navigate = useNavigate();

    // Alert State
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    // Piece State
    const [typePieces, setTypePieces] = useState([]);
    const [piece, setPiece] = useState({
        code: "",
        nom: "",
        prixAchat: "",
        prixHT: "",
        prixTTC: "",
        typePieceId: "",
    });

    // Utility: Show Alert with Timeout
    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 5000);
    };

    // Check Token Presence & Fetch Data
    const fetchTypePieces = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await axios.get("http://localhost:8080/api/typePiece", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTypePieces(response.data);
        } catch (error: any) {
            if (error.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error("Error fetching typePieces:", error);
                showAlert("Erreur lors du chargement des types de pièces.", "error");
            }
        }
    };

    useEffect(() => {
        fetchTypePieces();
    }, [navigate]);

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPiece({ ...piece, [name]: value });
    };


    // Form Validation
    const validateForm = () => {
        if (!piece.code || !piece.nom || !piece.prixAchat || !piece.prixHT || !piece.prixTTC || !piece.typePieceId) {
            showAlert("Tous les champs sont obligatoires.", "error");
            return false;
        }

        if (isNaN(Number(piece.prixAchat)) || Number(piece.prixAchat) <= 0) {
            showAlert("Le prix d'achat doit être un nombre positif.", "error");
            return false;
        }

        if (isNaN(Number(piece.prixHT)) || Number(piece.prixHT) <= 0) {
            showAlert("Le prix HT doit être un nombre positif.", "error");
            return false;
        }

        if (isNaN(Number(piece.prixTTC)) || Number(piece.prixTTC) <= 0) {
            showAlert("Le prix TTC doit être un nombre positif.", "error");
            return false;
        }

        return true;
    };
    // Form Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        if (!validateForm()) return;

        const formData = {
            code: piece.code,
            nom: piece.nom,
            prixAchat: piece.prixAchat,
            prixHT: piece.prixHT,
            prixTTC: piece.prixTTC,
            typePiece: { id: piece.typePieceId },
        };

        try {
            await axios.post("http://localhost:8080/api/pieces/create", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            showAlert("Pièce ajoutée avec succès !", "success");
            // Reset Form State
            setPiece({
                code: "",
                nom: "",
                prixAchat: "",
                prixHT: "",
                prixTTC: "",
                typePieceId: "",
            });
        } catch (error: any) {
            if (error.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                const errorMsg =
                    error.response?.data?.message || "Erreur lors de l'ajout de la pièce.";
                showAlert(`Erreur: ${errorMsg}`, "error");
            }
        }
    };

    return (
        <div className="">
            <Dashboard sidebarOpen={true} setSidebarOpen={() => true} />

            <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="ml-64 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Ajouter une Pièce</h2>

                    <div className="mt-10 space-y-8">
                        {isAlertVisible && <Alert message={alertMessage} type={alertType} />}

                        {/* Code Input */}
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-900 text-left">
                                Code
                            </label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                value={piece.code}
                                onChange={handleChange}
                                placeholder="Code de la pièce"
                                required
                                className="w-full px-3 py-2 rounded-md outline outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                        </div>

                        {/* Nom Input */}
                        <div>
                            <label htmlFor="nom" className="block text-sm font-medium text-gray-900 text-left">
                                Nom
                            </label>
                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                value={piece.nom}
                                onChange={handleChange}
                                placeholder="Nom de la pièce"
                                required
                                className="w-full px-3 py-2 rounded-md outline outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                        </div>

                        {/* Prix Achat */}
                        <div>
                            <label htmlFor="prixAchat" className="block text-sm font-medium text-gray-900 text-left">
                                Prix d'achat
                            </label>
                            <input
                                id="prixAchat"
                                name="prixAchat"
                                type="number"
                                value={piece.prixAchat}
                                onChange={handleChange}
                                placeholder="Prix d'achat"
                                required
                                className="w-full px-3 py-2 rounded-md outline outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                        </div>

                        {/* Prix HT */}
                        <div>
                            <label htmlFor="prixHT" className="block text-sm font-medium text-gray-900 text-left">
                                Prix HT
                            </label>
                            <input
                                id="prixHT"
                                name="prixHT"
                                type="number"
                                value={piece.prixHT}
                                onChange={handleChange}
                                placeholder="Prix HT"
                                required
                                className="w-full px-3 py-2 rounded-md outline outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                        </div>

                        {/* Prix TTC */}
                        <div>
                            <label htmlFor="prixTTC" className="block text-sm font-medium text-gray-900 text-left">
                                Prix TTC
                            </label>
                            <input
                                id="prixTTC"
                                name="prixTTC"
                                type="number"
                                value={piece.prixTTC}
                                onChange={handleChange}
                                placeholder="Prix TTC"
                                required
                                className="w-full px-3 py-2 rounded-md outline outline-1 outline-gray-300 focus:outline-indigo-600"
                            />
                        </div>
                        {/* Type Piece Dropdown */}
                        <div>
                            <label htmlFor="typePieceId" className="block text-sm font-medium text-gray-900 text-left">
                                Type de pièce
                            </label>
                            <select
                                name="typePieceId"
                                value={piece.typePieceId}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-md border outline outline-1 outline-gray-300 focus:outline-indigo-600"
                                required
                            >
                                <option value="">Sélectionner un type</option>
                                {typePieces.map((type: any) => (
                                    <option key={type.id} value={type.id}>
                                        {type.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold text-gray-900">
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPiece;
