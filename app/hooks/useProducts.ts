import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 10;

const fetchProducts = async ({ pageParam = 0 }) => {
    const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${pageParam}`
    );

    if (!res.ok) throw new Error("Failed to fetch products");

    return res.json();
};

export const useProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,

        // ✅ REQUIRED in React Query v5
        initialPageParam: 0,

        getNextPageParam: (lastPage, allPages) => {
            const nextSkip = allPages.length * LIMIT;

            if (nextSkip >= lastPage.total) {
                return undefined;
            }

            return nextSkip;
        },

        refetchOnWindowFocus: false,
    });
};