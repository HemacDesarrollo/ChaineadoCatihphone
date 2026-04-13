import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useHomeViewModels(navigation) {
  const { user, logout } = useContext(AuthContext);

  const goToTickets = () => {
    navigation.navigate("MisTickets",{
      menu: "Mis\nTickets"
  });
  };

  const goToInventario = () => {
    navigation.navigate("Inventario");
  };

  const handleLogout = async () => {
    await logout();
  };

  return {
    user,
    goToTickets,
    goToInventario,
    handleLogout,
  };
}
