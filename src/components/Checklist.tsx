"use client";

import React, { useState } from "react";
import { Baby, Home, CheckCircle2, Circle } from "lucide-react";

interface CheckItem {
    id: string;
    text: string;
    done: boolean;
}

export default function Checklist() {
    const [auroraItems, setAuroraItems] = useState<CheckItem[]>([
        { id: "a1", text: "Fraldas (10 por dia)", done: false },
        { id: "a2", text: "Lenços umedecidos", done: false },
        { id: "a3", text: "Carrinho de bebê", done: false },
        { id: "a4", text: "Remédios (Tylenol Bebê, etc)", done: false },
        { id: "a5", text: "Brinquedo de conforto", done: false },
        { id: "a6", text: "Roupas extras (frio/calor)", done: false },
        { id: "a7", text: "Copo de transição", done: false },
    ]);

    const [adultItems, setAdultItems] = useState<CheckItem[]>([
        { id: "h1", text: "Passaportes e Documentos", done: false },
        { id: "h2", text: "Seguro Viagem", done: false },
        { id: "h3", text: "Adaptador de tomada", done: false },
        { id: "h4", text: "Lanches Vegetarianos extras", done: false },
        { id: "h5", text: "Desligar gás e água", done: false },
        { id: "h6", text: "Trancar todas as janelas", done: false },
        { id: "h7", text: "Avisar vizinhos", done: false },
    ]);

    const toggleItem = (
        id: string,
        list: CheckItem[],
        setList: React.Dispatch<React.SetStateAction<CheckItem[]>>
    ) => {
        setList(
            list.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    const renderList = (
        title: string,
        icon: React.ReactNode,
        items: CheckItem[],
        setItems: React.Dispatch<React.SetStateAction<CheckItem[]>>,
        bgColor: string,
        textColor: string
    ) => (
        <div className={`flex-1 rounded-2xl p-6 ${bgColor} flex flex-col`}>
            <h3 className={`text-lg font-semibold flex items-center gap-2 mb-6 ${textColor}`}>
                {icon}
                {title}
            </h3>
            <div className="flex flex-col gap-3 overflow-y-auto">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => toggleItem(item.id, items, setItems)}
                        className="flex items-start gap-3 text-left group transition-all"
                    >
                        {item.done ? (
                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${textColor}`} />
                        ) : (
                            <Circle className="w-5 h-5 flex-shrink-0 mt-0.5 text-stone-300 group-hover:text-stone-400" />
                        )}
                        <span
                            className={`text-sm ${item.done ? "line-through text-stone-400" : "text-stone-700 font-medium"
                                }`}
                        >
                            {item.text}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 h-[600px] flex flex-col p-6 gap-6">
            <h2 className="text-xl font-semibold text-stone-800 tracking-tight">
                Checklist Inteligente
            </h2>
            <div className="flex gap-6 flex-1 min-h-0">
                {renderList(
                    "Essenciais da Aurora",
                    <Baby className="w-5 h-5" />,
                    auroraItems,
                    setAuroraItems,
                    "bg-rose-50/50 border border-rose-100",
                    "text-rose-600"
                )}
                {renderList(
                    "Adultos e Casa",
                    <Home className="w-5 h-5" />,
                    adultItems,
                    setAdultItems,
                    "bg-indigo-50/50 border border-indigo-100",
                    "text-indigo-600"
                )}
            </div>
        </div>
    );
}
