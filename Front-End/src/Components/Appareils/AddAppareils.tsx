import Dashboard from "../dashboard/Dashboard.tsx";
import {FormEvent, useEffect, useState} from "react";
import  axios from "axios";


function  AddAppareils() {

    const [Appareil, setAppareil] = useState(
        {
            marque:'',
            modele:'',
            numSerie:'',
            clientID:''
        });
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/clients").then(
            res=>{
                setClients(res.data);
            }).catch(error => {
            console.log(error);
        });
    }, []);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setAppareil({ ...Appareil, [name]: value });
        console.log(`Updated Appareil:`, { ...Appareil, [name]: value });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Appareil on submit:", Appareil);
        const AppareilOpbject = {
            marque: Appareil.marque,
            modele: Appareil.modele,
            numSerie: Appareil.numSerie,
            client: { id: Appareil.clientID }
        };
        console.log("Payload on submit:", AppareilOpbject);
        axios.post("http://localhost:8080/api/addAppareil", AppareilOpbject)
            .then((res : any)  => {
                setAppareil({ marque: '', modele: '', numSerie: '' , clientID: ''})
            }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div>
            {/* Dashboard with Sidebar */}
            <Dashboard sidebarOpen={true} setSidebarOpen={true}/>

            <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="ml-64 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Ajouter Appareil</h2>

                    <div className="mt-10 space-y-8">
                        {/* Marque Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 text-left">
                                Marque
                            </label>
                            <div className="mt-2">
                                <input
                                    id="marque"
                                    name="marque"
                                    type="text"
                                    value={Appareil.marque}
                                    onChange={handleChange}
                                    placeholder="Marque de l'appareil"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {/* modele Input */}
                        <div>
                            <label htmlFor="adresse" className="block text-sm font-medium text-gray-900 text-left">
                                Modele
                            </label>
                            <div className="mt-2">
                                <input
                                    id="modele"
                                    name="modele"
                                    type="text"
                                    value={Appareil.modele}
                                    onChange={handleChange}
                                    placeholder="Modele de l'appareil"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {/* Numero Serie Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 text-left">
                                Numero Serie
                            </label>
                            <div className="mt-2">
                                <input
                                    id="numSerie"
                                    name="numSerie"
                                    value={Appareil.numSerie}
                                    onChange={handleChange}
                                    placeholder="Numero Serie"
                                    type="text"
                                    autoComplete="tel"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        {/* id Client Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 text-left">
                                Client
                            </label>
                            <select
                                name="clientID"
                                value={Appareil.clientID}
                                onChange={handleChange}
                                className={`relative z-20 w-full text-black rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                                }`}
                            >
                                <option value=" ">Select a Client</option>
                                {clients.map((client: any):any => (
                                    <option key={client.id} value={client.id}>
                                        {client.nom}-{client.id}
                                    </option>
                                ))}
                            </select>
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
                        Ajouter
                    </button>
                </div>
            </form>
        </div>

    );
}

export default AddAppareils;
