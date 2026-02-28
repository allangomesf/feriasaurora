"use client";

import React from "react";

export default function Header() {
    return (
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-stone-800 bg-clip-text text-transparent flex-shrink-0 cursor-default hover:opacity-80 transition-opacity">
                ✈️ Férias Aurora, Ana e Allan
            </h1>
            <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 bg-stone-100 px-3 py-1.5 rounded-full">
                Planejador de Viagens
            </div>
        </header>
    );
}
