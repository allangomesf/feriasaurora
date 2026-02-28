"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Currency = "EUR" | "USD" | "CHF" | "GBP" | "ARS" | "CLP" | "BRL";
export type DietType = "Variada" | "Vegetariana" | "Vegana" | "Pescatariana" | "Sem Restrições";

export interface TripConfig {
    origin: string;
    destination: string;
    region: string;
    startDate: string;
    endDate: string;
    currency: Currency;
    dietType: DietType;
    exchangeRateBrl: number | null;
    mainTransport: { title: string; amountLocal: number } | null;
    travelers: { adults: number; children: number; childAges: string };
    preferences: string[];
    mobility: string;
}

export interface Expense {
    id: string;
    title: string;
    amountLocal: number;
}

interface TripContextType {
    config: TripConfig;
    expenses: Expense[];
    updateConfig: (updates: Partial<TripConfig>) => void;
    addExpense: (expense: Omit<Expense, 'id'>) => void;
    removeExpense: (id: string) => void;
}

const defaultStartDate = "2026-02-27";
const defaultEndDate = "2026-03-06";

export const defaultConfig: TripConfig = {
    origin: "São Paulo, SP",
    destination: "Paris, France",
    region: "Le Marais",
    startDate: defaultStartDate,
    endDate: defaultEndDate,
    currency: "EUR",
    dietType: "Vegetariana",
    exchangeRateBrl: null,
    mainTransport: null,
    travelers: { adults: 2, children: 1, childAges: "2" },
    preferences: ["Cultura", "Gastronomia"],
    mobility: "Carrinho de bebê",
};

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<TripConfig>(defaultConfig);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const savedConfig = localStorage.getItem("tripConfig");
        const savedExpenses = localStorage.getItem("tripExpenses");

        if (savedConfig) {
            try {
                const parsed = JSON.parse(savedConfig);
                setConfig((prev) => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to parse local storage config", e);
            }
        }

        if (savedExpenses) {
            try {
                const parsedExp = JSON.parse(savedExpenses);
                setExpenses(parsedExp);
            } catch (e) {
                console.error("Failed to parse local storage expenses", e);
            }
        }

        setIsLoaded(true);
    }, []);

    // Save Config to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("tripConfig", JSON.stringify(config));
        }
    }, [config, isLoaded]);

    // Save Expenses to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("tripExpenses", JSON.stringify(expenses));
        }
    }, [expenses, isLoaded]);

    // Fetch Exchange Rate whenever currency changes
    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await fetch(`https://economia.awesomeapi.com.br/last/${config.currency}-BRL`);
                const data = await response.json();
                const key = `${config.currency}BRL`;
                if (data[key]) {
                    setConfig((prev) => ({ ...prev, exchangeRateBrl: parseFloat(data[key].bid) }));
                }
            } catch (error) {
                console.error("Failed to fetch exchange rate", error);
                setConfig((prev) => ({ ...prev, exchangeRateBrl: null }));
            }
        };

        if (config.currency) {
            fetchRate();
            // Optional: set up a periodic refresh here if needed
        }
    }, [config.currency]);

    // Auto-detect Currency based on Destination
    useEffect(() => {
        if (!isLoaded) return;

        const dest = config.destination.toLowerCase();
        let newCurrency: Currency | null = null;

        if (dest.includes("paris") || dest.includes("frança") || dest.includes("france") || dest.includes("lisboa") || dest.includes("portugal") || dest.includes("espanha") || dest.includes("madrid") || dest.includes("roma") || dest.includes("italia") || dest.includes("alemanha") || dest.includes("berlim")) {
            newCurrency = "EUR";
        } else if (dest.includes("londres") || dest.includes("london") || dest.includes("inglaterra") || dest.includes("uk") || dest.includes("reino unido")) {
            newCurrency = "GBP";
        } else if (dest.includes("suiça") || dest.includes("suíça") || dest.includes("switzerland") || dest.includes("zurich") || dest.includes("genebra")) {
            newCurrency = "CHF";
        } else if (dest.includes("argentina") || dest.includes("buenos aires") || dest.includes("bariloche")) {
            newCurrency = "ARS";
        } else if (dest.includes("chile") || dest.includes("santiago")) {
            newCurrency = "CLP";
        } else if (dest.includes("eua") || dest.includes("usa") || dest.includes("estados unidos") || dest.includes("miami") || dest.includes("nova york") || dest.includes("new york") || dest.includes("orlando")) {
            newCurrency = "USD";
        } else if (dest.includes("brasil") || dest.includes("brazil") || dest.includes("são paulo") || dest.includes("rio") || dest.includes("belo horizonte") || dest.includes("bahia") || dest.includes("campos") || dest.includes("sp") || dest.includes("rj") || dest.includes("mg")) {
            // Se for Brasil e ainda estamos usando moedas estrangeiras, o app ainda não suporta BRL como base visual primária no header (header currencies não tem BRL na union). 
            // Vamos adicionar BRL na lista de moedas suportadas pelo app para permitir roteiros nacionais puros.
        }

        if (newCurrency && newCurrency !== config.currency) {
            setConfig(prev => ({ ...prev, currency: newCurrency as Currency }));
        }
    }, [config.destination, isLoaded, config.currency]);

    const updateConfig = (updates: Partial<TripConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }));
    };

    const addExpense = (expense: Omit<Expense, 'id'>) => {
        const newExpense = {
            ...expense,
            id: Math.random().toString(36).substring(2, 11)
        };
        setExpenses(prev => [...prev, newExpense]);
    };

    const removeExpense = (id: string) => {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
    };

    return (
        <TripContext.Provider value={{ config, expenses, updateConfig, addExpense, removeExpense }}>
            {children}
        </TripContext.Provider>
    );
}

export function useTrip() {
    const context = useContext(TripContext);
    if (context === undefined) {
        throw new Error("useTrip must be used within a TripProvider");
    }
    return context;
}
