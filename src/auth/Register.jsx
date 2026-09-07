import React, { useState } from "react";
import "../styles/auth.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [terms, setTerms] = useState(false);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [termsError, setTermsError] = useState("");

    const { signUp } = useAuth();

    const validateEmail = (val) => {
        if (!val) return "EMAIL REQUIRED";
        if (!val.includes("@")) return "INVALID EMAIL FORMAT";
        return "";
    };

    const validatePassword = (val) => {
        if (!val) return "PASSWORD REQUIRED";
        if (val.length < 8) return "MIN LENGTH: 8 CHARS";
        if (!/[A-Z]/.test(val)) return "REQ: 1 UPPERCASE LETTER";
        if (!/[0-9]/.test(val)) return "REQ: 1 NUMBER";
        if (!/[^A-Za-z0-9]/.test(val)) return "REQ: 1 SPECIAL CHAR";
        return "";
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;

        setErrorMsg("");
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setTermsError("");

        let hasError = false;

        if (!name.trim()) {
            setNameError("NAME REQUIRED");
            hasError = true;
        }

        const eErr = validateEmail(email);
        if (eErr) {
            setEmailError(eErr);
            hasError = true;
        }

        const pErr = validatePassword(password);
        if (pErr) {
            setPasswordError(pErr);
            hasError = true;
        } else if (password !== confirm) {
            setPasswordError("PASSWORDS DO NOT MATCH");
            hasError = true;
        }

        if (!terms) {
            setTermsError("ACCEPTANCE REQUIRED");
            hasError = true;
        }

        if (hasError) return;

        setStatus("sending");

        try {
            await signUp(email, password, name);

            // con email confirmation ON:
            // qui mostriamo “CONFIRMATION SENT”
            setStatus("sent");
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMsg(err?.message || "SYSTEM ERROR: REGISTRATION FAILED");
        }
    };

    return (
        <div className="h-full overflow-y-auto flex flex-col items-center sm:block xl:mt-7.5 p-5 md:p-10 md:pr-2">
            <div className="mb-8 text-center sm:text-left">
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">System Registration</p>
                <h2 className="text-4xl font-extrabold mt-2">SIGN UP</h2>
                <p className="text-white/70 mt-2 max-w-xl">
                    Create a new player profile and initialize system access.
                </p>
            </div>

            <form onSubmit={onSubmit} autoComplete="on" className="system-form max-w-xl w-full" noValidate>
                <div className="system-row">
                    <label className="system-label" htmlFor="name">Name</label>
                    <div className="w-full">
                        <div className="system-field">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className={`system-input ${nameError ? "system-input-error" : ""}`}
                                placeholder="Insert your name"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (nameError) setNameError("");
                                }}
                            />
                            <span className="system-underline" />
                        </div>
                        {nameError && <span className="system-error-msg">{nameError}</span>}
                    </div>
                </div>

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
                                placeholder="Create a password"
                                autoComplete="new-password"
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

                <div className="system-row">
                    <label className="system-label" htmlFor="confirm">Confirm</label>
                    <div className="w-full">
                        <div className="system-field">
                            <input
                                id="confirm"
                                name="confirm"
                                type="password"
                                className={`system-input ${passwordError === "PASSWORDS DO NOT MATCH" ? "system-input-error" : ""}`}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                value={confirm}
                                onChange={(e) => {
                                    setConfirm(e.target.value);
                                    if (passwordError === "PASSWORDS DO NOT MATCH") setPasswordError("");
                                }}
                            />
                            <span className="system-underline" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className={`system-toggle system-toggle--wide ${termsError ? "system-toggle-error" : ""}`}>
                        <input
                            type="checkbox"
                            name="terms"
                            checked={terms}
                            onChange={(e) => {
                                setTerms(e.target.checked);
                                if (termsError) setTermsError("");
                            }}
                        />
                        <span className="system-box" aria-hidden="true" />
                        <span className="system-toggle__text">
                            I ACCEPT THE SYSTEM TERMS AND ACCESS POLICY.
                        </span>
                    </label>
                    {termsError && <span className="system-error-msg" style={{ marginTop: '8px' }}>{termsError}</span>}
                </div>

                <button
                    type="submit"
                    className={`system-submit ${status === "sending" ? "is-loading" : ""} ${status === "sent" ? "is-sent" : ""}`}
                    disabled={status === "sending"}
                >
                    <span className="system-submit__text">
                        {status === "sending"
                            ? "CREATING PROFILE..."
                            : status === "sent"
                                ? "CONFIRMATION SENT"
                                : "CREATE ACCOUNT"}
                    </span>
                    <span className="system-submit__scan" />
                    <span className="system-submit__glint" />
                </button>

                <div className={`system-hint ${status === "sent" ? "show" : ""}`}>
                    <span className="dot" />
                    Player profile created. Check your email to confirm access.
                </div>

                {status === "error" && (
                    <div className="system-hint show" style={{ opacity: 1, color: '#ff4d4d' }}>
                        <span className="dot" style={{ background: '#ff4d4d', boxShadow: '0 0 14px rgba(255, 77, 77, 0.4)' }} />
                        {errorMsg}
                    </div>
                )}

                <div className="system-footer">
                    <span className="text-white/70">Already registered?</span>
                    <Link to={"/login"} className="system-link">Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;