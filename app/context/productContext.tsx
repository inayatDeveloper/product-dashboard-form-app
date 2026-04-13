"use client";

import { createContext, useContext, useState } from "react";

type ProductContextType = {
    search: string;
    setSearch: (v: string) => void;
    sort: string;
    setSort: (v: string) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name");

    return (
        <ProductContext.Provider value={{ search, setSearch, sort, setSort }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const ctx = useContext(ProductContext);
    if (!ctx) throw new Error("useProductContext must be used inside Provider");
    return ctx;
};