import  { useEffect, useState} from "react";
import Dashboard from "../dashboard/Dashboard.tsx";
import axios from "axios";
import {Table} from "flowbite-react";



function  Clients(){


    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/clients").then(
            res=>{
                setClients(res.data);
            }).catch(error => {
            console.log(error);
        });
    }, []);

    return (

            <div className=" flex">
                <Dashboard sidebarOpen={true} setSidebarOpen={()=>true}/>

                    <Table hoverable className=" ml-80">
                        <Table.Head>
                            <Table.HeadCell>Nom</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only"></span>
                            </Table.HeadCell>
                            <Table.HeadCell>Adresse</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only"></span>
                            </Table.HeadCell>
                            <Table.HeadCell>NumTel</Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">
                            {clients.map((c: any) => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {c.nom}
                                    </Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>{c.adresse}</Table.Cell>
                                    <Table.Cell></Table.Cell>
                                    <Table.Cell>{c.numTel}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
    );

}

export default Clients;