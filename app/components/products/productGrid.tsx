"use client";

import { useEffect, useMemo, useRef } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useProductContext } from "../../context/productContext";
import ProductCard from "./productCard";
import ProductLoader from "./productLoader";
import { useDebounce } from "../../hooks/useDebounce";

export default function ProductGrid() {
    const { search, setSearch, sort, setSort } = useProductContext();
    const debounced = useDebounce(search, 400);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useProducts();

    const loaderRef = useRef<HTMLDivElement | null>(null);

    // =============================
    // FLATTEN PRODUCTS
    // =============================
    const products = useMemo(() => {
        return data?.pages.flatMap((p) => p.products) || [];
    }, [data]);

    // =============================
    // SEARCH + SORT
    // =============================
    const filtered = useMemo(() => {
        let res = [...products];

        if (debounced) {
            res = res.filter((p) =>
                p.title.toLowerCase().includes(debounced.toLowerCase())
            );
        }

        if (sort === "price-asc") res.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") res.sort((a, b) => b.price - a.price);
        if (sort === "name") res.sort((a, b) => a.title.localeCompare(b.title));

        return res;
    }, [products, debounced, sort]);

    // =============================
    // INFINITE SCROLL
    // =============================
    useEffect(() => {
        const el = loaderRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];

                if (
                    target.isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "150px",
            }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // =============================
    // LOADING STATE
    // =============================
    if (isLoading) return <ProductLoader />;

    // =============================
    // ERROR STATE
    // =============================
    if (isError)
        return (
            <p className="text-red-500 text-center mt-10">
                Failed to load products
            </p>
        );

    return (
        <div className="px-4 md:px-10 py-6 bg-gray-50 min-h-screen">

            {/* =============================
                DASHBOARD HEADER
            ============================= */}
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Product Dashboard
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Browse, search, and manage products in real time
                </p>
            </div>

            {/* =============================
                SEARCH + SORT CONTROLS
            ============================= */}
            <div className="sticky top-0 z-10 bg-white shadow-md rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

                {/* SEARCH INPUT */}
                <div className="flex items-center w-full md:w-2/3 bg-gray-100 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-400">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products by name..."
                        className="w-full bg-transparent outline-none text-sm"
                    />
                </div>

                {/* SORT DROPDOWN */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full md:w-1/3 px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-blue-400"
                >
                    <option value="name">Sort by Name</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>

            {/* =============================
                PRODUCT GRID
            ============================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {/* =============================
                INFINITE SCROLL LOADER
            ============================= */}
            <div ref={loaderRef} className="h-10 mt-10 text-center">
                {isFetchingNextPage && hasNextPage && (
                    <p className="text-blue-500 font-medium">
                        Loading more products...
                    </p>
                )}

                {!hasNextPage && (
                    <p className="text-gray-400 text-sm">
                        🎉 No more products to load
                    </p>
                )}
            </div>
        </div>
    );
}