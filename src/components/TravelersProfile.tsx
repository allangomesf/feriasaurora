"use client";

import React, { useState } from "react";
import { Users, Sparkles, Accessibility, Edit2, CheckCircle2, X } from "lucide-react";
import { useTrip } from "@/context/TripContext";

const availablePreferences = [
    "Cultura",
    "Gastronomia",
    "Natureza",
    "Compras",
    "Aventura",
    "Relaxamento",
    "Vida Noturna",
    "Parques Temáticos"
];

const mobilityOptions = [
    "Nenhuma restrição",
    "Carrinho de bebê",
    "Cadeira de rodas",
    "Mobilidade reduzida",
    "Evitar muitas escadas"
];

export default function TravelersProfile() {
    const { config, updateConfig } = useTrip();
    const [isEditing, setIsEditing] = useState(false);

    // Local state for editing to avoid immediate context updates
    const [editAdults, setEditAdults] = useState(config.travelers?.adults || 2);
    const [editChildren, setEditChildren] = useState(config.travelers?.children || 1);
    const [editChildAges, setEditChildAges] = useState(config.travelers?.childAges || "2");
    const [editPreferences, setEditPreferences] = useState<string[]>(config.preferences || ["Cultura", "Gastronomia"]);
    const [editMobility, setEditMobility] = useState(config.mobility || "Carrinho de bebê");

    const sumTravelers = (config.travelers?.adults || 2) + (config.travelers?.children || 0);

    const handleSave = () => {
        updateConfig({
            travelers: {
                adults: editAdults,
                children: editChildren,
                childAges: editChildAges,
            },
            preferences: editPreferences,
            mobility: editMobility,
        });
        setIsEditing(false);
    };

    const togglePreference = (pref: string) => {
        if (editPreferences.includes(pref)) {
            setEditPreferences(editPreferences.filter(p => p !== pref));
        } else {
            setEditPreferences([...editPreferences, pref]);
        }
    };

    if (isEditing) {
        return (
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-md relative z-10 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                    <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                        <Edit2 className="w-4 h-4 text-emerald-600" />
                        Editar Perfil
                    </h3>
                    <button onClick={() => setIsEditing(false)} className="text-stone-400 hover:text-stone-600">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Travelers */}
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 block">Viajantes</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col">
                                <span className="text-xs text-stone-600 mb-1">Adultos</span>
                                <input
                                    type="number"
                                    min="1"
                                    value={editAdults}
                                    onChange={(e) => setEditAdults(parseInt(e.target.value) || 1)}
                                    className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-400"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-stone-600 mb-1">Crianças</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={editChildren}
                                    onChange={(e) => setEditChildren(parseInt(e.target.value) || 0)}
                                    className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-400"
                                />
                            </div>
                        </div>
                        {editChildren > 0 && (
                            <div className="mt-3 flex flex-col">
                                <span className="text-xs text-stone-600 mb-1">Idades das Crianças (separadas por vírgula)</span>
                                <input
                                    type="text"
                                    value={editChildAges}
                                    onChange={(e) => setEditChildAges(e.target.value)}
                                    placeholder="Ex: 2, 5"
                                    className="border border-stone-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-400"
                                />
                            </div>
                        )}
                    </div>

                    {/* Preferences */}
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 block">Interesses Principais</label>
                        <div className="flex flex-wrap gap-2">
                            {availablePreferences.map(pref => (
                                <button
                                    key={pref}
                                    onClick={() => togglePreference(pref)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors border ${editPreferences.includes(pref)
                                            ? "bg-emerald-100 border-emerald-200 text-emerald-800"
                                            : "bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100"
                                        }`}
                                >
                                    {pref}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobility */}
                    <div>
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 block">Mobilidade</label>
                        <select
                            value={editMobility}
                            onChange={(e) => setEditMobility(e.target.value)}
                            className="w-full border border-stone-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-400 bg-white"
                        >
                            {mobilityOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSave}
                        className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Salvar Perfil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

            <div className="flex items-start justify-between mb-4 relative z-10">
                <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Perfil dos Viajantes
                </h3>
                <button
                    onClick={() => {
                        setEditAdults(config.travelers?.adults || 2);
                        setEditChildren(config.travelers?.children || 1);
                        setEditChildAges(config.travelers?.childAges || "2");
                        setEditPreferences(config.preferences || ["Cultura", "Gastronomia"]);
                        setEditMobility(config.mobility || "Carrinho de bebê");
                        setIsEditing(true);
                    }}
                    className="text-xs font-medium text-emerald-600 bg-emerald-100/50 hover:bg-emerald-200 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                >
                    <Edit2 className="w-3 h-3" /> Editar
                </button>
            </div>

            <ul className="text-sm text-emerald-800 space-y-3 relative z-10">
                <li className="flex items-start gap-3">
                    <div className="mt-0.5 bg-emerald-200/50 p-1 rounded-md text-emerald-700 shrink-0">
                        <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <span className="font-medium">{sumTravelers} viajantes</span>
                        <div className="text-xs opacity-80 mt-0.5">
                            {config.travelers?.adults} adultos
                            {config.travelers?.children && config.travelers.children > 0 ? `, ${config.travelers.children} criança(s) (idade: ${config.travelers.childAges})` : ""}
                        </div>
                    </div>
                </li>

                <li className="flex items-start gap-3">
                    <div className="mt-0.5 bg-emerald-200/50 p-1 rounded-md text-emerald-700 shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <span className="font-medium">Interesses</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {config.preferences?.map(pref => (
                                <span key={pref} className="text-[9px] uppercase font-bold tracking-wider bg-emerald-100 border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded-full">
                                    {pref}
                                </span>
                            ))}
                        </div>
                    </div>
                </li>

                <li className="flex items-start gap-3">
                    <div className="mt-0.5 bg-emerald-200/50 p-1 rounded-md text-emerald-700 shrink-0">
                        <Accessibility className="w-3.5 h-3.5" />
                    </div>
                    <div>
                        <span className="font-medium">Mobilidade</span>
                        <div className="text-xs opacity-80 mt-0.5">
                            {config.mobility}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
