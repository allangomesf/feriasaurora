"use client";

import React from "react";
import { ArrowRightLeft, TrendingUp } from "lucide-react";
import { useTrip } from "@/context/TripContext";

export default function CurrencyWidget() {
    const { config } = useTrip();

    if (config.exchangeRateBrl === null) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-full border border-slate-200 px-4 py-2 flex items-center gap-3 animate-pulse h-10 w-48"></div>
        );
    }

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-slate-200 px-4 py-2 flex items-center gap-3 group hover:border-sky-300 transition-colors">
            <div className="flex items-center gap-1.5 text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold tracking-wide uppercase">Câmbio Real</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span>1 {config.currency}</span>
                <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition-colors" />
                <span className="text-slate-900">{config.exchangeRateBrl.toFixed(2)} BRL</span>
            </div>
        </div>
    );
}
