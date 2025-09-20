import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

const fetchProducts = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${backendUrl}/products/get-all-products`, {
        params: { page: pageParam, limit: 20 }, // ✅ pass pagination
        withCredentials: true,
    });
    return { ...res.data, nextPage: pageParam + 1, currentPage: pageParam };
};

export const useInfiniteProducts = () => {
    return useInfiniteQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        getNextPageParam: (lastPage) => {
            // if no products returned → no more pages
            if (!lastPage?.data?.length) return undefined;
            return lastPage.nextPage;
        },
        refetchOnWindowFocus: true,
    });
};