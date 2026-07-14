import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>

            <App />

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: "12px",
                        background: "#ffffff",
                        color: "#111827",
                        border: "1px solid #E5E7EB",
                    },
                    success: {
                        iconTheme: {
                            primary: "#BDEB25",
                            secondary: "#111827",
                        },
                    },
                }}
            />

        </AuthProvider>
    </StrictMode>
);