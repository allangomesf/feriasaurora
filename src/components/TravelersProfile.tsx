"use client";

import React, { useState, useRef, useEffect } from "react";
import { Users, Edit2, CheckCircle2, X } from "lucide-react";
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
    const popoverRef = useRef<HTMLDivElement>(null);

    // Local state for editing
    const [editAdults, setEditAdults] = useState(config.travelers?.adults || 2);
    const [editChildren, setEditChildren] = useState(config.travelers?.children || 1);
    const [editChildAges, setEditChildAges] = useState(config.travelers?.childAges || "2");
    const [editPreferences, setEditPreferences] = useState<string[]>(config.preferences || ["Cultura", "Gastronomia"]);
    const [editMobility, setEditMobility] = useState(config.mobility || "Carrinho de bebê");

    const sumTravelers = (config.travelers?.adults || 2) + (config.travelers?.children || 0);

    // Close popover on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsEditing(false);
            }
        }
        if (isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

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

    const openEdit = () => {
        setEditAdults(config.travelers?.adults || 2);
        setEditChildren(config.travelers?.children || 1);
        setEditChildAges(config.travelers?.childAges || "2");
        setEditPreferences(config.preferences || ["Cultura", "Gastronomia"]);
        setEditMobility(config.mobility || "Carrinho de bebê");
        setIsEditing(true);
    };

    return (
        <div className="relative" ref={popoverRef}>
            {/* Pill Trigger */}
            <button
                onClick={() => setIsEditing(!isEditing)}
                className={`bg-white/80 backdrop-blur-md rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.04)] border px-4 py-2 flex items-center gap-2 transition-all ${isEditing ? 'border-sky-400 bg-white' : 'border-slate-200 hover:border-sky-300'}`}
            >
                <div className="flex items-center gap-1.5 text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold tracking-wide uppercase">Perfil</span>
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                    <span className="font-semibold">{sumTravelers} Viajante{sumTravelers > 1 ? 's' : ''}</span>
                    <span className="text-slate-300 mx-1">•</span>
                    <span className="truncate max-w-[120px] text-xs text-slate-500">
                        {config.preferences?.[0] || "Detalhes"}
                        {(config.preferences?.length || 0) > 1 && ", ..."}
                    </span>
                    <Edit2 className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </div>
            </button>

            {/* Edit Popover */}
            {isEditing && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 md:right-auto md:w-[400px] w-[90vw] bg-white rounded-2xl p-6 border border-sky-200 shadow-xl z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                        <h3 className="font-semibold text-sky-900 flex items-center gap-2">
                            <Edit2 className="w-4 h-4 text-sky-600" />
                            Editar Perfil da Viagem
                        </h3>
                        <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        {/* Travelers */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Companhia</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-600 mb-1">Adultos</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editAdults}
                                        onChange={(e) => setEditAdults(parseInt(e.target.value) || 1)}
                                        className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-sky-400"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-600 mb-1">Crianças/Bebês</span>
                                    <input
                                        type="number"
                                        min="0"
                                        value={editChildren}
                                        onChange={(e) => setEditChildren(parseInt(e.target.value) || 0)}
                                        className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-sky-400"
                                    />
                                </div>
                            </div>
                            {editChildren > 0 && (
                                <div className="mt-3 flex flex-col">
                                    <span className="text-xs text-slate-600 mb-1">Idades (separadas por vírgula)</span>
                                    <input
                                        type="text"
                                        value={editChildAges}
                                        onChange={(e) => setEditChildAges(e.target.value)}
                                        placeholder="Ex: 2, 5"
                                        className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-sky-400"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Preferences */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Interesses Principais</label>
                            <div className="flex flex-wrap gap-2">
                                {availablePreferences.map(pref => (
                                    <button
                                        key={pref}
                                        onClick={() => togglePreference(pref)}
                                        className={`px-2.5 py-1.5 rounded-full text-[11px] font-semibold transition-colors border ${editPreferences.includes(pref)
                                            ? "bg-sky-100 border-sky-200 text-sky-800"
                                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                                            }`}
                                    >
                                        {pref}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobility */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Mobilidade / Logística</label>
                            <select
                                value={editMobility}
                                onChange={(e) => setEditMobility(e.target.value)}
                                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-400 bg-white"
                            >
                                {mobilityOptions.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleSave}
                            className="mt-2 bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Salvar Perfil e Atualizar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
