import Dashboard from "../dashboard/Dashboard.tsx";
import {FormEvent, useEffect, useState} from "react";
import  axios from "axios";




function DemandeReparation() {


    const [clients, setClients] = useState([]);
    const [appareils, setAppareils] = useState([]);

    const [demandeReparation, setDemandeReparation] = useState(
        {
            clientId : '',
            appareilId:'',
            datePrevue:'',
            symptomesPanne:'',
            etat:'EN_ATTENTE'

        });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDemandeReparation({ ...demandeReparation, [name]: value });
        console.log(`Updated Demande :`, { ...demandeReparation, [name]: value });
    };
    useEffect(() => {
        axios.get("http://localhost:8080/api/clients").then(
            res=>{
                setClients(res.data);
            }).catch(error => {
            console.log(error);
        });
        axios.get("http://localhost:8080/api/appareils").then(
            res=>{
                setAppareils(res.data);
            }).catch(error => {
            console.log(error);
        });
    }, []);
    const handleSubmit = async  (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newDemande = {
            dateDepotAppareil: new Date().toISOString().split('T')[0],
            datePrevueRep :new Date(demandeReparation.datePrevue).toISOString().split('T')[0],
            etat: demandeReparation.etat,
            symptomesPanne: demandeReparation.symptomesPanne,
            appareil: {id:demandeReparation.appareilId },
            client: {id:demandeReparation.clientId }
        };
        try {
            const response = await axios.post("http://localhost:8080/api/demande-reparation",newDemande);
            alert("Demande de reparation crée avec sucvés !")
            setDemandeReparation( {
                clientId : '',
                appareilId:'',
                datePrevue:'',
                symptomesPanne:'',
                etat:'EN_ATTENTE'

            })
            console.log(response.data)
        }catch (err){
            console.log(err)
            console.log(newDemande);
            alert("Erreur lors de la creation de la demande ")
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
                        {/* Client Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 text-left">
                                Client
                            </label>
                            <select
                                name="clientId"
                                value={demandeReparation.clientId}
                                onChange={handleChange}
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
