import { useEffect, useMemo, useState } from "react";

const rand = (min, max) => Math.random() * (max - min) + min;

const LeafEffect = ({ count = 18 }) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    const leaves = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            right: rand(-20, 100),
            delay: rand(0, 6),
            duration: rand(7, 14),
            size: rand(40, 22),
            driftX: rand(300, 900),
            rotate: rand(-180, 180),
            blur: rand(0),
            opacity: rand(0.15, 0.45),
            color: Math.random() > 0.5 ? 'rgba(220, 140, 60, 0.9)' : 'rgba(170, 80, 30, 0.9)'
        }));
    }, [count]);

    if (!ready) return null;

    return (
        <div className="leaf-layer" aria-hidden="true">
            {leaves.map((l) => (
                <span
                    key={l.id}
                    className="leaf"
                    style={{
                        right: `${l.right}%`,
                        animationDelay: `${l.delay}s`,
                        animationDuration: `${l.duration}s`,
                        width: `${l.size}px`,
                        height: `${l.size * 0.65}px`,
                        transform: `translateX(0) rotate(${l.rotate}deg)`,
                        filter: `blur(${l.blur}px)`,
                        opacity: l.opacity,
                        "--driftX": `${l.driftX}px`,
                        background: `radial-gradient(circle at 30% 30%, ${l.color}, rgba(120, 60, 20, 0.9))`,
                    }}
                />
            ))}
        </div>
    );
};

export default LeafEffect;