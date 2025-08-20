import React from "react";
import useApi from "../useApi";

export default function Card() {
  const { data } = useApi(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
  );

  return (
    <div className="w-80">
      {data.map((meal) => (
        <div className="relative hover:scale-110 transition-all duration-1000">
          <div className="relative">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="bg-cover rounded-2xl"
            />
            <h2 className="text-2xl text-white absolute text-end bottom-4 m-4">
              {meal.strMeal}
            </h2>
          </div>
          <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 trancition-all duration-500 bg-[#83ba67] flex flex-col justify-center items-center text-white font-bold gap-10">
            <h2 className="text-2xl ">{meal.strMeal}</h2>
            <p className="text-xl">{meal.strArea} </p>
            <p className="text-xl">{meal.strCategory}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
