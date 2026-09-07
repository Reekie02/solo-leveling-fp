import { useCharacter } from "../context/CharacterContext";

const Skills = () => {
    const { character } = useCharacter();

    if (!character) return null;

    const { skills } = character;
    // const skills = [
    //     {
    //         name: "Shadow Extraction",
    //         type: "Skill",
    //         rank: "S",
    //         cooldown: "—",
    //         desc: "Extracts a shadow from a fallen target and adds it to the Shadow Army.",
    //     },
    //     {
    //         name: "Shadow Exchange",
    //         type: "Skill",
    //         rank: "A",
    //         cooldown: "30s",
    //         desc: "Instantly swaps positions with an active shadow within range.",
    //     },
    //     {
    //         name: "Ruler’s Authority",
    //         type: "Ability",
    //         rank: "S",
    //         cooldown: "12s",
    //         desc: "Manipulates objects with invisible force, allowing control and crushing power.",
    //     },
    //     {
    //         name: "Stealth",
    //         type: "Passive",
    //         rank: "A",
    //         cooldown: "—",
    //         desc: "Suppresses presence and sound, making detection significantly harder.",
    //     },
    // ]

    return (
        <div className="flex flex-col gap-8 text-white max-w-xl overflow-y-auto h-full">

            {/* HEADER */}
            <div>
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">
                    System Window
                </p>
                <h2 className="text-4xl font-extrabold mt-2">
                    SKILLS
                </h2>
            </div>

            {/* LIST */}
            <div className="flex flex-col gap-4">
                {skills.slice(0, -1).map((s) => (
                    <div key={s.name} className="system-card">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-lg font-semibold text-white truncate">
                                    {s.name}
                                </p>
                                <p className="text-sm text-white/65">
                                    {s.desc}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className={`skill-badge skill-${s.type.toLowerCase()}`}>
                                    {s.type}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="mini-label">Rank</span>
                                    <span className="mini-value">{s.rank}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <p className="uppercase text-xs tracking-[0.3em] text-white/55">
                                Cooldown
                            </p>
                            <p className="text-sm font-semibold text-white/85">
                                {s.cooldown}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* NOTE */}
            <div className="border-l-2 border-white pl-6">
                <p className="text-sm leading-relaxed text-white/80">
                    {skills[skills.length - 1].notes}
                </p>
            </div>

        </div>
    )
}

export default Skills