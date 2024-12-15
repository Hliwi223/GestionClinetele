
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup.tsx";

import React from 'react';


interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

function Dashboard({ sidebarOpen, setSidebarOpen  }: SidebarProps):any {

    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);
    const navigate = useNavigate();
    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );
// Check for token and redirect if missing
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
// close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(true);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });



    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);



    return (

        <aside

            className={`text-white fixed left-0 top-0 bottom-0   w-72 bg-black  border-r ${
                sidebarExpanded ? 'block' : 'hidden'
            } md:block`}
        >
            <div className="   flex flex-col h-full overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Gestion Client Dashboard --> */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/' || pathname.includes('dashboard')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname === '/' ||
                                                        pathname.includes('dashboard')) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                Gérer CLients
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            {/* <!-- Dropdown Menu Start --> */}
                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <a
                                                            href="/AddClient"
                                                            className={({isActive}:any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Ajouter
                                                            Client
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="/Clients"
                                                            className={({isActive}:any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            List clients
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <!-- Dropdown Menu End --> */}
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* <!-- Gestion Appareils Dashboard --> */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/' || pathname.includes('dashboard')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname === '/' ||
                                                        pathname.includes('dashboard')) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                Gérer Appareils
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>
                                            {/* <!-- Dropdown Menu Start --> */}
                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <a
                                                            href="/AddAppareil"
                                                            className={({isActive}:any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Ajouter
                                                            Appareil
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="/Appareils"
                                                            className={({isActive}:any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            List Appareils
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <!-- Dropdown Menu End --> */}
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* <!-- Gestion Reparation Dashboard --> */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/' || pathname.includes('dashboard')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname === '/' ||
                                                        pathname.includes('dashboard')) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                Gérer Reparation
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>


                                            {/* <!-- Dropdown Menu Start --> */}
                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <a
                                                            href="/demandeReparation"
                                                            className={({isActive}: any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Demande
                                                            Reparation
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="/listDemande"
                                                            className={({isActive}: any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            List
                                                            Demande
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="/createReparation"
                                                            className={({isActive}: any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Creer
                                                            Reparation
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="/Reparations"
                                                            className={({isActive}: any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            List
                                                            Reparation
                                                        </a>
                                                    </li> <li>
                                                    <a
                                                        href="/listFacture"
                                                        className={({isActive}: any): any =>
                                                            'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                            (isActive && '!text-white')
                                                        }
                                                    >
                                                        List
                                                        Factures
                                                    </a>
                                                </li>


                                                </ul>
                                            </div>
                                            {/* <!-- Dropdown Menu End --> */}
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* <!-- Gestion PieceRecharge  Dashboard --> */}
                            <SidebarLinkGroup
                                activeCondition={
                                    pathname === '/' || pathname.includes('dashboard')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                                    (pathname === '/' ||
                                                        pathname.includes('dashboard')) &&
                                                    'bg-graydark dark:bg-meta-4'
                                                }`}
                                                onClick={(e: any) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                Gérer PieceRecharge
                                                <svg
                                                    className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                                        open && 'rotate-180'
                                                    }`}
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </NavLink>


                                            {/* <!-- Dropdown Menu Start --> */}
                                            <div
                                                className={`translate transform overflow-hidden ${
                                                    open && 'hidden'
                                                }`}
                                            >
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <a
                                                            href="/createPiece"
                                                            className={({isActive}: any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            Ajouter Piece

                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="/listPieces"
                                                            className={({isActive}: any): any =>
                                                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                                                (isActive && '!text-white')
                                                            }
                                                        >
                                                            List
                                                            Piece
                                                        </a>
                                                    </li>



                                                </ul>
                                            </div>
                                            {/* <!-- Dropdown Menu End --> */}
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            {/* <!-- Menu Item Dashboard --> */}
                            {/* <!-- Menu Item Settings --> */}

                        </ul>
                    </div>

                    {/* <!-- Others Group --> */}
                    <div>
                        <ul className="mb-6 flex flex-col gap-1.5">


                        </ul>
                    </div>
                </nav>
            </div>
            <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className="fixed top-4 left-4 md:hidden z-50 bg-white p-2 rounded-md"
            >
                <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>
        </aside>)
};

export default Dashboard;