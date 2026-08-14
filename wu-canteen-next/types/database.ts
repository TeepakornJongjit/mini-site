export type Chef = { id: string; name: string; initials: string; avatar_color: string };
export type Category = {
    id: string; slug: string; name: string; description: string | null;
    sort_order: number
};
export type DishIngredient = { ingredient: string; sort_order: number };
export type DishAllergen = { allergen: string };
export type Dish = {
    id: string;
    category_id: string;
    chef_id: string | null;
    name: string;
    price: number;
    description: string | null;
    image_url: string | null;
    calories: number | null;
    spice_level: number | null;
    sugar_level: number | null;
    sort_order: number;
};
export type DishWithDetails = Dish & {
    dish_ingredients: DishIngredient[];
    dish_allergens: DishAllergen[];
    chefs: Chef | null;
};
export type CategoryWithDishes = Category & { dishes: DishWithDetails[] };