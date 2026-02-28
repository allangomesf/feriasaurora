"use client";

import React, { useMemo } from "react";
import { CopyPlus, Hotel, Building2, Trees, MapPin, Sparkles, ExternalLink } from "lucide-react";
import { useTrip } from "@/context/TripContext";
import { differenceInDays, parseISO } from "date-fns";

export default function HotelSuggestions() {
    const { config, addExpense } = useTrip();

    const days = useMemo(() => {
        try {
            const start = parseISO(config.startDate);
            const end = parseISO(config.endDate);
            const diff = differenceInDays(end, start);
            return Math.max(diff, 1); // Minimum 1 night
        } catch {
            return 1;
        }
    }, [config.startDate, config.endDate]);

    const hasChildren = (config.travelers?.children || 0) > 0;
    const isNatureLover = config.preferences?.includes("Natureza");

    const dynamicHotels = [
        {
            id: "h1",
            name: hasChildren ? "Resort Family Kids Club" : "Boutique Hotel Adults Only",
            type: hasChildren ? "Resort Familiar" : "Boutique Exclusiva",
            description: hasChildren ? "Berços inclusos, piscina rasa, e próximo a parques." : "Ambiente tranquilo, bar no terraço, spa relaxante.",
            pricePerNight: hasChildren ? 250 : 210,
            icon: <Hotel className="w-5 h-5 text-indigo-500" />,
            color: "bg-indigo-50"
        },
        {
            id: "h2",
            name: `Boutique Hotel ${config.destination.split(',')[0]}`,
            type: "Boutique",
            description: "Charme local, café da manhã premium e excelente localização.",
            pricePerNight: 180,
            icon: <Building2 className="w-5 h-5 text-rose-500" />,
            color: "bg-rose-50"
        },
        {
            id: "h3",
            name: isNatureLover ? "Green Lodge Eco & Nature" : "Urban Design Hotel",
            type: isNatureLover ? "Eco Lodge" : "Hotel Design",
            description: isNatureLover ? "Sustentável, restaurante 100% plant-based, áreas verdes amplas." : "Arquitetura moderna, tecnologia no quarto, perto do centro.",
            pricePerNight: 150,
            icon: <Trees className="w-5 h-5 text-emerald-500" />,
            color: "bg-emerald-50"
        },
        {
            id: "h4",
            name: "City Center Flat",
            type: "Apartamento",
            description: "Prático, cozinha completa (ideal para preparar suas próprias refeições).",
            pricePerNight: 120,
            icon: <MapPin className="w-5 h-5 text-blue-500" />,
            color: "bg-blue-50"
        },
        {
            id: "h5",
            name: "Palace Spa & Luxury",
            type: "Luxo",
            description: "Spa, serviço de quarto 24h, proximidade às principais atrações.",
            pricePerNight: 400,
            icon: <Sparkles className="w-5 h-5 text-amber-500" />,
            color: "bg-amber-50"
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-indigo-600" />
                    Sugestões de Hotel
                </h2>
                <span className="text-sm font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                    Cálculo para {days} noite{days > 1 ? "s" : ""}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {dynamicHotels.map((hotel) => {
                    const totalLocal = hotel.pricePerNight * days;
                    const bookingLink = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name + ' ' + config.destination)}`;

                    return (
                        <div key={hotel.id} className="border border-stone-100 rounded-xl p-4 flex flex-col group sm:hover:shadow-md transition-all sm:hover:border-indigo-200">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${hotel.color}`}>
                                {hotel.icon}
                            </div>

                            <h3 className="font-semibold text-stone-900 leading-snug">{hotel.name}</h3>
                            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-1">{hotel.type}</span>

                            <p className="text-xs text-stone-500 mt-2 mb-4 flex-1">
                                {hotel.description}
                            </p>

                            <div className="flex flex-col gap-3 pt-4 border-t border-stone-100">
                                <a
                                    href={bookingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-semibold text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                                >
                                    Reservar no Site <ExternalLink className="w-3 h-3" />
                                </a>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-lg text-stone-800 tracking-tight">
                                            {totalLocal} <span className="text-xs font-normal text-stone-500">{config.currency}</span>
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => addExpense({ title: `Hospedagem: ${hotel.name}`, amountLocal: totalLocal })}
                                        className="bg-indigo-50 text-indigo-600 p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                                        title="Adicionar aos Custos"
                                    >
                                        <CopyPlus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
