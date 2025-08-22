import { data } from "react-router";
import useApi from "../useApi";

export default function Cards({ searchPrincipal }) {
  const {
    data: meals,
    loading,
    error,
  } = useApi(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchPrincipal}`,
    "meals"
  );

  if (loading) {
    return <p className="text-center py-10">Cargando comidas...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">Error: {error}</p>;
  }

  if (meals.length === 0) {
    return <p className="text-center py-10">No se encontraron comidas.</p>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Comidas
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {meals.map((meal) => (
            <div className="relative hover:scale-110 transition-all duration-1000">
              <div className="relative">
                <img
                  src={
                    meal.strMealThumb
                      ? meal.strMealThumb
                      : "https://www.cinco8.com/wp-content/uploads/2020/08/404.png"
                  }
                  alt={meal.strMeal}
                  className="bg-cover rounded-2xl"
                />
                <h2 className="text-2xl text-white p-2 px-4 bg-black/60 rounded-2xl absolute text-end bottom-4 m-4">
                  {meal.strMeal}
                </h2>
              </div>
              <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 trancition-all duration-500 bg-[#83ba67] flex flex-col justify-center items-center text-white font-bold gap-10">
                <h2 className="text-2xl text-center mx-3">{meal.strMeal}</h2>
                <p className="text-xl">{meal.strArea} </p>
                <p className="text-xl">{meal.strCategory}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
