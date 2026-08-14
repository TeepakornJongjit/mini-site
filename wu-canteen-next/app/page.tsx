import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLeaf, faTag } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";
export default function HomePage() {
  return (
    <>
      <h2 className="mb-3 text-2xl font-bold">Welcome to WU Canteen</h2>
      <p className="text-gray-600">
        Enjoy a variety of delicious Thai dishes and beverages in a cozy
        atmosphere. Browse our menu to find your favorite items or try
        something new!
      </p>
      <hr className="my-10 border-gray-200" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex items-start gap-4 rounded-lg bg-white p-5 shadow">
          <FontAwesomeIcon icon={faLeaf} className="text-2xl text-green-600" />
          <div>
            <h3 className="font-semibold text-green-800">Fresh Thai Classics</h3>
            <p className="mt-1 text-sm text-green-500">Made daily with local ingredients.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg bg-white p-5 shadow">
          <FontAwesomeIcon icon={faClock} className="text-2xl text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-800">Quick Service</h3>
            <p className="mt-1 text-sm text-blue-500">Order and get your food in minutes.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-lg bg-white p-5 shadow">
          <FontAwesomeIcon icon={faTag} className="text-2xl text-purple-600" />
          <div>
            <h3 className="font-semibold text-purple-800">Student-Friendly Prices</h3>
            <p className="mt-1 text-sm text-purple-500">Great meals that fit your budget.</p>
          </div>
        </div>
      </div>
      <hr className="my-10 border-gray-200" />
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Featured Shops</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-gray-50 shadow transition-shadow duration-300 hover:shadow-lg">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Ro-Bi-Da Kitchen (Halal)</h3>
              <p className="mt-1 text-sm text-gray-600">
                A popular spot for authentic Thai classics, known for their Pad Thai and Tom Yum soup.
              </p>   
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-50 shadow transition-shadow duration-300 hover:shadow-lg">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Tom Yum O-Cha Noodle</h3>
              <p className="mt-1 text-sm text-gray-600">
                Known for their delicious Tom Yum soup and fresh noodle dishes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}