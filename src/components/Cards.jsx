import useApi from "./useApi";

export default function Cards() {
  const {
    data: meals,
    loading,
    error,
  } = useApi("https://www.themealdb.com/api/json/v1/1/search.php?s=");

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
            <a key={meal.idMeal} href="#" className="group">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{meal.strMeal}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {meal.strArea} • {meal.strCategory}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
