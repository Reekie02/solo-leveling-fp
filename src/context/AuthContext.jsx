import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(false);

    const [session, setSession] = useState(null);
    const [authUser, setAuthUser] = useState(null); // supabase user
    const [profile, setProfile] = useState(null); // { username }

    const fetchingProfileRef = useRef(false);

    const getFallbackUsername = (user) =>
        user?.user_metadata?.name ||
        user?.email?.split("@")?.[0] ||
        "Player";

    const fetchAndEnsureProfile = async (user) => {
        // evita doppie fetch contemporanee
        if (!user || fetchingProfileRef.current) return;
        fetchingProfileRef.current = true;
        setProfileLoading(true);

        try {
            // 1) prova a leggere profilo
            const { data: existing, error: readErr } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", user.id)
                .maybeSingle();

            if (readErr) {
                // Non bloccare l'app per errori RLS/tabella mancante
                console.warn("profiles read error:", readErr);
                // fallback locale
                setProfile({ username: getFallbackUsername(user) });
                return;
            }

            if (existing?.username) {
                setProfile({ username: existing.username });
                return;
            }

            // 2) se manca, crea fallback e upsert (background)
            const fallback = getFallbackUsername(user);

            const { error: upErr } = await supabase
                .from("profiles")
                .upsert(
                    { id: user.id, username: fallback },
                    { onConflict: "id" }
                );

            if (upErr) console.warn("profiles upsert error:", upErr);

            setProfile({ username: fallback });
        } finally {
            fetchingProfileRef.current = false;
            setProfileLoading(false);
        }
    };

    // bootstrap + listener
    useEffect(() => {
        let alive = true;

        const bootstrap = async () => {
            setAuthLoading(true);
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) console.warn("getSession error:", error);

                const s = data?.session ?? null;
                const u = s?.user ?? null;

                if (!alive) return;

                setSession(s);
                setAuthUser(u);

                // profilo in background (non blocca authLoading)
                setProfile(null);
                if (u) fetchAndEnsureProfile(u);
            } catch (e) {
                console.error("Auth bootstrap crashed:", e);
                if (!alive) return;
                setSession(null);
                setAuthUser(null);
                setProfile(null);
            } finally {
                if (!alive) return;
                setAuthLoading(false);
            }
        };

        bootstrap();

        const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (!alive) return;

            // QUI non rimettiamo authLoading a true: eviti flicker su refresh token
            const u = newSession?.user ?? null;

            setSession(newSession ?? null);
            setAuthUser(u);
            setProfile(null);

            if (u) fetchAndEnsureProfile(u);
        });

        return () => {
            alive = false;
            data?.subscription?.unsubscribe();
        };
    }, []);

    // API
    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    const signUp = async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } },
        });
        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    // user “comodo” per la UI (come il tuo)
    const user = useMemo(() => {
        if (!authUser) return null;
        return {
            id: authUser.id,
            email: authUser.email,
            username: profile?.username ?? getFallbackUsername(authUser),
        };
    }, [authUser, profile]);

    const value = useMemo(
        () => ({
            session,
            user,
            authUser,
            profile,
            authLoading,
            profileLoading,
            signIn,
            signUp,
            signOut,
        }),
        [session, user, authUser, profile, authLoading, profileLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);