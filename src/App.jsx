import Header from "./components/Header";
import useApi from "./useApi";
import Hero from "./components/Hero";

function App() {
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";
  const { data, loading, error } = useApi(url);

  if (loading)
    return (
      <img
        src="https://i.pinimg.com/originals/1d/69/6f/1d696f941d33a44dad5dd921c9a29215.gif"
        alt=""
      />
    );
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <div>

      <Header />
    <Hero meals={data} />

    </div>
  );
}

export default App;
