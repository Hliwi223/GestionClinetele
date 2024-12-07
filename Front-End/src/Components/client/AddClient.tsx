import Dashboard from "../dashboard/Dashboard.tsx";
import {FormEvent, useState} from "react";
import  axios from "axios";


function AddClient() {

    const [client, setClient] = useState(
        {
            nom:'',
            adresse:'',
            numTel:''
        });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/addClient", client)
            .then(res  => {
                setClient({ nom: '', adresse: '', numTel: '' })
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
                    <h2 className="text-lg font-semibold text-gray-900">Ajouter Client</h2>

                    <div className="mt-10 space-y-8">
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
                                    placeholder="Client Adresse "
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {/* Phone Number Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 text-left">
                                Téléphone
                            </label>
                            <div className="mt-2">
                                <input
                                    id="phone"
                                    name="numTel"
                                    value={client.numTel}
                                    onChange={handleChange}
                                    type="text"
                                    autoComplete="tel"
                                    placeholder="Numero Télephone"
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
                        Ajouter
                    </button>
                </div>
            </form>
        </div>

    );
}

export default AddClient;
