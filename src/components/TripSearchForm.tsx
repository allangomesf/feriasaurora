"use client";

import React from "react";
import { MapPin, Calendar, Utensils } from "lucide-react";
import { useTrip, DietType } from "@/context/TripContext";

export default function TripSearchForm() {
    const { config, updateConfig } = useTrip();

    const dietTypes: DietType[] = ["Variada", "Vegetariana", "Vegana", "Pescatariana", "Sem Restrições"];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col gap-5">
            <h2 className="font-semibold text-stone-800 text-lg">Detalhes da Viagem</h2>

            {/* Origin Input */}
            <div className="flex flex-col gap-1.5 focus-within:text-emerald-600 transition-colors">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Origem</label>
                <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                    <input
                        type="text"
                        value={config.origin}
                        onChange={(e) => updateConfig({ origin: e.target.value })}
                        className="bg-transparent font-medium text-stone-800 outline-none w-full placeholder:text-stone-400"
                        placeholder="Sua cidade atual..."
                    />
                </div>
            </div>

            {/* Destination Input */}
            <div className="flex flex-col gap-1.5 focus-within:text-emerald-600 transition-colors">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Destino Principal</label>
                <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                    <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                    <input
                        type="text"
                        value={config.destination}
                        onChange={(e) => updateConfig({ destination: e.target.value })}
                        className="bg-transparent font-bold text-stone-800 outline-none w-full placeholder:text-stone-400 line-clamp-1"
                        placeholder="Para onde vamos?"
                    />
                </div>
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-1.5 focus-within:text-blue-600 transition-colors">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Período</label>
                <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                    <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                    <div className="flex flex-col w-full gap-1">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-stone-500 uppercase font-bold">Ida</span>
                            <input
                                type="date"
                                value={config.startDate}
                                onChange={(e) => updateConfig({ startDate: e.target.value })}
                                className="bg-transparent text-sm font-medium text-stone-700 outline-none cursor-pointer"
                            />
                        </div>
                        <div className="w-full h-px bg-stone-200 my-1"></div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-stone-500 uppercase font-bold">Volta</span>
                            <input
                                type="date"
                                value={config.endDate}
                                onChange={(e) => updateConfig({ endDate: e.target.value })}
                                className="bg-transparent text-sm font-medium text-stone-700 outline-none cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Diet Selector */}
            <div className="flex flex-col gap-1.5 focus-within:text-orange-600 transition-colors">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Preferência de Dieta</label>
                <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
                    <Utensils className="w-5 h-5 text-orange-500 shrink-0" />
                    <select
                        value={config.dietType}
                        onChange={(e) => updateConfig({ dietType: e.target.value as DietType })}
                        className="bg-transparent text-sm font-medium text-stone-800 outline-none cursor-pointer w-full"
                    >
                        {dietTypes.map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
