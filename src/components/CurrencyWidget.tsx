"use client";

import React from "react";
import { ArrowRightLeft, TrendingUp } from "lucide-react";
import { useTrip } from "@/context/TripContext";

export default function CurrencyWidget() {
    const { config } = useTrip();

    if (config.exchangeRateBrl === null) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col gap-4 animate-pulse">
                <div className="h-6 bg-stone-200 rounded w-1/2"></div>
                <div className="h-10 bg-stone-200 rounded w-full"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-sm border border-emerald-100 p-6 flex flex-col gap-4 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 bg-emerald-100 w-24 h-24 rounded-full opacity-50 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="flex items-center justify-between z-10">
                <h3 className="text-sm font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Taxa de Câmbio
                </h3>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    Tempo real
                </span>
            </div>

            <div className="flex items-center justify-between mt-2 z-10">
                <div className="flex flex-col">
                    <span className="text-3xl font-bold text-emerald-950">
                        1 {config.currency}
                    </span>
                    <span className="text-sm text-emerald-700 mt-1">
                        Moeda Local
                    </span>
                </div>

                <div className="bg-white p-3 rounded-full shadow-sm text-emerald-600">
                    <ArrowRightLeft className="w-5 h-5" />
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-3xl font-bold text-emerald-950">
                        {config.exchangeRateBrl.toFixed(2)}
                    </span>
                    <span className="text-sm text-emerald-700 mt-1 font-medium">
                        BRL (Reais)
                    </span>
                </div>
            </div>
        </div>
    );
}
