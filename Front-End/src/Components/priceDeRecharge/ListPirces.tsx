import React, {useEffect, useState} from 'react';
import Dashboard from "../dashboard/Dashboard.tsx";
import Alert from "../customComponent/Alerts.tsx";
import axios from "axios";
import {Table} from "flowbite-react";

const ListPirces = () => {

    const[Pieces,setPieces]= useState([]);
    const fetchPieces = async (): Promise<void> => {
        axios.get("http://localhost:8080/api/pieces")
            .then((r)=>
                setPieces(r.data))
            .catch(error =>{
                console.log("error fetching pieces",error);
            })
    }
    useEffect(() => {
        fetchPieces()
    }, []);
    return (
        <div className=" flex">
            <Dashboard sidebarOpen={true} setSidebarOpen={()=>true}/>
            <div className="">
                <Table hoverable className="ml-52">
                    <Table.Head>
                        <Table.HeadCell>Code</Table.HeadCell>
                        <Table.HeadCell>Nom</Table.HeadCell>
                        <Table.HeadCell>Prix d'Achat</Table.HeadCell>
                        <Table.HeadCell>prix HT</Table.HeadCell>
                        <Table.HeadCell>prix ttc</Table.HeadCell>
                        <Table.HeadCell>Piece Type</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {Pieces.map((p: any) => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {p.code}
                                </Table.Cell>
                                <Table.Cell>{p.nom}</Table.Cell>
                                <Table.Cell>{p.prixAchat}</Table.Cell>
                                <Table.Cell>{p.prixHT}</Table.Cell>
                                <Table.Cell>{p.prixTTC}</Table.Cell>
                                <Table.Cell>{p.typePiece.type}</Table.Cell>

                            </Table.Row>
                        ))}


                    </Table.Body>
                </Table>
            </div>
        </div>
            );
            };

            export default ListPirces;