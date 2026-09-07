import React, { useState } from "react";
import "../styles/help.css";
import { supabase } from "../lib/supabase"; // nel tuo caso: src/lib/supabase.js


const Help = () => {
    const [status, setStatus] = useState("idle");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [messageError, setMessageError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if (status === "sending") return;

        // Reset errors
        setNameError("");
        setEmailError("");
        setMessageError("");

        let hasError = false;

        // Validation Rules
        if (name.length < 4) {
            setNameError("MIN LENGTH: 4 CHARS");
            hasError = true;
        }

        if (!email.includes("@")) {
            setEmailError("INVALID EMAIL FORMAT");
            hasError = true;
        }

        if (message.length < 10) {
            setMessageError("MIN LENGTH: 10 CHARS");
            hasError = true;
        }

        if (hasError) return;

        setStatus("sending");

        try {
            const { data, error } = await supabase.functions.invoke("send-help-email", {
                body: {
                    name,
                    email,
                    message,
                },
            });

            if (error) throw error;
            if (!data?.ok) throw new Error("Email not sent");

            setStatus("sent");

            // Optional: reset form after success
            setName("");
            setEmail("");
            setMessage("");

            setTimeout(() => setStatus("idle"), 2000);
        } catch (err) {
            console.error(err);
            setStatus("idle"); // o "error" se vuoi mostrare un messaggio
        }
    };

    return (
        <div className="h-full overflow-y-auto flex flex-col items-center sm:block xl:mt-30 p-5 md:p-10 md:pr-2">
            <div className="mb-8 text-center sm:text-left">
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">System Help</p>
                <h2 className="text-4xl font-extrabold mt-2">PLAYER</h2>
                <p className="text-white/70 mt-2 max-w-xl">Fill out the request to receive assistance</p>
            </div>

            <form
                onSubmit={onSubmit}
                autoComplete="on"
                className="system-form max-w-xl w-full"
                noValidate
            >
                <div className="system-row">
                    <label className="system-label" htmlFor="name">
                        Name
                    </label>
                    <div className="w-full">
                        <div className="system-field">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Insert your name"
                                className={`system-input ${nameError ? "system-input-error" : ""}`}
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
                    <label className="system-label" htmlFor="email">
                        E-mail
                    </label>
                    <div className="w-full">
                        <div className="system-field">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Insert your email"
                                className={`system-input ${emailError ? "system-input-error" : ""}`}
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
                    <label className="system-label" htmlFor="message">
                        Message
                    </label>
                    <div className="w-full">
                        <div className="system-field">
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Insert your message"
                                className={`system-input system-textarea ${messageError ? "system-input-error" : ""}`}
                                autoComplete="off"
                                rows={4}
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    if (messageError) setMessageError("");
                                }}
                            />
                            <span className="system-underline" />
                        </div>
                        {messageError && <span className="system-error-msg">{messageError}</span>}
                    </div>
                </div>

                <button
                    type="submit"
                    className={`system-submit ${status === "sending" ? "is-loading" : ""} ${status === "sent" ? "is-sent" : ""
                        }`}
                    disabled={status === "sending"}
                >
                    <span className="system-submit__text">
                        {status === "sending" ? "PROCESSING..." : status === "sent" ? "REQUEST SENT" : "SUBMIT REQUEST"}
                    </span>
                    <span className="system-submit__scan" />
                    <span className="system-submit__glint" />
                </button>

                <div className={`system-hint ${status === "sent" ? "show" : ""}`}>
                    <span className="dot" />
                    System has received your request.
                </div>
            </form>
        </div>
    );
};

export default Help;