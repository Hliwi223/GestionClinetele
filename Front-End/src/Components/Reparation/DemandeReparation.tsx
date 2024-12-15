import Dashboard from "../dashboard/Dashboard.tsx";
import {FormEvent, useEffect, useState} from "react";
import  axios from "axios";
import Alert from "../customComponent/Alerts.tsx";
import { useNavigate } from "react-router-dom";


function DemandeReparation() {

    const navigate = useNavigate();

    // Alert State
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    // Clients and Appareils State
    const [clients, setClients] = useState([]);
    const [appareils, setAppareils] = useState([]);
    const [filteredAppareils, setFilteredAppareils] = useState([]);

    // Form State
    const [demandeReparation, setDemandeReparation] = useState({
            clientId : '',
            appareilId:'',
            datePrevue:'',
            symptomesPanne:'',
            etat:'EN_ATTENTE'

        });


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const clientsRes = await axios.get("http://localhost:8080/api/clients", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClients(clientsRes.data);

                const appareilsRes = await axios.get("http://localhost:8080/api/appareils", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAppareils(appareilsRes.data);
            } catch (error: any) {
                console.error("Error fetching data:", error);
                if (error.response && error.response.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/login");
                } else {
                    setAlertMessage("Erreur lors du chargement des données.");
                    setAlertType("error");
                    setIsAlertVisible(true);
                }
            }
        };

        fetchData();
    }, [navigate]);

    // Filter Appareils Based on Selected Client
    useEffect(() => {
        const { clientId } = demandeReparation;
        if (clientId) {
            setFilteredAppareils(
                appareils.filter(
                    (appareil: any) =>
                        appareil.client == null || appareil.client.id.toString() === clientId
                )
            );
        } else {
            setFilteredAppareils(appareils.filter((appareil: any) => appareil.client == null));
        }
    }, [demandeReparation.clientId, appareils]);

    // Update Form State on Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDemandeReparation({ ...demandeReparation, [name]: value });
    };

    // Update Appareil with Associated Client
    const updateAppareil = async (appareilId: string, clientId: string) => {
        const token = localStorage.getItem("token");
        await axios.put(
            `http://localhost:8080/api/update-appareil/${appareilId}`,
            { id: clientId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
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
            datePrevueRep: new Date(demandeReparation.datePrevue).toISOString().split('T')[0],
            etat: demandeReparation.etat,
            symptomesPanne: demandeReparation.symptomesPanne,
            appareil: {id: demandeReparation.appareilId},
            client: {id: demandeReparation.clientId}
        };

        try {

            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            // Update Appareil with Client Association
            await updateAppareil(demandeReparation.appareilId, demandeReparation.clientId);

            // Submit Demande Reparation
            await axios.post("http://localhost:8080/api/demande-reparation", newDemande, {
                headers: { Authorization: `Bearer ${token}` },
            });
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
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error("Error creating demande reparation:", error);
                setAlertMessage("Erreur lors de la création de la demande de réparation.");
                setAlertType("error");
                setIsAlertVisible(true);
            }

        }
    }

    // Alert Timeout
    useEffect(() => {
        if (isAlertVisible) {
            const timer = setTimeout(() => setIsAlertVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isAlertVisible]);
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
                                {filteredAppareils.map((appareil: any): any => (
                                    <option key={appareil.id} value={appareil.id}>
                                       Marque: {appareil.marque} || Modele: {appareil.modele} || Numero Serie: {appareil.numSerie} || Client : {appareil.client == null ? "Not Selected" : appareil.client.id }
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
