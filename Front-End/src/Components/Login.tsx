import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const HandleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic input validation
        if (!userName || !password) {
            setError("Veuillez remplir tous les champs.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/authenticate",
                {
                    email: userName, // Assuming email is the username
                    password: password,
                }
            );

            const token = response.data.token;
            // Save token to localStorage
            localStorage.setItem("token", token);

            navigate("/dashboard");
        } catch (error) {
            setError("Identifiant ou mot de passe incorrect.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="text-gray-600 body-font mx-auto flex items-center justify-center min-h-screen">
            <div className="bg-gray-100 rounded-lg p-8 flex flex-col w-full max-w-md">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                    Connexion
                </h2>
                <form className="space-y-4" onSubmit={HandleLogin}>
                    <div className="relative mb-4">
                        <label
                            htmlFor="email"
                            className="leading-7 text-sm text-gray-600"
                        >
                            UserName:
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="full-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            required
                        />
                    </div>
                    <div className="relative mb-4">
                        <label
                            htmlFor="password"
                            className="leading-7 text-sm text-gray-600"
                        >
                            Mot de Passe:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            required
                        />
                    </div>
                    {error && (
                        <div className="relative mb-4 text-red-700">{error}</div>
                    )}
                    <button
                        type="submit"
                        disabled={loading} // Disable button while loading
                        className={`text-white border-0 py-2 px-8 focus:outline-none rounded text-lg w-full ${
                            loading
                                ? "bg-indigo-300 cursor-not-allowed"
                                : "bg-indigo-500 hover:bg-indigo-600"
                        }`}
                    >
                        {loading ? "Connexion en cours..." : "Se Connecter"}
                    </button>
                </form>
                <p className="text-xs text-gray-500 mt-3"></p>
            </div>
        </section>
    );
}

export default Login;
