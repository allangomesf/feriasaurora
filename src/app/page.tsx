"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import CurrencyWidget from "@/components/CurrencyWidget";
import BudgetTracker from "@/components/BudgetTracker";
import Itinerary from "@/components/Itinerary";
import Checklist from "@/components/Checklist";
import HotelSuggestions from "@/components/HotelSuggestions";
import RestaurantSuggestions from "@/components/RestaurantSuggestions";
import TransportSuggestions from "@/components/TransportSuggestions";
import TravelersProfile from "@/components/TravelersProfile";
import TripSearchForm from "@/components/TripSearchForm";
import { useTrip } from "@/context/TripContext";
import { Sparkles, Compass, Hotel, UtensilsCrossed, Map, Wallet, Car } from "lucide-react";

export default function Home() {
  const { config } = useTrip();
  const [isSearchActive, setIsSearchActive] = useState(false);

  type TabType = 'Visão Geral' | 'Hospedagem' | 'Comer & Beber' | 'Roteiro Diário' | 'Transporte' | 'Organização';
  const [activeTab, setActiveTab] = useState<TabType>('Visão Geral');

  const handleSearch = () => {
    setIsSearchActive(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const tabs = [
    { id: 'Visão Geral', icon: Compass },
    { id: 'Hospedagem', icon: Hotel },
    { id: 'Comer & Beber', icon: UtensilsCrossed },
    { id: 'Roteiro Diário', icon: Map },
    { id: 'Transporte', icon: Car },
    { id: 'Organização', icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-slate-900 pb-20">
      <Header />

      {/* Hero Search Section */}
      <section className={`transition-all duration-700 ease-in-out relative z-10 ${isSearchActive ? 'pt-8 pb-4' : 'pt-32 pb-12'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {!isSearchActive && (
            <div className="text-center mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Para onde vamos?
              </h1>
              <p className="text-lg text-slate-500">
                Preencha sua origem, destino e datas. Nós montamos roteiros, sugerimos hotéis e calculamos os gastos instantaneamente.
              </p>
            </div>
          )}

          <div className="relative">
            <TripSearchForm onSearch={handleSearch} isSearchActive={isSearchActive} />

            {/* Compact Widgets row below search when active */}
            {isSearchActive && (
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <CurrencyWidget />
                <TravelersProfile />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 flex flex-col gap-8 transition-opacity duration-500">
        {isSearchActive ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 flex flex-col gap-6 w-full">

            {/* Tabbed Navigation */}
            <div className="w-full bg-white rounded-full p-2 shadow-sm border border-slate-200 flex overflow-x-auto hide-scrollbar sticky top-4 z-40">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-semibold transition-all ${isActive
                        ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-transparent'
                      }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-500' : 'text-slate-400'}`} />
                    {tab.id}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Rendering */}
            <div className="mt-4">
              {activeTab === 'Visão Geral' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in">
                  <div className="flex flex-col gap-8">
                    <HotelSuggestions />
                    <RestaurantSuggestions />
                  </div>
                  <div className="flex flex-col gap-8">
                    <Itinerary />
                  </div>
                </div>
              )}

              {activeTab === 'Hospedagem' && (
                <div className="animate-in fade-in max-w-5xl mx-auto">
                  <HotelSuggestions />
                </div>
              )}

              {activeTab === 'Comer & Beber' && (
                <div className="animate-in fade-in max-w-5xl mx-auto">
                  <RestaurantSuggestions />
                </div>
              )}

              {activeTab === 'Roteiro Diário' && (
                <div className="animate-in fade-in max-w-4xl mx-auto">
                  <Itinerary />
                </div>
              )}

              {activeTab === 'Transporte' && (
                <div className="animate-in fade-in max-w-4xl mx-auto">
                  <TransportSuggestions />
                </div>
              )}

              {activeTab === 'Organização' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in">
                  <Checklist />
                  <BudgetTracker />
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white/50 backdrop-blur-sm rounded-3xl border border-slate-200 border-dashed m-4 max-w-3xl mx-auto w-full">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <Compass className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              Aguardando seu destino...
            </h2>
            <p className="text-slate-500">
              Use a barra de busca acima para começar o planejamento mágico das suas próximas férias.
            </p>
          </div>
        )}
      </main>

      <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
    </div>
  );
}
