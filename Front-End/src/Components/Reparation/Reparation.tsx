import React, {useEffect, useState} from 'react';
import axios from "axios";
import Alert from "../customComponent/Alerts.tsx";
import Dashboard from "../dashboard/Dashboard.tsx";

interface ReparationPiece {
    pieceId: number;
    qte: number
}

interface Piece {
    id: number;
    code: string;
    nom: string;
    prixAchat: number;
}

const Reparation: React.FC= ()=> {


    const[reparation, setReparation]= useState({
        description: "",
        dateRep: new Date().toISOString().split("T")[0],
        tarifHMO:0,
        tempsMO:0,
        pieces:[] as ReparationPiece[],
        selectedPiece:'',
        demandeReparationid:'',
        quantity: 1
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        setReparation({ ...reparation, [name]: value });
        console.log(reparation)
    };
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [filteredPieces, setFilteredPieces] = useState<Piece[]>([]);
    const [demandeReparations, setDemandeReparations] = useState<any[]>([]);

    // Alert State
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const fetchPieces = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/pieces");
            setPieces(response.data);
            setFilteredPieces(response.data);
        } catch (error) {
            console.error("Error fetching pieces:", error);
        }
    };

    const fetchDemandeReparations = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/getReparations");
            const nonTermineDemande = response.data.filter((demande: any) => demande.etat !== "TERMINE");
            setDemandeReparations(nonTermineDemande);
        } catch (error) {
            console.error("Error fetching demandes de réparation:", error);
        }
    };

    useEffect(() => {
        fetchPieces();
        fetchDemandeReparations();
    }, []);

    useEffect(() => {
        // Update filteredPieces based on selected pieces
        const selectedPieceIds = reparation.pieces.map(p => p.pieceId);
        const remainingPieces = pieces.filter(piece => !selectedPieceIds.includes(piece.id));
        setFilteredPieces(remainingPieces);
    }, [reparation.pieces, pieces]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!reparation.description.trim()) {
            newErrors.description = "Description is required.";
        }

        if (!reparation.dateRep) {
            newErrors.dateRep = "Date de réparation is required.";
        }

        if (!reparation.demandeReparationid) {
            newErrors.demandeReparationid = "Demande Réparation is required.";
        }

        if (!reparation.tarifHMO || isNaN(Number(reparation.tarifHMO)) || Number(reparation.tarifHMO) <= 0) {
            newErrors.tarifHMO = "Tarif horaire must be a valid positive number.";
        }

        if (!reparation.tempsMO || isNaN(Number(reparation.tempsMO)) || Number(reparation.tempsMO) <= 0) {
            newErrors.tempsMO = "Temps de main-d'œuvre must be a valid positive number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit=  async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        if (!validateForm()) return;
        const reparationData = {
            description: reparation.description,
            dateRep: reparation.dateRep,
            tarifHMO: reparation.tarifHMO,
            tempsMO: reparation.tempsMO,
            demandeReparation: {id: reparation.demandeReparationid},
            reparationPieces: reparation.pieces.map((p) => ({
                pieceId: p.pieceId,
                qte: p.qte,
            })),
        };
        try {
            await axios.post("http://localhost:8080/api/reparations/create", reparationData);

            setAlertMessage("Réparation créée avec succès !");
            setAlertType("success");
            setIsAlertVisible(true);

            //Reset form
            setReparation({
                description: "",
                dateRep: new Date().toISOString().split("T")[0],
                tarifHMO: 0,
                tempsMO: 0,
                pieces: [],
                selectedPiece: '',
                demandeReparationid: '',
                quantity: 1
            });
        } catch (error) {
            console.error("Error creating reparation:", error);
            setAlertMessage("Erreur lors de la création de la réparation.");
            setAlertType("error");
            setIsAlertVisible(true);
        }
    };

    const handleAddPiece = () => {
        const selectedPiece = reparation.selectedPiece;
        const quantity = reparation.quantity;

        if (selectedPiece && quantity > 0) {
            setReparation((prevReparation) => ({
                ...prevReparation,
                pieces: [
                    ...prevReparation.pieces,
                    { pieceId: parseInt(selectedPiece), qte: quantity },
                ],
                selectedPiece: "",
                quantity: 1,
            }));
        }
    };

    const handleRemovePiece = (index: number) => {
        const updatedPieces = reparation.pieces.filter((_, i) => i !== index);
        setReparation((prevReparation) => ({
            ...prevReparation,
            pieces: updatedPieces,
        }));
    };
    return (
        <div className="">
            <Dashboard sidebarOpen={true} setSidebarOpen={()=>true}/>

            <form className="space-y-12" onSubmit={handleSubmit}>

                <div className="ml-64 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Créer une Réparation</h2>

                    <div className="mt-10 space-y-8">
                        {isAlertVisible && <Alert message={alertMessage} type={alertType}/>}
                        {/* Demande Input */}
                        <div>
                            <label htmlFor="demandeReparation"
                                   className="block text-sm font-medium text-gray-900 text-left">
                                Demande Reparation
                            </label>
                            <select
                                name="demandeReparationid"
                                value={reparation.demandeReparationid}
                                onChange={handleChange}
                                className={`relative z-20 w-full text-black rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                                }`}
                            >
                                <option value=" ">Sélectionner une pièce</option>
                                {demandeReparations.map((d: any): any => (
                                    <option key={d.id} value={d.id}>
                                        {d.id}-{d.etat}-{d.symptomesPanne}
                                    </option>
                                ))}
                            </select>
                            {errors.demandeReparationid && <p className="text-red-500 text-sm">{errors.demandeReparationid}</p>}
                        </div>
                        {/* Description Input */}
                        <div>
                            <label htmlFor="symptomesPanne"
                                   className="block text-sm font-medium text-gray-900 text-left">
                                Description
                            </label>
                            <div className="mt-2">
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={reparation.description}
                                    onChange={handleChange}
                                    placeholder="Description de la réparation"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>

                        {/* date Reparation Input
                        <div>
                            <label htmlFor="dateRep" className="block text-sm font-medium text-gray-900 text-left">
                                date de Réparation
                            </label>
                            <div className="mt-2">
                                <input
                                    id="dateRep"
                                    name="dateRep"
                                    value={reparation.dateRep}
                                    onChange={handleChange}
                                    type="date"
                                    autoComplete="dateRep"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>*/}
                        {/* Tarif Horaire de Main-d'Oeuvre: */}
                        <div>
                            <label htmlFor="tarifHMO" className="block text-sm font-medium text-gray-900 text-left">
                                Tarif Horaire de Main-d'Oeuvre:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="tarifHMO"
                                    name="tarifHMO"
                                    value={reparation.tarifHMO}
                                    onChange={handleChange}
                                    type="text"
                                    autoComplete="tarifHMO"
                                    placeholder="Tarif horaire"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                            {errors.tarifHMO && <p className="text-red-500 text-sm">{errors.tarifHMO}</p>}
                        </div>
                        {/* Temps de Main-d'Oeuvre (heures): */}
                        <div>
                            <label htmlFor="tempsMO" className="block text-sm font-medium text-gray-900 text-left">
                                Temps de Main-d'Oeuvre (heures):
                            </label>
                            <div className="mt-2">
                                <input
                                    id="tempsMO"
                                    name="tempsMO"
                                    value={reparation.tempsMO}
                                    onChange={handleChange}
                                    type="text"
                                    autoComplete="tempsMO"
                                    placeholder="Temps en heures"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                            {errors.tempsMO && <p className="text-red-500 text-sm">{errors.tempsMO}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 text-left">
                                Ajouter des pièce
                            </label>
                            <div className="flex gap-2 mt-2">
                                <select
                                    name="selectedPiece"
                                    value={reparation.selectedPiece}
                                    onChange={(e) =>
                                        setReparation({...reparation, selectedPiece: e.target.value})
                                    }
                                    className="relative z-20 w-full text-black rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary"
                                >
                                    <option value="">Sélectionner une pièce</option>
                                    {filteredPieces
                                        .map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.nom} - Prix: {p.prixAchat}TND
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="number"
                                    value={reparation.quantity}
                                    onChange={(e) =>
                                        setReparation({...reparation, quantity: parseInt(e.target.value)})
                                    }
                                    min={1}
                                    className="block  rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddPiece}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600"
                                >
                                    Ajouter
                                </button>
                            </div>


                        <ul className="mt-4">
                            {reparation.pieces.map((p, index) => (
                                <li key={index} className="flex justify-between bg-gray-100 p-2 mb-2">
                  <span>
                    Pièce ID: {p.pieceId} | Quantité: {p.qte}
                  </span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePiece(index)}
                                        className="text-red-500"
                                    >
                                        Supprimer
                                    </button>
                                </li>
                            ))}
                        </ul>



                {/* Pièce Input
                        <div>
                            <label htmlFor="selectedPiece" className="block text-sm font-medium text-gray-900 text-left">
                                Choisir une Pièce
                            </label>
                            <select
                                name="selectedPiece"
                                value={reparation.selectedPiece}
                                onChange={handleChange}
                                className={`relative z-20 w-full text-black rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                                }`}
                            >
                                <option value="">Sélectionner une pièce</option>
                                {pieces.map((p: any): any => (
                                    <option key={p.id} value={p.id}>
                                        {p.nom}-Prix:{p.prixAchat}TND
                                    </option>
                                ))}
                            </select>
                        </div>
                        */}
                {/* Quantité Input
                        <div>
                            <label htmlFor="quantity"
                                   className="block text-sm font-medium text-gray-900 text-left">
                                Quantité
                            </label>
                            <div className="mt-2">
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    value={reparation.quantity}
                                    onChange={handleChange}
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                                />
                            </div>
                        </div>
                        */}
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
</div>

    {/* Buttons */
    }
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

)
    ;
}

export default Reparation;