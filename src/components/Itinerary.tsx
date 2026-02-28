"use client";

import React, { useState } from "react";
import { Utensils, Map, Coffee, MoveDown, MapPin, CarTaxiFront, Plus, ExternalLink } from "lucide-react";
import { useTrip } from "@/context/TripContext";
import { differenceInDays, parseISO, addDays, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ScheduleItem {
    time: string;
    title: string;
    type: "culture" | "food" | "toddler" | "travel" | "nature";
    description: string;
}

interface DayPlan {
    date: string;
    title: string;
    items: ScheduleItem[];
}

export default function Itinerary() {
    const { config, addExpense } = useTrip();
    const [activeDay, setActiveDay] = useState(0);

    const hasChildren = (config.travelers?.children || 0) > 0;
    const isNatureLover = config.preferences?.includes("Natureza");
    const isCultureLover = config.preferences?.includes("Cultura");

    const startDate = parseISO(config.startDate);
    const endDate = parseISO(config.endDate);
    // Calculate total days (inclusive)
    // Validate if valid date to avoid NaN
    const isValidDate = !isNaN(startDate.getTime()) && !isNaN(endDate.getTime());
    const tripsDaysCount = isValidDate ? Math.max(1, differenceInDays(endDate, startDate) + 1) : 2;

    // Dynamic generation of the itinerary based on context and dates
    const dynamicItinerary: DayPlan[] = Array.from({ length: tripsDaysCount }).map((_, idx) => {
        let currentDateStr = "";
        if (isValidDate) {
            const currentDate = addDays(startDate, idx);
            // Example output: "Dia 1 (14 jul)"
            currentDateStr = format(currentDate, "dd MMM", { locale: ptBR });
        }

        let title = "Exploração Urbana";
        let items: ScheduleItem[] = [];

        if (idx === 0) {
            title = "Chegada e Acomodação";
            items = [
                {
                    time: "10:00 AM",
                    title: "Chegada ao Hotel",
                    type: "travel",
                    description: hasChildren ? "Check-in em hotel familiar. Deixar as malas e focar em descansar a viagem das crianças." : "Check-in e explorar as redondezas a pé.",
                },
                {
                    time: "12:30 PM",
                    title: "Almoço Moinho Verde",
                    type: "food",
                    description: hasChildren ? "Ótimo local vegetariano. Cadeiras altas disponíveis." : "O restaurante mais bem avaliado perto do hotel.",
                },
                {
                    time: "03:00 PM",
                    title: isNatureLover ? "Passeio no Parque Local" : "Caminhada no Centro Histórico",
                    type: isNatureLover ? (hasChildren ? "toddler" : "nature") : "culture",
                    description: hasChildren ? "Rota acessível para carrinho, área tranquila para a soneca." : "Reconhecimento da região, paradas para fotos e café local.",
                },
                {
                    time: "06:00 PM",
                    title: "Jantar e Descanso",
                    type: "food",
                    description: "Pizzaria/Restaurante próximo ao hotel para finalizar o dia.",
                },
            ];
        } else if (idx === tripsDaysCount - 1) {
            title = "Despedida e Retorno";
            items = [
                {
                    time: "09:00 AM",
                    title: "Café da Manhã Rápido",
                    type: "food",
                    description: "Última refeição no local, aproveitando os sabores que mais gostou.",
                },
                {
                    time: "11:00 AM",
                    title: "Compras Finais",
                    type: "culture",
                    description: "Tempo para buscar souvenirs e lembranças de última hora.",
                },
                {
                    time: "02:00 PM",
                    title: `Retorno a ${config.origin.split(',')[0]}`,
                    type: "travel",
                    description: "Procedimentos de embarque/viagem. Retorno seguro para casa.",
                },
            ];
        } else {
            title = isCultureLover ? "Cultura e Lazer" : "Exploração Urbana";
            items = [
                {
                    time: "09:30 AM",
                    title: isCultureLover ? "Museu da Cidade" : "Mercado Central",
                    type: isCultureLover ? "culture" : "food",
                    description: "Visita cedo para evitar multidões. Aproveitar a energia matinal.",
                },
                {
                    time: "12:00 PM",
                    title: isNatureLover ? "Piquenique Jardim Botânico" : "Almoço Rápido",
                    type: hasChildren ? "toddler" : (isNatureLover ? "nature" : "food"),
                    description: hasChildren ? "Espaço aberto para correr. Ambiente seguro." : "Parada estratégica para comer algo da culinária local.",
                },
                {
                    time: "02:30 PM",
                    title: "Ponto Turístico Principal",
                    type: "culture",
                    description: "Passeio pelas ruas históricas. Fotos e lembranças.",
                },
            ];
        }

        return {
            date: currentDateStr ? `Dia ${idx + 1} (${currentDateStr})` : `Dia ${idx + 1}`,
            title,
            items,
        };
    });

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "food":
                return <Utensils className="w-4 h-4 text-orange-500" />;
            case "culture":
                return <Map className="w-4 h-4 text-purple-500" />;
            case "toddler":
                return <BabyIcon />;
            case "travel":
                return <MapPin className="w-4 h-4 text-blue-500" />;
            default:
                return <Coffee className="w-4 h-4 text-stone-500" />;
        }
    };

    const getActivityColor = (type: string) => {
        switch (type) {
            case "food":
                return "bg-orange-50 border-orange-200 text-orange-900";
            case "culture":
                return "bg-purple-50 border-purple-200 text-purple-900";
            case "toddler":
                return "bg-rose-50 border-rose-200 text-rose-900";
            case "travel":
                return "bg-blue-50 border-blue-200 text-blue-900";
            default:
                return "bg-stone-50 border-stone-200 text-stone-900";
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 h-[600px] flex flex-col overflow-hidden">
            {/* Header Tabs */}
            <div className="flex border-b border-stone-100 overflow-x-auto hide-scrollbar">
                {dynamicItinerary.map((day, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveDay(idx)}
                        className={`px-6 py-4 font-medium transition-colors whitespace-nowrap min-w-[120px] shrink-0 border-r border-stone-100 last:border-r-0 ${activeDay === idx
                            ? "text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/30"
                            : "text-stone-500 hover:text-stone-700 hover:bg-stone-50"
                            }`}
                    >
                        <div className="text-[11px] font-bold uppercase tracking-wider mb-1 opacity-70">{day.date}</div>
                        <div className="text-sm truncate">{day.title}</div>
                    </button>
                ))}
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-y-auto p-6 bg-stone-50/30">
                <div className="relative border-l border-stone-200 ml-3 pl-8 py-2 space-y-10">
                    {dynamicItinerary[activeDay]?.items.map((item, idx) => (
                        <div key={idx} className="relative group">
                            {/* Timeline dot */}
                            <div className="absolute -left-[41px] bg-white border-2 border-stone-200 w-5 h-5 rounded-full flex items-center justify-center top-1 shadow-sm group-hover:border-emerald-400 group-hover:scale-110 transition-all">
                                <div className="w-1.5 h-1.5 bg-stone-300 rounded-full group-hover:bg-emerald-400"></div>
                            </div>

                            {/* Card */}
                            <div className={`border rounded-xl p-4 sm:hover:shadow-md transition-shadow ${getActivityColor(item.type)}`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                                        {item.time}
                                    </span>
                                    <div className="bg-white p-1.5 rounded-full shadow-sm">
                                        {getActivityIcon(item.type)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 mb-1">
                                    <h4 className="font-semibold text-lg">{item.title}</h4>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.destination + ' ' + item.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-semibold text-stone-500 bg-white/60 hover:bg-white hover:text-emerald-600 px-2 py-1 rounded transition-colors flex items-center gap-1 shrink-0"
                                        title="Ver rotas no Google Maps"
                                    >
                                        Ver no Mapa <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                </div>
                                <p className="text-sm opacity-80 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>

                            {idx < (dynamicItinerary[activeDay]?.items.length || 0) - 1 && (
                                <div className="absolute -left-[32px] top-12 bottom-[-40px] w-0.5 pointer-events-none group-hover:bg-emerald-200 transition-colors"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Local App Transit Estimate Add Button */}
                <div className="mt-8 border-t border-stone-200 pt-6">
                    <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-start sm:items-center gap-3">
                            <div className="bg-amber-100/50 p-2.5 rounded-lg text-amber-600">
                                <CarTaxiFront className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-stone-800 text-sm">Deslocamentos Locais (Uber/Táxi)</h4>
                                <p className="text-xs text-stone-500 mt-0.5">
                                    Adicione uma estimativa diária baseada nos passeios sugeridos neste dia.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:border-l border-stone-100 sm:pl-4 pt-3 sm:pt-0 border-t sm:border-t-0 justify-between sm:justify-end">
                            <div className="flex flex-col items-end">
                                <span className="font-bold text-stone-800">
                                    45 <span className="text-[10px] font-normal text-stone-500">{config.currency}</span>
                                </span>
                                <span className="text-[9px] text-stone-400 font-medium">Est. {dynamicItinerary[activeDay]?.date}</span>
                            </div>

                            <button
                                onClick={() => addExpense({ title: `Uber/Táxi: ${dynamicItinerary[activeDay]?.title}`, amountLocal: 45 })}
                                className="bg-amber-50 text-amber-600 p-2 rounded-lg hover:bg-amber-500 hover:text-white transition-colors flex-shrink-0"
                                title="Adicionar Estimativa aos Custos"
                            >
                                <Plus className="w-4 h-4 text-inherit" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Inline Baby Icon for Itinerary since it isn't imported from lucide properly in all contexts
function BabyIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-rose-500"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
    );
}
