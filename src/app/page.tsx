"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import CurrencyWidget from "@/components/CurrencyWidget";
import BudgetTracker from "@/components/BudgetTracker";
import Itinerary from "@/components/Itinerary";
import Checklist from "@/components/Checklist";
import HotelSuggestions from "@/components/HotelSuggestions";
import TransportSuggestions from "@/components/TransportSuggestions";
import TravelersProfile from "@/components/TravelersProfile";
import TripSearchForm from "@/components/TripSearchForm";
import { useTrip } from "@/context/TripContext";
import { Search, Sparkles } from "lucide-react";

export default function Home() {
  const { config } = useTrip();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const canSearch = config.origin.trim() !== "" && config.destination.trim() !== "" && config.startDate !== "" && config.endDate !== "";

  const handleSearch = () => {
    if (canSearch) {
      setIsSearchActive(true);
      // Optional: scroll top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 pb-12">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-8 pt-8 flex gap-8">
        {/* Left Sidebar */}
        <aside className="w-[340px] flex-shrink-0 flex flex-col gap-6">
          <CurrencyWidget />

          <TripSearchForm />

          <TravelersProfile />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={!canSearch}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-3 ${canSearch
              ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 hover:shadow-lg active:scale-[0.98]"
              : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
          >
            {isSearchActive ? <Sparkles className="w-6 h-6" /> : <Search className="w-6 h-6" />}
            {isSearchActive ? "Atualizar Roteiro" : "Pesquisar Roteiro"}
          </button>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col gap-8 transition-opacity duration-500">
          {isSearchActive ? (
            <>
              <HotelSuggestions />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Itinerary />
                <Checklist />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-stretch">
                <TransportSuggestions />
                <BudgetTracker />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-stone-200 border-dashed m-4">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-800 to-stone-800 bg-clip-text text-transparent mb-4">
                Sua próxima aventura começa aqui!
              </h2>
              <p className="text-stone-500 text-lg max-w-md">
                Preencha os dados da viagem na barra lateral e informe quem vai viajar com você.
                <br /><br />
                Nós criaremos sugestões de hotéis, roteiros exclusivos e pesquisaremos as melhores formas de transporte.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
