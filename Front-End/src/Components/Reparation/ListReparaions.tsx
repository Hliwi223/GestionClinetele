import React, {useEffect, useState} from "react";
import axios from "axios";
import Dashboard from "../dashboard/Dashboard.tsx";

import {List, Popover, Table} from "flowbite-react";

const ListReparaions = ()=> {


    const [reparations, setReparations] = useState([]);
    //alert
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const fetchDemandeReparation =  () => {
        axios.get("http://localhost:8080/api/reparations").then(
            res=>{
                setReparations(res.data);
                console.log(res.data);
            }).catch(error => {
                setIsAlertVisible(true);
                setAlertType('error');
                setAlertMessage('Erreur de chargement des réparations');
            console.log(error);
        })};
        useEffect(() => {
            fetchDemandeReparation();
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
    const content=(a) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Demande Reparation</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>Date Depot: {new Date(a.dateDepotAppareil).toLocaleDateString()}</List.Item>
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
    );
    return (
        <div className=" flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={true}/>
            <div className="">
                <Table hoverable className="ml-44">
                    <Table.Head>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>dateRep</Table.HeadCell>
                        <Table.HeadCell>description</Table.HeadCell>
                        <Table.HeadCell>tarifHMO</Table.HeadCell>
                        <Table.HeadCell>tempsMO</Table.HeadCell>
                        <Table.HeadCell>Demande Reparation</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {reparations.map((r: any) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell></Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {new Date(r.dateRep).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>{r.description}</Table.Cell>
                                <Table.Cell>{r.tarifHMO}</Table.Cell>
                                <Table.Cell>{r.tempsMO}</Table.Cell>
                                <Table.Cell>
                                    <Popover content={content(r.demandeReparation)}  placement="right">
                                        <a href="#"
                                           className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            {r.demandeReparation.id}
                                        </a>
                                    </Popover></Table.Cell>
                            </Table.Row>
                        ))}


                    </Table.Body>
                </Table>
            </div>
        </div>
)
    ;
}

export default ListReparaions