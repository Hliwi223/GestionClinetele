import {FormEvent, useState} from "react";



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const HandleLogin= (e:FormEvent<HTMLFormElement>)  => {
        e.preventDefault();
        if(password.length < 8 || password.length>10){
            setError('Le mot de passe doit étre entre 8 et 10 caractéres.');
            return;
        }else
            setError('');
    }

    return (

        <section className="text-gray-600 body-font mx-auto flex items-center justify-center min-h-screen">
            <div className="bg-gray-100 rounded-lg p-8 flex flex-col w-full max-w-md">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Connexion</h2>
                <form className="space-y-4" onSubmit={HandleLogin}>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email:</label>
                        <input type="email" id="email" name="full-name"  value={email} onChange={(e) => setEmail(e.target.value)}
                               className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Mot de Passe:</label>
                        <input type="password" id="password" name="email" value={password} onChange={(e) => setPassword(e.target.value)}
                               className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
                    </div>
                    {error && <div className="relative mb-4 text-red-700"> {error}</div>}
                    <button type="submit"
                            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full">Se Connecter
                    </button>
                </form>
                <p className="text-xs text-gray-500 mt-3"></p>
            </div>

        </section>


    )
}

export default Login;
