import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";

import { Restaurant } from "@/types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      throw new Error("Echec lors de la récuparation du restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Echec lors de la création du restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant créé!");
  }

  if (error) {
    toast.error("Mise à jour du restaurant impossible");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/my/restaurant`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Echec de la mise à jour du restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant mis à jour!");
  }

  if (error) {
    toast.error("Impossible de mettre à jour le restaurant");
  }

  return { updateRestaurant, isLoading };
};
