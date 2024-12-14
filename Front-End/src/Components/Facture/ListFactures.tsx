
import {List, Popover, Table} from "flowbite-react";
import  {useEffect, useState} from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard.tsx";
const ListFactures = () => {

    const [listFacture, setListFacture] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/factures").then(
            res=>{
                setListFacture(res.data);
                console.log(res.data);
            }).catch(error => {
            console.log(error);
        });
    }, []);
    const contentC=(c) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Nom : {c.nom}</List.Item>
                    <List.Item>Numero Tel : {c.numTel}</List.Item>
                </List>
            </div>
        </div>
    );
    const contentA=(a) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Appareil</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Marque: {a.marque}</List.Item>
                    <List.Item>Modele : {a.modele}</List.Item>
                    <List.Item>NumSerie: {a.numSerie}</List.Item>
                </List>
            </div>
        </div>
    );

    const contentR=(a) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Demande Reparation</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Date Depot: {new Date(a.dateRep).toLocaleDateString()}</List.Item>
                    <List.Item>Date Prevue : {new Date(a.datePrevueRep).toLocaleDateString()}</List.Item>
                    <List.Item>Etat : {a.etat}</List.Item>
                    <List.Item>Appareil : <Popover content={contentA(a.appareil)} placement="right">
                        <a href="#"
                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            {a.appareil.id}
                        </a>
                    </Popover></List.Item>
                    <List.Item>Client : <Popover content={contentC(a.client)} placement="right">
                        <a href="#"
                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            {a.client.id}
                        </a>
                    </Popover></List.Item>

                </List>
            </div>
        </div>
    );  const content=(a) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Reparation</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Date Rep: {new Date(a.dateRep).toLocaleDateString()}</List.Item>
                    <List.Item>description : {a.description}</List.Item>
                    <List.Item>TarifHMO : {a.tarifHMO}</List.Item>
                    <List.Item>Temps MO :{a.tempsMO}</List.Item>
                    <List.Item>Demande Reparation <Popover content={contentR(a.demandeReparation)} placement="right">
                        <a href="#"
                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                            {a.demandeReparation.id}
                        </a>
                    </Popover>
                    </List.Item>
                </List>
            </div>
        </div>
    );
    return (

        <div className=" flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={()=>true}/>
            <div className="">
                <Table hoverable className="ml-72">
                        <Table.Head>
                            <Table.HeadCell>Numero Facture</Table.HeadCell>
                            <Table.HeadCell>Date Creation</Table.HeadCell>
                            <Table.HeadCell>Montant Total</Table.HeadCell>
                            <Table.HeadCell>Reparation Id</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {listFacture.map((r: any) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {r.numero}
                                    </Table.Cell>
                                    <Table.Cell>{new Date(r.date).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{r.montantTotal} TND</Table.Cell>
                                    <Table.Cell><Popover content={content(r.reparation)} placement="right">
                                        <a href="#"
                                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            {r.reparation.id}
                                        </a>
                                    </Popover></Table.Cell>
                                    <Table.Cell>
                                        <a href="#"
                                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Imprimer
                                        </a>
                                    </Table.Cell>
                                </Table.Row>
                            ))}


                        </Table.Body>
                    </Table>
            </div>
        </div>
            );
            };

            export default ListFactures;