import React, { useState, useRef, useEffect } from "react";
import useApi from "../useApi";

const CarrusellBanderas = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);

  // Usar el custom hook para obtener las áreas/países
  const {
    data: areas,
    loading,
    error,
  } = useApi(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    "meals"
  );

  // Mapeo de países a códigos de bandera
  const paisesACodigos = {
    American: "us",
    British: "gb",
    Canadian: "ca",
    Chinese: "cn",
    Croatian: "hr",
    Dutch: "nl",
    Egyptian: "eg",
    French: "fr",
    Greek: "gr",
    Indian: "in",
    Irish: "ie",
    Italian: "it",
    Jamaican: "jm",
    Japanese: "jp",
    Kenyan: "ke",
    Malaysian: "my",
    Mexican: "mx",
    Moroccan: "ma",
    Polish: "pl",
    Portuguese: "pt",
    Russian: "ru",
    Spanish: "es",
    Thai: "th",
    Tunisian: "tn",
    Turkish: "tr",
    Unknown: "un",
    Vietnamese: "vn",
    Ukrainian: "ua",
    Uruguayan: "uy",
    Filipino: "ph",
  };

  // Manejadores de eventos para arrastrar
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);

    // Prevenir selección de texto
    e.preventDefault();
    carouselRef.current.style.userSelect = "none";
    carouselRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      carouselRef.current.style.cursor = "grab";
      carouselRef.current.style.userSelect = "auto";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.style.userSelect = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Si hay error
  if (error) {
    return (
      <div className="w-full px-2 md:px-4 py-6 md:py-8 bg-gray-50">
        <div className="text-center text-red-500">
          Error al cargar las cocinas. Inténtalo de nuevo más tarde.
        </div>
      </div>
    );
  }

  // Mostrar skeleton mientras carga
  if (loading) {
    return (
      <div className="w-full px-2 md:px-4 py-6 md:py-8 bg-gray-50">
        <div className="flex overflow-x-auto space-x-4 md:space-x-6 py-4 px-2">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-24 md:w-32 h-32 md:h-40 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-20 md:h-28 bg-gray-200 animate-pulse rounded-full mx-auto mt-3 md:mt-4"></div>
              <div className="p-2 md:p-3">
                <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse mx-auto w-16 md:w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Verificar que areas existe y es un array
  if (!areas || !Array.isArray(areas) || areas.length === 0) {
    return (
      <div className="w-full px-2 md:px-4 py-6 md:py-8 bg-gray-50">
        <div className="text-center text-gray-500">
          No se encontraron cocinas.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  bg-gray-50">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 md:space-x-6 pb-3 px-2 cursor-grab scrollbar-hide select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {areas.map((area, index) => {
          const codigoPais = paisesACodigos[area.strArea] || "un";
          const urlBandera = `https://flagcdn.com/w80/${codigoPais}.png`;

          return (
            <div
              key={`${area.strArea}-${index}`}
              className="flex-shrink-0 w-24 bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center select-none"
            >
              <div className="h-15 w-20 md:w-28 overflow-hidden flex items-center justify-center px-2 pt-2">
                <img
                  src={urlBandera}
                  alt={`Bandera de ${area.strArea}`}
                  className="max-h-full max-w-full object-contain select-none"
                  draggable="false"
                  onError={(e) => {
                    e.target.src = "https://flagcdn.com/w80/un.png";
                  }}
                />
              </div>
              <div className="p-1 text-center">
                <h3 className="font-semibold text-xs md:text-sm text-gray-800 select-none">
                  {area.strArea}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-xs pt-2 text-gray-600">
        <p>Haz clic y arrastra para navegar.</p>
      </div>
    </div>
  );
};

export default CarrusellBanderas;
