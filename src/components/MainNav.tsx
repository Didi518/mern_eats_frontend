import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import UsernameMenu from "./UsernameMenu";
import { Button } from "./ui/button";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link
            to="commande-statut"
            className="font-bold hover:text-orange-500"
          >
            Mes Commandes
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => loginWithRedirect()}
        >
          Connexion
        </Button>
      )}
    </span>
  );
};

export default MainNav;
