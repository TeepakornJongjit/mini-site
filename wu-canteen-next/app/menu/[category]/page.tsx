"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { CategoryWithDishes } from "@/types/database";
const SPICE_LABEL = ["Not Spicy", "Spicy", "Very Spicy"];
const SUGAR_LABEL = ["Not Sugary", "Sugary", "Very Sugary"];
const AVATAR_COLOR_CLASS: Record<string, string> = {
    purple: "bg-purple-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
};
export default function CategoryPage() {
    const { category } = useParams<{ category: string }>();
    const [data, setData] = useState<CategoryWithDishes | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let cancelled = false;
        async function loadCategory() {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from("categories")
                .select(`
*,
dishes (
*,
dish_ingredients ( ingredient, sort_order ),
dish_allergens ( allergen ),
chefs ( id, name, initials, avatar_color )
)
`)
                .eq("slug", category)
                .order("sort_order", { referencedTable: "dishes", ascending: true })
                .single();
            if (cancelled) return;
            if (error) { setError(error.message); setLoading(false); return; }
            setData(data as unknown as CategoryWithDishes);
            setLoading(false);
        }
        if (category) loadCategory();
        return () => { cancelled = true; };
    }, [category]);
    if (loading) return <p className="text-gray-500">Loading dishes...</p>;
    if (error || !data) return <p className="rounded-lg bg-red-50 p-4 text-red-700">Couldn&apos;t load
        this category{error ? `: ${error}` : ""}.</p>;
    return (
        <>
            <Link href="/menu" className="text-sm text-gray-500 hover:text-purple-600">&larr; Back to menu</Link>
            <h2 className="mb-1 mt-3 text-2xl font-bold">{data.name}</h2>
            {data.description && <p className="mb-8 text-gray-600">{data.description}</p>}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {data.dishes.map((dish) => (
                    <div key={dish.id} className="flex flex-col rounded-lg bg-white p-5 shadow">
                        {dish.image_url && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={dish.image_url} alt={dish.name} className="mb-4 h-40 w-full rounded-md object-cover" />
                        )}
                        <div className="mb-1 flex items-start justify-between">
                            <h3 className="font-semibold text-gray-800">{dish.name}</h3>
                            <span className="font-semibold text-purple-600">฿{dish.price}</span>
                        </div>
                        <div className="mb-3 flex flex-wrap gap-2">
                            {!!dish.spice_level && (
                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                                    {" ".repeat(dish.spice_level)} {SPICE_LABEL[dish.spice_level]}
                                </span>
                            )}
                            {dish.spice_level === 0 && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Not

                                    Spicy</span>
                            )}
                            {!!dish.sugar_level && (
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                    {" ".repeat(dish.sugar_level)} {SUGAR_LABEL[dish.sugar_level]}
                                </span>
                            )}
                            {dish.dish_allergens.map((a) => (

                                <span key={a.allergen} className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-
yellow-800">{a.allergen}</span>

                            ))}
                        </div>
                        <p className="mb-3 text-sm text-gray-600">{dish.description}</p>
                        <ul className="mb-3 list-inside list-disc space-y-0.5 text-sm text-gray-500">
                            {dish.dish_ingredients.map((ing) => <li key={ing.ingredient}>{ing.ingredient}</li>)}
                        </ul>
                        {dish.chefs && (
                            <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-3 text-sm text-gray-500">

                                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-
white ${AVATAR_COLOR_CLASS[dish.chefs.avatar_color] ?? "bg-gray-500"}`}>

                                    {dish.chefs.initials}
                                </span>
                                Recommended by Chef {dish.chefs.name}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <h3 className="mb-4 mt-10 text-xl font-bold">Nutrition at a Glance</h3>
            <table className="w-full overflow-hidden rounded-lg bg-white shadow">
                <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">

                    <tr><th className="px-4 py-3">Dish</th><th className="px-4 py-3">Calories</th><th className="px-4 py-
3">Allergens</th></tr>

                </thead>
                <tbody>
                    {data.dishes.map((dish) => (
                        <tr key={dish.id} className="border-t border-gray-100">
                            <td className="px-4 py-3">{dish.name}</td>
                            <td className="px-4 py-3">{dish.calories} kcal</td>
                            <td className="px-4 py-3">{dish.dish_allergens.map((a) => a.allergen).join(", ") || "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}