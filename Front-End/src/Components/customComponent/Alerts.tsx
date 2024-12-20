import  { useState } from "react";
interface AlertProps {
    message: string;
    type?: "error" | "success";
}
const Alert = ({ message, type = "error" }:AlertProps) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div id="alert-border-2"
             className={`flex items-center p-4 mb-4  ${type == "error" ? "text-red-800 bg-red-50 border-red-300" : "text-green-800 border-green-300 bg-green-50" } border-t-4  `}
            role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <div className="ms-3 text-sm font-medium">
                {message}
            </div>
            <button type="button"
                    onClick={handleDismiss}
                    className={`ms-auto -mx-1.5 -my-1.5 ${type == "error" ? "bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200 " :"bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200 " }  rounded-lg focus:ring-2  p-1.5  inline-flex items-center justify-center h-8 w-8 `}
                    data-dismiss-target="#alert-border-2" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    );
};

export default Alert;
