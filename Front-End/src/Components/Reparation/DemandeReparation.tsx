import Dashboard from "../dashboard/Dashboard.tsx";
import {FormEvent, useEffect, useState} from "react";
import  axios from "axios";
import Alert from "../customComponent/Alerts.tsx";


function DemandeReparation() {
    // Alert State
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    // Clients and Appareils State
    const [clients, setClients] = useState([]);
    const [appareils, setAppareils] = useState([]);

    // Form State
    const [demandeReparation, setDemandeReparation] = useState({
            clientId : '',
            appareilId:'',
            datePrevue:'',
            symptomesPanne:'',
            etat:'EN_ATTENTE'

        });

    // Update Form State on Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDemandeReparation({ ...demandeReparation, [name]: value });
    };
    useEffect(() => {
        axios.get("http://localhost:8080/api/clients")
            .then(res => setClients(res.data))
            .catch(error => console.error("Error fetching clients:", error));

        axios.get("http://localhost:8080/api/appareils")
            .then(res => setAppareils(res.data))
            .catch(error => console.error("Error fetching appareils:", error));
    }, []);


    // Update Appareil with Associated Client
    const updateAppareil = async (appareilId: string, client: any) => {
        try {
            await axios.put(`http://localhost:8080/api/update-appareil/${appareilId}`, client);
        } catch (error) {
            console.error("Error updating appareil:", error);
            setAlertMessage("Erreur lors de la mise à jour de l'appareil.");
            setAlertType('error');
            setIsAlertVisible(true);
        }
    };
    // Form Submission Handler
    const handleSubmit = async  (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset Alert State
        setIsAlertVisible(false);
        setAlertMessage("");

        // Validate Required Fields
        if (!demandeReparation.clientId || !demandeReparation.appareilId || !demandeReparation.datePrevue || !demandeReparation.symptomesPanne) {
            setAlertMessage("Tous les champs sont obligatoires.");
            setAlertType("error");
            setIsAlertVisible(true);
            return;
        }

        //  New Demande Object
        const newDemande = {
            dateDepotAppareil: new Date().toISOString().split('T')[0],
            datePrevueRep :new Date(demandeReparation.datePrevue).toISOString().split('T')[0],
            etat: demandeReparation.etat,
            symptomesPanne: demandeReparation.symptomesPanne,
            appareil: {id:demandeReparation.appareilId },
            client: {id:demandeReparation.clientId }
        };

        try {
            // Update Appareil with Client Association
            await updateAppareil(newDemande.appareil.id, newDemande.client);

            // Submit Demande Reparation
            const response = await axios.post("http://localhost:8080/api/demande-reparation",newDemande);
            setAlertMessage("Demande de réparation créée avec succès !");
            setAlertType("success");
            setIsAlertVisible(true);

            // Reset Form
            setDemandeReparation({
                clientId: '',
                appareilId: '',
                datePrevue: '',
                symptomesPanne: '',
                etat: 'EN_ATTENTE'
            });
        } catch (error) {
            console.error("Error creating demande reparation:", error);
            setAlertMessage("Erreur lors de la création de la demande de réparation.");
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
                    <h2 className="text-lg font-semibold text-gray-900">Demande Reparation</h2>

                    <div className="mt-10 space-y-8">
                        {isAlertVisible && <Alert message={alertMessage} type={alertType}/>}
                        {/* Client Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 text-left">
                                Client
                            </label>
                            <select
                                name="clientId"
                                value={demandeReparation.clientId}
                                onChange={handleChange}
                                required
                                className={`relative z-20 w-full text-black rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                                }`}
                            >
                                <option value=" ">Select  Client</option>
                                {clients.map((client: any): any => (
                                    <option key={client.id} value={client.id}>
                                        {client.nom}-{client.id}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Appareil Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 text-left">
                                Appareil
                            </label>
                            <select
                                name="appareilId"
                                value={demandeReparation.appareilId}
                                onChange={handleChange}
                                required
                                className={`relative z-20 w-full text-black rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                                }`}
                            >
                                <option value=" ">Select  Appareil</option>
                                {appareils.map((appareil: any): any => (
                                    <option key={appareil.id} value={appareil.id}>
                                        {appareil.marque}-{appareil.modele}-{appareil.numSerie}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* symptomesPanne Input */}
                        <div>
                            <label htmlFor="symptomesPanne"
                                   className="block text-sm font-medium text-gray-900 text-left">
                                Symptomes Panne
                            </label>
                            <div className="mt-2">
                                <input
                                    id="symptomesPanne"
                                    name="symptomesPanne"
                                    type="text"
                                    value={demandeReparation.symptomesPanne}
                                    onChange={handleChange}
                                    placeholder="Symptomes Panne"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {/* date Prevue Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 text-left">
                                Date Prevue
                            </label>
                            <div className="mt-2">
                                <input
                                    id="datePrevue"
                                    name="datePrevue"
                                    value={demandeReparation.datePrevue}
                                    onChange={handleChange}
                                    type="date"
                                    autoComplete="datePrevue"
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
                        onClick={() =>
                            setDemandeReparation({
                                clientId: '',
                                appareilId: '',
                                datePrevue: '',
                                symptomesPanne: '',
                                etat: 'EN_ATTENTE'
                            })
                        }
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600"
                    >
                        Demande
                    </button>
                </div>
            </form>
        </div>

    );
}

export default DemandeReparation;
