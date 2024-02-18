import { useNavigate } from "react-router-dom";

import SearchBar, { SearchForm } from "@/components/SearchBar";
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({ pathname: `/recherche/${searchFormValues.searchQuery}` });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          A emporter aujourd'hui
        </h1>
        <span className="text-xl">Votre repas est à portée de clic!</span>
        <SearchBar
          placeHolder="Recherche par ville ou nom de restaurant"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="Image d'accueil" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Commandez toujours plus rapidemment!
          </span>
          <span>
            Téléchargez l'application MernEats pour commander plus vite et
            personnaliser les recommandations
          </span>
          <img src={appDownloadImage} alt="Télécharger l'application" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
