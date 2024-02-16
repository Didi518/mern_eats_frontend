import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "./ui/button";

const MobileNavLinks = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link
        to="/profil-utilisateur"
        className="bg-white items-center font-bold hover:text-orange-500"
      >
        Profil Utilisateur
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center font-bold hover:bg-gray-500"
      >
        Déconnexion
      </Button>
    </>
  );
};

export default MobileNavLinks;
