"use client";

import React from "react";
import { MapPin, Calendar, Utensils, Search, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { useTrip, DietType } from "@/context/TripContext";

interface TripSearchFormProps {
    onSearch?: () => void;
    isSearchActive?: boolean;
}

export default function TripSearchForm({ onSearch, isSearchActive }: TripSearchFormProps) {
    const { config, updateConfig } = useTrip();

    const dietTypes: DietType[] = ["Variada", "Vegetariana", "Vegana", "Pescatariana", "Sem Restrições"];

    const canSearch = config.origin.trim() !== "" && config.destination.trim() !== "" && config.startDate !== "" && config.endDate !== "";

    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 p-2 flex flex-col md:flex-row items-center gap-2 relative z-20">
            {/* Origin Input */}
            <div className="flex-1 flex items-center px-4 py-2 hover:bg-slate-50 rounded-full cursor-text transition-colors group">
                <PlaneTakeoff className="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 shrink-0 mr-3" />
                <div className="flex flex-col w-full">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Origem</label>
                    <input
                        type="text"
                        value={config.origin}
                        onChange={(e) => updateConfig({ origin: e.target.value })}
                        className="bg-transparent font-semibold text-slate-800 outline-none w-full placeholder:text-slate-300 placeholder:font-normal"
                        placeholder="De onde?"
                    />
                </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200"></div>

            {/* Destination Input */}
            <div className="flex-1 flex items-center px-4 py-2 hover:bg-slate-50 rounded-full cursor-text transition-colors group">
                <PlaneLanding className="w-5 h-5 text-slate-400 group-focus-within:text-sky-500 shrink-0 mr-3" />
                <div className="flex flex-col w-full">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Destino</label>
                    <input
                        type="text"
                        value={config.destination}
                        onChange={(e) => updateConfig({ destination: e.target.value })}
                        className="bg-transparent font-semibold text-slate-800 outline-none w-full placeholder:text-slate-300 placeholder:font-normal line-clamp-1"
                        placeholder="Para onde?"
                    />
                </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200"></div>

            {/* Dates */}
            <div className="flex-[1.2] flex items-center px-4 py-2 hover:bg-slate-50 rounded-full cursor-text transition-colors group relative">
                <Calendar className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 shrink-0 mr-3" />
                <div className="flex w-full items-center gap-2">
                    <div className="flex flex-col w-full">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ida</label>
                        <input
                            type="date"
                            value={config.startDate}
                            onChange={(e) => updateConfig({ startDate: e.target.value })}
                            className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer w-full [color-scheme:light]"
                        />
                    </div>
                    <div className="w-4 h-px bg-slate-300 shrink-0 mt-3"></div>
                    <div className="flex flex-col w-full">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Volta</label>
                        <input
                            type="date"
                            value={config.endDate}
                            onChange={(e) => updateConfig({ endDate: e.target.value })}
                            className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer w-full [color-scheme:light]"
                        />
                    </div>
                </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-200"></div>

            {/* Diet Selector */}
            <div className="flex-[0.8] flex items-center px-4 py-2 hover:bg-slate-50 rounded-full cursor-pointer transition-colors group">
                <Utensils className="w-5 h-5 text-slate-400 group-focus-within:text-orange-500 shrink-0 mr-3" />
                <div className="flex flex-col w-full">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dieta</label>
                    <select
                        value={config.dietType}
                        onChange={(e) => updateConfig({ dietType: e.target.value as DietType })}
                        className="bg-transparent text-sm font-semibold text-slate-800 outline-none cursor-pointer w-full appearance-none"
                    >
                        {dietTypes.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Search Button */}
            <button
                onClick={onSearch}
                disabled={!canSearch}
                className={`ml-2 px-6 py-4 rounded-full font-bold shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 ${canSearch
                    ? "bg-sky-600 text-white hover:bg-sky-700 hover:shadow-sky-200 hover:shadow-lg active:scale-[0.98]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
            >
                <Search className="w-5 h-5" />
                <span className="hidden lg:inline">{isSearchActive ? "Atualizar" : "Buscar"}</span>
            </button>
        </div>
    );
}
