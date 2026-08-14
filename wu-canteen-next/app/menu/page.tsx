"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/types/database";
type CategoryWithCount = Category & { dish_count: number };
export default function MenuPage() {
    const [categories, setCategories] = useState<CategoryWithCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let cancelled = false;
        async function loadCategories() {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from("categories")
                .select("*, dishes(count)")
                .order("sort_order", { ascending: true });
            if (cancelled) return;
            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }
            const withCounts: CategoryWithCount[] = (data ?? []).map((cat) => ({
                ...cat,
                dish_count: cat.dishes?.[0]?.count ?? 0,
            }));
            setCategories(withCounts);
            setLoading(false);
        }
        loadCategories();
        return () => { cancelled = true; }; // avoid setState after unmount
    }, []);
    if (loading) return <p className="text-gray-500">Loading menu...</p>;
    if (error) return <p className="rounded-lg bg-red-50 p-4 text-red-700">Couldn&apos;t load the menu: {error}</p>;
    return (
        <>
            <h2 className="mb-4 text-2xl font-bold">Menu</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {categories.map((cat) => (
                    <Link
                        key={cat.slug}
                        href={`/menu/${cat.slug}`}

                        className="group flex items-center gap-4 rounded-lg bg-white p-5 shadow transition-all hover:-translate-y-
0.5 hover:bg-gray-50 hover:shadow-md"

                    >
                        <div className="min-w-0">
                            <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                            <p className="text-sm text-gray-500">{cat.dish_count} items</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}