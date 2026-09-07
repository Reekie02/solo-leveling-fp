import { useCharacter } from "../context/CharacterContext";

const Relationships = () => {

    const { character } = useCharacter();

    if (!character) return null;

    const { relationships } = character;

    return (
        <div className="flex flex-col gap-8 text-white max-w-xl overflow-y-auto h-full">


            <div>
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">
                    System Record
                </p>
                <h2 className="text-4xl font-extrabold mt-2">
                    RELATIONSHIPS
                </h2>
            </div>


            <div className="flex flex-col gap-4">
                {relationships.slice(0, -1).map((rel) => (
                    <div key={rel.name} className="system-card">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-lg font-semibold text-white truncate">
                                    {rel.name}
                                </p>
                                <p className="text-sm text-white/65">
                                    {rel.role}
                                </p>
                            </div>

                            <span className={`rel-badge rel-${rel.type.toLowerCase()}`}>
                                {rel.type}
                            </span>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between">
                                <p className="uppercase text-xs tracking-[0.3em] text-white/55">
                                    Affinity
                                </p>
                                <p className="text-sm font-semibold text-white/85">
                                    {rel.affinity}%
                                </p>
                            </div>

                            <div className="stat-bar mt-2">
                                <div className="stat-fill" style={{ width: `${rel.affinity}%` }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="border-l-2 border-white pl-6">
                <p className="text-sm leading-relaxed text-white/80">
                    {relationships[relationships.length - 1].notes}

                </p>
            </div>

        </div>
    )
}

export default Relationships