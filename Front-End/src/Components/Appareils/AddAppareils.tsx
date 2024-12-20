import Dashboard from "../dashboard/Dashboard.tsx";
import {FormEvent, useEffect, useState} from "react";
import  axios from "axios";
import Alert from "../customComponent/Alerts.tsx";
import { useNavigate } from "react-router-dom";


function  AddAppareils() {
    const navigate = useNavigate();

    // Alert state
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    // Appareil state
    const [Appareil, setAppareil] = useState(
        {
            marque:'',
            modele:'',
            numSerie:'',
        });

    // Check if appareil already exists
    const checkIfAppareilExists = async (numSerie: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return false;
            }
            const response = await axios.get(`http://localhost:8080/api/appareils/exists/${numSerie}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error checking if appareil exists:", error);
            return false;
        }
    };

    // Handle input changes
    const handleChange =   ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAppareil({ ...Appareil, [name]: value });
    };

    // Handle form submission
    const handleSubmit =async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // Validate inputs
        if (!Appareil.marque || !Appareil.modele || !Appareil.numSerie ) {
            setAlertMessage("Tous les champs sont obligatoires.");
            setAlertType("error");
            setIsAlertVisible(true);
            return;
        }

        // Check if the appareil already exists
        const exists = await checkIfAppareilExists(Appareil.numSerie);
        if (exists) {
            setAlertMessage("Un appareil avec ce numéro de série existe déjà.");
            setAlertType("error");
            setIsAlertVisible(true);
            return;
        }

        const AppareilOpbject = {
            marque: Appareil.marque,
            modele: Appareil.modele,
            numSerie: Appareil.numSerie,
            client: null
        };
        try {
            await axios.post("http://localhost:8080/api/addAppareil", AppareilOpbject ,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setAlertMessage("Appareil ajouté avec succès !");
            setAlertType("success");
            setIsAlertVisible(true);

            // Reset form
            setAppareil({
                marque: "",
                modele: "",
                numSerie: "",
            });
        }catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error("Error adding appareil:", error);
                setAlertMessage("Erreur lors de l'ajout de l'appareil.");
                setAlertType("error");
                setIsAlertVisible(true);
            }
        }
    };
    useEffect(() => {
        if (isAlertVisible) {
            const timer = setTimeout(() => setIsAlertVisible(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isAlertVisible]);
    return (
        <div>
            {/* Dashboard with Sidebar */}
            <Dashboard sidebarOpen={true} setSidebarOpen={()=> true}/>

            <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="ml-64 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Ajouter Appareil</h2>

                    <div className="mt-10 space-y-8">
                        {isAlertVisible &&  <Alert message={alertMessage} type={alertType}/>}
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
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold text-gray-900"
                        onClick={() => setAppareil({ marque: "", modele: "", numSerie: "" })}
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
