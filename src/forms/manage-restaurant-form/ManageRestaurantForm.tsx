import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuItemsSection from "./MenuItemsSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types/types";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "le nom du restaurant est requis",
    }),
    city: z.string({
      required_error: "la ville du restaurant est requise",
    }),
    country: z.string({
      required_error: "le pays du restaurant est requis",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "le prix de la livraison est requis",
      invalid_type_error: "doit être un nombre valide",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "l'estimation du temps de livraison est requis",
      invalid_type_error: "doit être un nombre valide",
    }),
    cuisines: z
      .array(z.string())
      .nonempty({ message: "merci de choisir au moins un type de nourriture" }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "le nom du menu est requis"),
        price: z.coerce.number().min(1, "le prix du menu est requis"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, {
        message: "l'image du restaurant est requise",
      })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "l'url et le fichier doivent être renseignés",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { cuisines: [], menuItems: [{ name: "", price: 0 }] },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((menuItem) => ({
      ...menuItem,
      price: parseInt((menuItem.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );

    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuItemsSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Valider</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
