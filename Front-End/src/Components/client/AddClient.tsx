import Dashboard from "../dashboard/Dashboard.tsx";
import {FormEvent, useState} from "react";
import  axios from "axios";
import Alert from "../customComponent/Alerts.tsx";


function AddClient() {

    // Client state
    const [client, setClient] = useState(
        {
            nom:'',
            adresse:'',
            numTel:''
        });

    // Alert state
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    // Check if client already exists by name
    const checkIfClientExists = async (nom: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/clients/exists`, {
                params: { nom }
            });
            return response.data;
        } catch (error) {
            console.error("Error checking if client exists:", error);
            return false;
        }
    };

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const validateForm = () => {
        setIsAlertVisible(false);
        setAlertMessage("");
        if (!client.nom.trim()) {
            setAlertMessage("Le nom du client est obligatoire.");
            setAlertType("error");
            setIsAlertVisible(true);
            return false;
        }

        if (!client.adresse.trim()) {
            setAlertMessage("L'adresse du client est obligatoire.");
            setAlertType("error");
            setIsAlertVisible(true);
            return false;
        }

        if (!client.numTel.trim()) {
            setAlertMessage("Le numéro de téléphone est obligatoire.");
            setAlertType("error");
            setIsAlertVisible(true);
            return false;
        }

        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneRegex.test(client.numTel)) {
            setAlertMessage("Le numéro de téléphone doit être valide (8 chiffres).");
            setAlertType("error");
            setIsAlertVisible(true);
            return false;
        }

        return true;
    };

    // Handle form submission
    const handleSubmit =async  (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate inputs
        if (!validateForm()) return;

        // Check if client already exists
        const exists = await checkIfClientExists(client.nom);
        if (exists) {
            setAlertMessage("Un client avec ce nom existe déjà.");
            setAlertType("error");
            setIsAlertVisible(true);
            return;
        }

        try{
            await axios.post("http://localhost:8080/api/addClient", client)

            setAlertMessage("Client ajouté avec succès !");
            setAlertType("success");
            setIsAlertVisible(true);

            // Reset form fields
            setClient({ nom: '', adresse: '', numTel: '' });
        }catch (error) {
            console.error("Error adding client:", error);

            setAlertMessage("Erreur lors de l'ajout du client.");
            setAlertType("error");
            setIsAlertVisible(true);
        }

    }
    return (
        <div>
            {/* Dashboard with Sidebar */}
            <Dashboard sidebarOpen={true} setSidebarOpen={()=>true}/>

            <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="ml-64 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Ajouter Client</h2>

                    <div className="mt-10 space-y-8">
                        {/* Alert */}
                        {isAlertVisible &&
                            <Alert
                                message={alertMessage}
                                type={alertType}
                            />}

                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 text-left">
                                Nom
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="nom"
                                    type="text"
                                    value={client.nom}
                                    onChange={handleChange}
                                    autoComplete="given-name"
                                    placeholder="Nom de Client"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {/* Address Input */}
                        <div>
                            <label htmlFor="adresse" className="block text-sm font-medium text-gray-900 text-left">
                                Adresse
                            </label>
                            <div className="mt-2">
                                <input
                                    id="adresse"
                                    name="adresse"
                                    type="text"
                                    value={client.adresse}
                                    onChange={handleChange}
                                    placeholder="Adresse du Client"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label htmlFor="numTel" className="block text-sm font-medium text-gray-900 text-left">
                                Téléphone
                            </label>
                            <div className="mt-2">
                                <input
                                    id="numTel"
                                    name="numTel"
                                    value={client.numTel}
                                    onChange={handleChange}
                                    type="text"
                                    autoComplete="tel"
                                    placeholder="Numéro de Téléphone"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold text-gray-900"
                        onClick={() => setClient({ nom: '', adresse: '', numTel: '' })}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </div>

    );
}

export default AddClient;
