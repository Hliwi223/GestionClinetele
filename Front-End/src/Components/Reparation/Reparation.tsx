import React, {useEffect, useState} from 'react';
import axios from "axios";
import Alert from "../customComponent/Alerts.tsx";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import Dashboard from "../dashboard/Dashboard.tsx";




interface ReparationPiece {
    pieceId: number;
    qte: number;
}

interface Piece {
    id: number;
    code: string;
    nom: string;
    prixAchat: number;
}


interface TypePiece {
    id: number;
    type: string;
    tarifH: number;
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReparation({ ...reparation, [name]: value });
    };
    const [pieces, setPieces]= useState<Piece[]>([]);
    const  [typePiece, setTypePiece]= useState<TypePiece[]>([]);
    const [demandeReparations , setDemandeReparations]= useState<ReparationPiece[]>([]);

    //alert
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const fetchPieces = async (): Promise<void> => {
        axios.get("http://localhost:8080/api/pieces")
            .then((r)=>
                setPieces(r.data))
            .catch(error =>{
                console.log("error fetching pieces",error);
            })
    }
    const fetchTypePieces = async (): Promise<void> => {
        axios.get("http://localhost:8080/api/reparation-pieces")
            .then((r)=>
                setTypePiece(r.data))
            .catch(error =>{
                console.log("error fetching tpe pieces:",error);
            })
    }
    const fetchDemandeReparations = async (): Promise<void> => {
        axios.get("http://localhost:8080/api/getReparations")
            .then((r)=>
                setDemandeReparations(r.data))
            .catch(error =>{
                console.log("error fetching tpe pieces:",error);
            })
    }

    useEffect(() => {
        fetchPieces()
        fetchTypePieces()

        fetchDemandeReparations()
    }, []);

    const handleAddPiece = () =>{
        if(reparation.selectedPiece && reparation.quantity >0){
            setReparation((pr :any )=> ({
                ...pr ,
                pieces: [
                    ...pr.pieces,
                    {pieceId:reparation.selectedPiece , qte:reparation.quantity}
                ],
                quantity: 1,
            }));
        }
    }
    const handleRemovePiece =   (index :number) =>{
        const  updatePiece = reparation.pieces.filter((_,i)=>i!==index);
        setReparation((pr:any)=> (
            {
                ...pr,
                pieces: updatePiece,
            }
        ))
    }

    const createFacture =  (factureData)=>{
         axios.post("http://localhost:8080/api/factures/create", factureData)
            .then((f: any) => {
                setIsAlertVisible(true);
                setAlertMessage("Réparation et facture créées avec succès !");
                setAlertType('success');

            }).catch(error => {
                console.log("Error creating facture:", error);
         })
    }
    const handleSubmit=  async ()=> {
        const reparationData = {
            description: reparation.description,
            dateRep: reparation.dateRep,
            tarifHMO: reparation.tarifHMO,
            tempsMO: reparation.tempsMO,
            demandeReparation: {id: reparation.demandeReparationid},
            reparationPieces: reparation.pieces.map((p) => ({
                pieceId: p.pieceId,
                qte: p.pieceId,
            })),
        };

        await axios.post("http://localhost:8080/api/reparations/create", reparationData)
            .then((r: any) => {

                const factureData = {
                    reparation: {
                        id: r.data.id,
                    },
                    date:r.data.dateRep,
                    numero: `FAC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
                    montantTotal: 0

                }
                createFacture(factureData);
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
            })
            .catch((error) => {
                console.log("Error creating reparation:", error);
                setAlertMessage("Erreur lors de la création de la réparation.");
                setAlertType('error');
                setIsAlertVisible(true);
            })



    }
    return (
        <div className="">
            <Dashboard sidebarOpen={true} setSidebarOpen={true}/>

            <form className="space-y-12" onSubmit={handleSubmit}>

                <div className="ml-64 border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">Créer une Réparation</h2>

                    <div className="mt-10 space-y-8">
                        {isAlertVisible &&  <Alert message={alertMessage} type={alertType}/>}
                        {/* Demande Input */}
                        <div>
                            <label htmlFor="demandeReparation" className="block text-sm font-medium text-gray-900 text-left">
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
                        </div>

                        {/* date Reparation Input */}
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
                        </div>
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
                        </div>
                        {/* Pièce Input */}
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

                        {/* Quantité Input */}
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

    )
        ;
}

export default Reparation;