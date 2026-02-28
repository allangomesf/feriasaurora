"use client";

import React, { useState } from "react";
import { PlaneTakeoff, Train, CheckCircle2, CarFront, Plus, ExternalLink, Map, Bus, Ship } from "lucide-react";
import { useTrip } from "@/context/TripContext";
import { format, parseISO } from "date-fns";

export default function TransportSuggestions() {
    const { config, updateConfig } = useTrip();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingPrice, setEditingPrice] = useState("");

    const formattedOutboundDate = config.startDate ? config.startDate.replace(/-/g, '') : '';
    const formattedReturnDate = config.endDate ? config.endDate.replace(/-/g, '') : '';
    const searchOrigin = config.origin ? encodeURIComponent(config.origin) : '';
    const searchDestination = config.destination ? encodeURIComponent(config.destination) : '';

    // Custom Deep Links
    const flightsUrl = `https://www.google.com/travel/flights?q=Flights%20from%20${searchOrigin}%20to%20${searchDestination}%20on%20${formattedOutboundDate}%20through%20${formattedReturnDate}`;
    const trainUrl = `https://www.thetrainline.com/book/results?origin=${searchOrigin}&destination=${searchDestination}&outwardDate=${config.startDate}`;
    const busUrl = `https://www.busbud.com/en/search/${searchOrigin}/${searchDestination}/${config.startDate}`;
    const shipUrl = `https://www.directferries.com/`;
    const rentalUrl = `https://www.rentalcars.com/search-results?pickUpLocationName=${searchDestination}`;
    const drivingUrl = `https://www.google.com/maps/dir/?api=1&origin=${searchOrigin}&destination=${searchDestination}`;

    // Estimated Driving Gas Calculation
    const drivingCostEstimate = 120; // in local currency

    interface TransportOption {
        id: string;
        name: string;
        type: string;
        description: string;
        price: number | null;
        icon: React.ReactNode;
        color: string;
        linkUrl?: string | null;
        linkLabel?: string | null;
    }

    const mockTransports: TransportOption[] = [
        {
            id: "t1",
            name: "Avião",
            type: "Aéreo",
            description: "Pesquise os voos mais rápidos e ideais para a Aurora.",
            price: null,
            icon: <PlaneTakeoff className="w-5 h-5 text-sky-500" />,
            color: "bg-sky-50",
            linkUrl: flightsUrl,
            linkLabel: "Google Flights"
        },
        {
            id: "t2",
            name: "Trem / TGV",
            type: "Ferroviário",
            description: "Viagem confortável com paisagens e espaço para caminhar.",
            price: null,
            icon: <Train className="w-5 h-5 text-fuchsia-500" />,
            color: "bg-fuchsia-50",
            linkUrl: trainUrl,
            linkLabel: "Trainline"
        },
        {
            id: "t3",
            name: "Ônibus Leito",
            type: "Rodoviário (Público)",
            description: "Opção econômica. Verifique restrições para cadeirinhas.",
            price: null,
            icon: <Bus className="w-5 h-5 text-orange-500" />,
            color: "bg-orange-50",
            linkUrl: busUrl,
            linkLabel: "Busbud"
        },
        {
            id: "t4",
            name: "Navio / Ferry",
            type: "Marítimo",
            description: "Travessias aquáticas (se aplicável à rota).",
            price: null,
            icon: <Ship className="w-5 h-5 text-blue-500" />,
            color: "bg-blue-50",
            linkUrl: shipUrl,
            linkLabel: "DirectFerries"
        },
        {
            id: "t5",
            name: "Aluguel de Carro",
            type: "Terrestre (Privado)",
            description: "Alugue um veículo no destino para maior liberdade.",
            price: null, // base rental 
            icon: <CarFront className="w-5 h-5 text-teal-500" />,
            color: "bg-teal-50",
            linkUrl: rentalUrl,
            linkLabel: "Rentalcars"
        },
        {
            id: "t6",
            name: "Carro Próprio",
            type: "Terrestre (Próprio)",
            description: "Dirija seu próprio carro desde a origem. Custos estimados de rota e pedágio.",
            price: drivingCostEstimate,
            icon: <CarFront className="w-5 h-5 text-stone-500" />,
            color: "bg-stone-100",
            linkUrl: drivingUrl,
            linkLabel: "Rota (Maps)"
        }
    ];

    // We use a state to allow manual price additions, but we must update the dynamic links when config changes
    const [customTransports, setCustomTransports] = useState<TransportOption[]>(mockTransports);

    React.useEffect(() => {
        setCustomTransports(prev => prev.map(t => {
            const mockEquivalent = mockTransports.find(m => m.id === t.id);
            if (mockEquivalent && mockEquivalent.linkUrl) {
                return { ...t, linkUrl: mockEquivalent.linkUrl };
            }
            return t;
        }));
    }, [config.origin, config.destination, config.startDate, config.endDate]);

    const handleSetPrice = (id: string, e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPrice) return;
        setCustomTransports(prev => prev.map(t =>
            t.id === id ? { ...t, price: parseFloat(editingPrice) } : t
        ));
        setEditingId(null);
        setEditingPrice("");
    };

    const handleSelectMainTransport = (transport: TransportOption) => {
        updateConfig({
            mainTransport: {
                title: transport.name,
                amountLocal: transport.price || 0
            }
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <PlaneTakeoff className="w-5 h-5 text-sky-600" />
                    Opções e Consultas de Transporte
                </h2>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                {customTransports.map((transport) => (
                    <div key={transport.id} className="border border-stone-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 group hover:shadow-md transition-all sm:hover:border-sky-200">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${transport.color}`}>
                                {transport.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-stone-900 leading-snug">{transport.name}</h3>
                                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{transport.type}</span>
                                </div>
                                <p className="text-xs text-stone-500 mt-1 truncate max-w-full">
                                    {transport.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 sm:pl-4 sm:border-l border-stone-100 pt-3 sm:pt-0 border-t sm:border-t-0 mt-3 sm:mt-0 justify-between sm:justify-end">

                            {transport.linkUrl && (
                                <a
                                    href={transport.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-2 rounded-lg flex items-center gap-1.5 hover:bg-stone-200 transition-colors whitespace-nowrap"
                                >
                                    {transport.linkLabel} <ExternalLink className="w-3 h-3" />
                                </a>
                            )}

                            {transport.price !== null ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col items-end">
                                        <span className="font-bold text-lg text-stone-800 tracking-tight whitespace-nowrap">
                                            {transport.price} <span className="text-xs font-normal text-stone-500">{config.currency}</span>
                                        </span>
                                        {transport.price === drivingCostEstimate && <span className="text-[9px] text-stone-400">Est. Combustível</span>}
                                    </div>

                                    <button
                                        onClick={() => handleSelectMainTransport(transport)}
                                        className={`p-2 py-1.5 px-3 flex items-center gap-1.5 rounded-lg transition-colors flex-shrink-0 text-xs font-semibold ${config.mainTransport?.title === transport.name
                                            ? "bg-emerald-500 text-white"
                                            : "bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white"
                                            }`}
                                        title="Selecionar como Transporte Principal"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        {config.mainTransport?.title === transport.name ? "Selecionado" : "Selecionar"}
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {editingId === transport.id ? (
                                        <form onSubmit={(e) => handleSetPrice(transport.id, e)} className="flex items-center gap-2">
                                            <div className="relative w-28">
                                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">{config.currency}</span>
                                                <input
                                                    type="number"
                                                    placeholder="Valor..."
                                                    value={editingPrice}
                                                    onChange={(e) => setEditingPrice(e.target.value)}
                                                    className="w-full pl-8 pr-2 py-1.5 bg-white rounded-lg border border-stone-200 text-xs outline-none focus:border-sky-400 font-medium"
                                                    autoFocus
                                                />
                                            </div>
                                            <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white p-1.5 rounded-lg transition-colors shadow-sm">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={() => setEditingId(null)} className="text-stone-400 hover:text-stone-600 text-[10px] font-medium px-1">
                                                Cancelar
                                            </button>
                                        </form>
                                    ) : (
                                        <button
                                            onClick={() => { setEditingId(transport.id); setEditingPrice(""); }}
                                            className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-stone-200 transition-colors whitespace-nowrap border border-stone-200"
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Adicionar Valor Manual
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
