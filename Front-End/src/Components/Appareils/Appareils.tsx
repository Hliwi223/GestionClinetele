import  {useEffect, useState} from 'react';
import axios from "axios";
import Dashboard from "../dashboard/Dashboard.tsx";
import {List, Popover, Table} from "flowbite-react";


interface  client{
    id:number
    adresse: string
    nom: string
    numTel: string
}
function Appareils():any {
    const [appareils, setAppareils] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/appareils").then(
            res=>{
                setAppareils(res.data);
                console.log(appareils)
            }).catch(error => {
            console.log(error);
        });
    }, []);
    const content=(c:client) => (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Client</h3>
            </div>
            <div className="px-3 py-2">
                <List>
                    <List.Item>ID : {c.id}</List.Item>
                    <List.Item>Nom : {c.nom}</List.Item>
                    <List.Item>Numero Tel : {c.numTel}</List.Item>
                </List>
            </div>
        </div>
    );
    return (

            <div className=" flex">
                <Dashboard sidebarOpen={true} setSidebarOpen={()=>true}/>
                <div className="">
                    <Table hoverable className="ml-80">
                        <Table.Head>
                            <Table.HeadCell>Marque</Table.HeadCell>
                            <Table.HeadCell>Modele</Table.HeadCell>
                            <Table.HeadCell>Num Serie</Table.HeadCell>
                            <Table.HeadCell>Client ID</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {appareils.map((a: any) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {a.marque}
                                    </Table.Cell>
                                    <Table.Cell>{a.modele}</Table.Cell>
                                    <Table.Cell>{a.numSerie}</Table.Cell>
                                    <Table.Cell>
                                        {a.client == null ? "Not Selected" : <Popover content={content(a.client)} placement="right">
                                            <a href="#"
                                               className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                {a.client.id}
                                            </a>
                                        </Popover> }

                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>

    );

}

export default Appareils;