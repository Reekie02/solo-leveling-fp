import { useCharacter } from "../context/CharacterContext";

const Weapons = () => {
    const { character } = useCharacter();

    if (!character) return null;

    const { weapons } = character;

    return (
        <div className="flex flex-col gap-8 text-white max-w-xl overflow-y-auto h-full">

            {/* HEADER */}
            <div>
                <p className="uppercase text-xs tracking-[0.35em] text-white/60">
                    Inventory
                </p>
                <h2 className="text-4xl font-extrabold mt-2">
                    WEAPONS & EQS.
                </h2>
            </div>

            {/* SUMMARY */}
            <div className="grid grid-cols-2 gap-6">
                <div className="system-card">
                    <p className="label">Slots</p>
                    <p className="value">4 / 20</p>
                </div>

                <div className="system-card">
                    <p className="label">Loadout</p>
                    <p className="value">Ready</p>
                </div>
            </div>

            {/* ITEMS */}
            <div className="flex flex-col gap-4">
                {weapons.slice(0, -1).map((it) => (
                    <div key={it.name} className="system-card">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-lg font-semibold text-white truncate">
                                    {it.name}
                                </p>
                                <p className="text-sm text-white/65">
                                    {it.desc}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <span className={`rarity-badge rarity-${it.rarity.toLowerCase()}`}>
                                    {it.rarity} RANK
                                </span>

                                <span className="item-type">
                                    {it.type}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <p className="uppercase text-xs tracking-[0.3em] text-white/55">
                                Bonus
                            </p>
                            <p className="text-sm font-semibold text-white/85">
                                {it.bonus}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* NOTE */}
            <div className="border-l-2 border-white pl-6">
                <p className="text-sm leading-relaxed text-white/80">
                    {weapons[weapons.length - 1].notes}
                </p>
            </div>

        </div>
    )
}

export default Weapons