import React, {DetailedHTMLProps, SelectHTMLAttributes, useEffect, useState} from 'react';
import axios, {CancelToken} from "axios";
import Dashboard from "../dashboard/Dashboard.tsx";
import Alert from "../customComponent/Alerts.tsx";



const AddPiece: React.FC = () => {
    //alert
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const[typePieces, setTypePieces] = useState([])
    const [piece,setPiece]=useState({
        code: '',
        nom: '',
        prixAchat:'',
        prixHT: '',
        prixTTC: '',
        typePieceId: ''
    })
    useEffect(() => {
        axios.get("http://localhost:8080/api/typePiece")
            .then(res =>{
                setTypePieces(res.data);
                }
            ) .catch(err => {
            setIsAlertVisible(true)
            setAlertType('error');
            setAlertMessage(`Error ! fetching typePieces ${err.message}`);
         })
    }, []);
    const handleChange =  (e :React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> ) => {
        const { name, value } = e.target;
        setPiece({ ...piece, [name]: value });
    };

    const handleSubmit =  (e: React.FormEvent) => {
        e.preventDefault();
        console.log("piece on submit:", piece);
        const formData= {
            code: piece.code,
            nom: piece.nom,
            prixAchat:piece.prixAchat,
            prixHT: piece.prixHT,
            prixTTC: piece.prixTTC,
            typePiece: {id : piece.typePieceId}
        }
        console.log("Payload on submit:", formData);

             axios.post("http://localhost:8080/api/pieces/create", formData)
                 .then(
                     res =>{
                             setAlertType('success');
                             setAlertMessage('Piece Added');
                             setIsAlertVisible(true)
                             setPiece({
                                 code: "",
                                 nom: "",
                                 prixAchat: '',
                                 prixHT: '',
                                 prixTTC: '',
                                 typePieceId: '',
                             });
                     }
                 ).catch(
                     err => {
                                 setIsAlertVisible(true)
                                 setAlertType('error');
                                 setAlertMessage(`Error: ${err.response.data.message}`);
                 })

    }
    return (
        <div className="">
            <Dashboard sidebarOpen={true} setSidebarOpen={true}/>

            <form className="space-y-12" onSubmit={handleSubmit}>

                <div className="ml-64 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Créer une Réparation</h2>

                    <div className="mt-10 space-y-8">
                        {isAlertVisible && <Alert message={alertMessage} type={alertType}/>}
                        {/* code Input */}
                        <div>
                            <label htmlFor="code"
                                   className="block text-sm font-medium text-gray-900 text-left">
                                Code
                            </label>
                            <div className="mt-2">
                                <input
                                    id="code"
                                    name="code"
                                    type="text"
                                    value={piece.code}
                                    onChange={handleChange}
                                    placeholder="code de la Piece"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        {/* Nom Input */}
                        <div>
                            <label htmlFor="nom"
                                   className="block text-sm font-medium text-gray-900 text-left">
                                Nom
                            </label>
                            <div className="mt-2">
                                <input
                                    id="nom"
                                    name="nom"
                                    type="text"
                                    value={piece.nom}
                                    onChange={handleChange}
                                    placeholder="Nom de la Piece"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>

                        {/* Prix d'achat Input */}
                        <div>
                            <label htmlFor="prixAchat" className="block text-sm font-medium text-gray-900 text-left">
                                Prix d'achat
                            </label>
                            <div className="mt-2">
                                <input
                                    id="prixAchat"
                                    name="prixAchat"
                                    value={piece.prixAchat}
                                    onChange={handleChange}
                                    type="number"
                                    autoComplete="prixAchat"
                                    placeholder="Prix D'achat"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        {/* prix Ht input*/}
                        <div>
                            <label htmlFor="prixHT" className="block text-sm font-medium text-gray-900 text-left">
                                Prix Hors Tax
                            </label>
                            <div className="mt-2">
                                <input
                                    id="prixHT"
                                    name="prixHT"
                                    value={piece.prixHT}
                                    onChange={handleChange}
                                    type="text"
                                    autoComplete="prixHT"
                                    placeholder="Prix HT"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        {/* Prix TTC*/}
                        <div>
                            <label htmlFor="prixTTC" className="block text-sm font-medium text-gray-900 text-left">
                               Prix TTC
                            </label>
                            <div className="mt-2">
                                <input
                                    id="prixTTC"
                                    name="prixTTC"
                                    value={piece.prixTTC}
                                    onChange={handleChange}
                                    type="text"
                                    autoComplete="prixTTC"
                                    placeholder=" Prix TTC"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        {/* Type Piece  Input */}
                        <div>
                            <label htmlFor="typePieceId"
                                   className="block text-sm font-medium text-gray-900 text-left">
                                Choisir le Type de piece
                            </label>
                            <select
                                name="typePieceId"
                                value={piece.typePieceId}
                                onChange={handleChange}
                                className={`relative z-20 w-full text-black rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                                }`}
                            >
                                <option value=" ">Sélectionner Type de piece</option>
                                {typePieces.map((t: any): any => (
                                    <option key={t.id} value={t.id}>
                                        {t.type}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Status Input
                        <div>
                            <label htmlFor="etat" className="block text-sm font-medium text-gray-900 text-left">
                                Statut de la demande :
                            </label>
                            <select
                                id="etat"
                                name="etat"
                                value={demandeReparation.etat}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                required
                            >
                                <option value="EN_ATTENTE">En Attente</option>
                                <option value="EN_COURS">En Cours</option>
                                <option value="TERMINE">Terminée</option>
                            </select>
                        </div>*/}
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
};

export default AddPiece;