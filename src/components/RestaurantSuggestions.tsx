"use client";

import React from "react";
import { CopyPlus, UtensilsCrossed, Utensils, Coffee, MapPin, Search, Wine } from "lucide-react";
import { useTrip } from "@/context/TripContext";

export default function RestaurantSuggestions() {
    const { config, addExpense } = useTrip();

    const isVegetarian = config.dietType === "Vegetariana" || config.dietType === "Vegana";
    const isGastronomyLover = config.preferences?.includes("Gastronomia");

    const dynamicRestaurants = [
        {
            id: "r1",
            name: isGastronomyLover ? "Chef's Table Experiência" : "Bistrô Tradicional",
            type: isGastronomyLover ? "Alta Gastronomia" : "Local",
            description: isGastronomyLover ? "Menu degustação focado em ingredientes sazonais e locais." : "Comida caseira típica da região, ótimo custo-benefício.",
            priceAvg: isGastronomyLover ? 120 : 35,
            icon: <Wine className="w-5 h-5 text-rose-500" />,
            color: "bg-rose-50"
        },
        {
            id: "r2",
            name: isVegetarian ? "Green Leaf Plant-Based" : `Steakhouse & Grill ${config.destination.split(',')[0]}`,
            type: isVegetarian ? "Vegetariano/Vegano" : "Carnes",
            description: isVegetarian ? "Pratos criativos 100% à base de plantas. Ambiente moderno." : "Cortes premium e grelhados no ponto perfeito.",
            priceAvg: 60,
            icon: <Utensils className="w-5 h-5 text-amber-500" />,
            color: "bg-amber-50"
        },
        {
            id: "r3",
            name: "Café & Brunch Histórico",
            type: "Café/Brunch",
            description: "Perfeito para um café da manhã reforçado antes de turistar.",
            priceAvg: 25,
            icon: <Coffee className="w-5 h-5 text-amber-700" />,
            color: "bg-orange-50"
        },
        {
            id: "r4",
            name: "Mercado Central",
            type: "Comida de Rua / Mercado",
            description: "Barracas com variedades locais para provar de tudo um pouco.",
            priceAvg: 15,
            icon: <UtensilsCrossed className="w-5 h-5 text-emerald-500" />,
            color: "bg-emerald-50"
        },
        {
            id: "r5",
            name: "Rooftop Lounge",
            type: "Bar & Tapas",
            description: "Drinks exclusivos e petiscos com a melhor vista da cidade.",
            priceAvg: 80,
            icon: <MapPin className="w-5 h-5 text-indigo-500" />,
            color: "bg-indigo-50"
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col mt-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-rose-600" />
                    Sugestões de Restaurantes
                </h2>
                <span className="text-sm font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                    Preço médio p/ pessoa
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {dynamicRestaurants.map((restaurant) => {
                    const searchLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + config.destination)}`;

                    return (
                        <div key={restaurant.id} className="border border-stone-100 rounded-xl p-4 flex flex-col group sm:hover:shadow-md transition-all sm:hover:border-rose-200">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${restaurant.color}`}>
                                {restaurant.icon}
                            </div>

                            <h3 className="font-semibold text-stone-900 leading-snug">{restaurant.name}</h3>
                            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-1">{restaurant.type}</span>

                            <p className="text-xs text-stone-500 mt-2 mb-4 flex-1">
                                {restaurant.description}
                            </p>

                            <div className="flex flex-col gap-3 pt-4 border-t border-stone-100 mt-auto">
                                <a
                                    href={searchLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                                >
                                    Ver no Mapa <Search className="w-3 h-3" />
                                </a>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-lg text-stone-800 tracking-tight">
                                            {restaurant.priceAvg} <span className="text-xs font-normal text-stone-500">{config.currency}</span>
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => addExpense({ title: `Alimentação: ${restaurant.name}`, amountLocal: restaurant.priceAvg })}
                                        className="bg-rose-50 text-rose-600 p-2 rounded-lg hover:bg-rose-600 hover:text-white transition-colors"
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
