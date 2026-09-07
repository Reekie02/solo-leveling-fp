import { useCharacter } from "../context/CharacterContext"

const Status = () => {

    const { character } = useCharacter();

    if (!character) return null;

    const { status } = character;

    return (
        <div className="flex flex-col gap-8 text-white max-w-xl overflow-y-auto h-full">

            {/* HEADER */}
            <div>
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">
                    System Window
                </p>
                <h2 className="text-4xl font-extrabold mt-2">
                    STATUS
                </h2>
            </div>

            {/* TOP INFO */}
            <div className="grid grid-cols-2 gap-6">
                <div className="system-card">
                    <p className="label">Level</p>
                    <p className="value">{status.level}</p>
                </div>

                <div className="system-card">
                    <p className="label">Rank</p>
                    <p className="value">{status.rank}</p>
                </div>

                <div className="system-card">
                    <p className="label">Class</p>
                    <p className="value">{status.class}</p>
                </div>

                <div className="system-card">
                    <p className="label">Title</p>
                    <p className="value">Player</p>
                </div>
            </div>

            {/* STATS */}
            <div className="flex flex-col gap-4">
                <StatRow label="Strength" value={status.stats.strength} />
                <StatRow label="Agility" value={status.stats.agility} />
                <StatRow label="Perception" value={status.stats.perception} />
                <StatRow label="Vitality" value={status.stats.vitality} />
                <StatRow label="Intelligence" value={status.stats.intelligence} />
            </div>

            {/* FOOT NOTE */}
            <div className="border-l-2 border-white pl-6">
                <p className="text-sm leading-relaxed text-white/80">
                    {status.notes}
                </p>
            </div>

        </div>
    )
}

const StatRow = ({ label, value }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-40">
                <p className="uppercase text-xs tracking-[0.3em] text-white/65 w-80">
                    {label}
                </p>
                <p className="text-sm font-semibold text-white/90">
                    {value}
                </p>
            </div>

            <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${value}%` }} />
            </div>
        </div>
    )
}

export default Status