















import React, { useState } from "react";
import "../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCharacter } from "../context/CharacterContext";

const Login = () => {
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error
    const [errorMsg, setErrorMsg] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();
    const { signIn } = useAuth();
    const { current } = useCharacter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateEmail = (val) => {
        if (!val) return "EMAIL REQUIRED";
        if (!val.includes("@")) return "INVALID EMAIL FORMAT";
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;

        // Reset errors
        setErrorMsg("");
        setEmailError("");
        setPasswordError("");

        // Validate
        const eErr = validateEmail(email);
        if (eErr || !password) {
            if (eErr) setEmailError(eErr);
            if (!password) setPasswordError("PASSWORD REQUIRED");
            // Optional: setStatus("error") se vuoi bloccare l'UI,
            // ma solitamente basta mostrare i messaggi sui campi
            return;
        }

        setStatus("sending");

        try {
            await signIn(email, password);

            setStatus("sent");
            setTimeout(() => {
                navigate(`/${current || "jinwoo"}`);
            }, 500);
        } catch (err) {
            console.error(err);
            setStatus("error");
            // Mettiamo un messaggio generico o specifico
            setErrorMsg("SYSTEM ERROR: ACCESS DENIED");
            // Se l'errore fosse specifico di credenziali, potremmo settare passwordError o emailError
        }
    };

    return (
        <div className="h-full overflow-y-auto flex flex-col items-center sm:block xl:mt-20 p-5 md:p-10 md:pr-2">
            <div className="mb-8 text-center sm:text-left">
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">System Access</p>
                <h2 className="text-4xl font-extrabold mt-2">LOGIN</h2>
                <p className="text-white/70 mt-2 max-w-xl">
                    Enter your credentials to access your player profile.
                </p>
            </div>

            <form onSubmit={onSubmit} autoComplete="on" className="system-form max-w-xl w-full" noValidate>
                <div className="system-row">
                    <label className="system-label" htmlFor="email">E-mail</label>
                    <div className="w-full">
                        <div className="system-field">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`system-input ${emailError ? "system-input-error" : ""}`}
                                placeholder="Insert your email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (emailError) setEmailError("");
                                }}
                            />
                            <span className="system-underline" />
                        </div>
                        {emailError && <span className="system-error-msg">{emailError}</span>}
                    </div>
                </div>

                <div className="system-row">
                    <label className="system-label" htmlFor="password">Password</label>
                    <div className="w-full">
                        <div className="system-field">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`system-input ${passwordError ? "system-input-error" : ""}`}
                                placeholder="Insert your password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (passwordError) setPasswordError("");
                                }}
                            />
                            <span className="system-underline" />
                        </div>
                        {passwordError && <span className="system-error-msg">{passwordError}</span>}
                    </div>
                </div>

                <div className="system-meta">
                    <label className="system-toggle">
                        <input type="checkbox" name="remember" />
                        <span className="system-box" aria-hidden="true" />
                        <span className="system-toggle__text">REMEMBER ME</span>
                    </label>

                    <button type="button" className="system-link">
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit"
                    className={`system-submit ${status === "sending" ? "is-loading" : ""} ${status === "sent" ? "is-sent" : ""}`}
                    disabled={status === "sending"}
                >
                    <span className="system-submit__text">
                        {status === "sending" ? "VERIFYING..." : status === "sent" ? "ACCESS GRANTED" : "LOGIN"}
                    </span>
                    <span className="system-submit__scan" />
                    <span className="system-submit__glint" />
                </button>

                <div className={`system-hint ${status === "sent" ? "show" : ""}`}>
                    <span className="dot" />
                    Session initialized. Welcome back.
                </div>

                {status === "error" && (
                    <div className="system-hint show" style={{ opacity: 1, color: '#ff4d4d' }}>
                        <span className="dot" style={{ background: '#ff4d4d', boxShadow: '0 0 14px rgba(255, 77, 77, 0.4)' }} />
                        {errorMsg}
                    </div>
                )}

                <div className="system-footer">
                    <span className="text-white/70">No account?</span>
                    <Link to={"/register"} className="system-link">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;