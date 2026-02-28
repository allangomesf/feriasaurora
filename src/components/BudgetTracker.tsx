"use client";

import React, { useState } from "react";
import { Plus, Receipt, Trash2 } from "lucide-react";
import { useTrip } from "@/context/TripContext";

interface Expense {
    id: string;
    title: string;
    amountLocal: number;
}

export default function BudgetTracker() {
    const { config, expenses, addExpense, removeExpense, updateConfig } = useTrip();
    const [newTitle, setNewTitle] = useState("");
    const [newAmount, setNewAmount] = useState("");

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle || !newAmount) return;

        addExpense({
            title: newTitle,
            amountLocal: parseFloat(newAmount),
        });

        setNewTitle("");
        setNewAmount("");
    };

    const transportLocal = config.mainTransport ? config.mainTransport.amountLocal : 0;
    const itemsLocal = expenses.reduce((sum, exp) => sum + exp.amountLocal, 0);
    const totalLocal = itemsLocal + transportLocal;
    const totalBrl = totalLocal * (config.exchangeRateBrl || 0);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 flex flex-col h-[600px]">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-stone-800 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-amber-500" />
                    Controle de Gastos
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-stone-50/50">
                <form onSubmit={handleAddExpense} className="flex gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Despesa (ex: Jantar, Museu)"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
                    />
                    <div className="relative w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">
                            {config.currency}
                        </span>
                        <input
                            type="number"
                            placeholder="100"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-xl pl-12 pr-4 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all font-medium"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-xl transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </form>

                <div className="flex flex-col gap-3">
                    {/* Main Transport Sticky Item */}
                    {config.mainTransport && (
                        <div className="bg-sky-50 border-2 border-sky-100 rounded-xl p-4 flex items-center justify-between shadow-sm relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-sky-400"></div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider mb-0.5">Transporte Principal</span>
                                <span className="font-semibold text-stone-800">{config.mainTransport.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-sky-900">
                                        {config.mainTransport.amountLocal.toFixed(2)} {config.currency}
                                    </span>
                                    {config.exchangeRateBrl && (
                                        <span className="text-xs text-sky-700/70 font-medium tracking-wide">
                                            ~ R$ {(config.mainTransport.amountLocal * config.exchangeRateBrl).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => updateConfig({ mainTransport: null })}
                                    className="text-sky-300 hover:text-red-500 transition-colors"
                                    title="Remover Transporte Principal"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Standard Expenses */}
                    {expenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-white border border-stone-100 rounded-xl p-4 flex items-center justify-between sm:hover:shadow-md transition-shadow group"
                        >
                            <span className="font-medium text-stone-700">{expense.title}</span>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="font-semibold text-stone-900">
                                        {expense.amountLocal.toFixed(2)} {config.currency}
                                    </span>
                                    {config.exchangeRateBrl && (
                                        <span className="text-xs text-stone-500 font-medium tracking-wide">
                                            ~ R$ {(expense.amountLocal * config.exchangeRateBrl).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeExpense(expense.id)}
                                    className="text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {expenses.length === 0 && !config.mainTransport && (
                        <div className="text-center py-12 text-stone-400 text-sm border-2 border-dashed border-stone-200 rounded-2xl">
                            Nenhuma despesa registrada ainda. Comece a adicionar!
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-stone-800 text-white p-6 rounded-b-2xl flex items-center justify-between">
                <span className="text-stone-300 font-medium">Total de Despesas</span>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold tracking-tight">
                        {totalLocal.toFixed(2)} {config.currency}
                    </span>
                    {config.exchangeRateBrl && (
                        <span className="text-sm text-stone-400 mt-1">
                            R$ {totalBrl.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
