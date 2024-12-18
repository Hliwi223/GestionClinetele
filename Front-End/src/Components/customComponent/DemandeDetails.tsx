import { useLocation, useNavigate } from "react-router-dom";

function DemandeDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { submittedInfo } = location.state || {}; // Retrieve passed data

    // Redirect if no data is present
    if (!submittedInfo) {
        navigate("/demandeReparation");
        return null;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-8 border rounded-lg bg-gray-100 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Demande Soumise avec Succès</h2>
                <p className="text-gray-700 mb-2">
                    <strong>Demande ID:</strong> {submittedInfo.id}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Client:</strong> {submittedInfo.client.nom}
                </p>
                <p className="text-gray-700 mb-2">
                    <strong>Appareil:</strong> {submittedInfo.appareil.marque} - {submittedInfo.appareil.modele}
                </p>

            </div>
        </div>
    );
}

export default DemandeDetails;
