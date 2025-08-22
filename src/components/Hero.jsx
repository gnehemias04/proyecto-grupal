import { useState, useEffect } from "react";
import useApi from "../useApi";

export default function Hero() {
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
  const { data, loading, error } = useApi(url, "meals");

  const [randomMeals, setRandomMeals] = useState([]);
  const [current, setCurrent] = useState(0);

  // Generar comidas aleatorias solo cuando cambian las props
  useEffect(() => {
    if (!data || data.length === 0) return;
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setRandomMeals(shuffled.slice(0, 3));
  }, [data]);

  // Cambio automático de slide
  useEffect(() => {
    if (randomMeals.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % randomMeals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [randomMeals]);

  if (randomMeals.length === 0) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center bg-gray-200 rounded-2xl my-6 max-w-6xl mx-auto">
        <p className="text-gray-600">No se encontraron comidas.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {randomMeals.map((meal, index) => (
        <div
          key={meal.idMeal}
          className={` absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Imagen del slide */}
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover"
          />

          {/* Overlay con texto */}
          <div className="absolute inset-0 bg-black/40">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center text-white px-6">
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
                {meal.strMeal}
              </h1>
              <p className="mt-6 text-lg sm:text-xl mb-6">
                Descubre más sobre esta deliciosa receta.
              </p>
              <a
                href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded font-semibold transition hover:scale-105"
                style={{ backgroundColor: "#83ba67", color: "#ffffff" }}
              >
                Ver Receta
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Paginación (puntos) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {randomMeals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full transition-colors duration-300 cursor-pointer border border-white ${
              index === current ? "bg-white" : "bg-[#83ba67]"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
