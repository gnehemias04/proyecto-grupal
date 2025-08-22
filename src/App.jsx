import { useState } from "react";
import Cards from "./components/Cards";
import Carrusell from "./components/Carrusell";
import CarrusellBanderas from "./components/CarrusellBanderas";

import Header from "./components/Header";
import useApi from "./useApi";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  const [categoria, setCategoria] = useState(null);
  const [area, setArea] = useState(null);

  // Construcción dinámica del endpoint
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  if (categoria) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
  } else if (area) {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  } else {
    // 👇 ya no usas "let" otra vez, solo reasignas
    url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
  }

  const { loading, error } = useApi(url);

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center item">
        <img
          src="https://i.pinimg.com/originals/1d/69/6f/1d696f941d33a44dad5dd921c9a29215.gif"
          alt=""
        />
      </div>
    );
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <Header />
      <Hero />
      <div>
        <Carrusell
          onSelectCategoria={setCategoria}
          categoriaActiva={categoria}
        />
        <CarrusellBanderas onSelectArea={setArea} areaActiva={area} />
        <button
          onClick={() => {
            setCategoria(null);
            setArea(null);
          }}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Quitar filtro
        </button>

        <Cards url={url} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
