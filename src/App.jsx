import Carrusell from "./components/Carrusell";
import CarrusellBanderas from "./components/CarrusellBanderas";
/* import Carrusell from "./components/CarrusellBanderas"; */

import Header from "./components/Header";
import useApi from "./useApi";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
  const { data, loading, error } = useApi(url);

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
        <Carrusell />
        <CarrusellBanderas />
      </div>
      <Footer />
    </div>
  );
}

export default App;
