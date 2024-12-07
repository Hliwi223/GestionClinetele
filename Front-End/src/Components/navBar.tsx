

function NavBar() {

        return (
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Bienvenue dans le tableau de bord</h2>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <ul className="flex space-x-9">
                            <li className="hover:text-gray-900">
                                <a href="/" className="transition-colors duration-300">tableau de bord</a>
                            </li>
                            <li className="hover:text-gray-900">
                                <a href="/clients" className="transition-colors duration-300">Gestion des Clients</a>
                            </li>
                            <li className="hover:text-gray-900">
                                <a href="/appareils" className="transition-colors duration-300">Gestion des Appareils</a>
                            </li>
                            <li className="hover:text-gray-900">
                                <a href="/reparations" className="transition-colors duration-300">Gestion des Réparations</a>
                            </li>
                            <li className="hover:text-gray-900">
                                <a href="/factures" className="transition-colors duration-300">Gestion des Factures</a>
                            </li>
                            <li className="hover:text-gray-900">
                                <a href="/catalogue" className="transition-colors duration-300">Catalogue de Pièces</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

        );
}


export default NavBar;