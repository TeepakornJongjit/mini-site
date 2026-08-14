import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faUtensils, faStar, faIceCream, faMartiniGlass } from "@fortawesome/free-solid-svg-icons";
export type MenuCategory = {
    slug: string;
    name: string;
    icon: IconDefinition;
    items: string[];
};
export const categories: MenuCategory[] = [
    {
        slug: "thai-classics",
        name: "Thai Classics",
        icon: faUtensils,
        items: ["Pad Kra Pao Kai", "Vegetable Fried Rice", "Green Curry Chicken"],
    },
    {
        slug: "exclusive-specials",
        name: "Exclusive Specials",
        icon: faStar,
        items: ["Massaman Curry", "Pad Thai", "Tom Yum Goong"],
    },
    {
        slug: "dessert-delights",
        name: "Dessert Delights",
        icon: faIceCream,
        items: ["Mango Sticky Rice", "Khanom Krok", "Lod Chong"],
    },
    {
        slug: "drinks-beverages",
        name: "Drinks & Beverages",
        icon: faMartiniGlass,
        items: ["Thai Iced Tea", "Tala Cocoa", "Nam Kek Huay"],
    },
];
export function getCategory(slug: string): MenuCategory | undefined {
    return categories.find((c) => c.slug === slug);
}