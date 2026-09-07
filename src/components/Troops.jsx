import { useCharacter } from "../context/CharacterContext";

const Troops = () => {
    const { character } = useCharacter();

    if (!character) return null;

    const { troops } = character;


    return (
        <div className="flex flex-col gap-8 text-white max-w-xl overflow-y-auto h-full">

            {/* HEADER */}
            <div>
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">
                    System Window
                </p>
                <h2 className="text-4xl font-extrabold mt-2">
                    TROOPS
                </h2>
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-2 gap-6">
                <div className="system-card">
                    <p className="label">Shadows</p>
                    <p className="value">10+</p>
                </div>

                <div className="system-card">
                    <p className="label">Command</p>
                    <p className="value">Absolute</p>
                </div>
            </div>

            {/* LIST */}
            <div className="flex flex-col gap-4">
                {troops.slice(0, -1).map((t) => (
                    <div key={t.name} className="system-card">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-lg font-semibold text-white truncate">
                                    {t.name}
                                </p>
                                <p className="text-sm text-white/65">
                                    {t.role}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className={`troop-badge troop-${t.state.toLowerCase().replace(' ', '-')}`}>
                                    {t.state}
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="mini-label">Rank</span>
                                    <span className="mini-value">{t.rank}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* NOTE */}
            <div className="border-l-2 border-white pl-6">
                <p className="text-sm leading-relaxed text-white/80">
                    {troops[troops.length - 1].notes}
                </p>
            </div>

        </div>
    )
}

export default Troops