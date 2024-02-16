import { useFormContext } from "react-hook-form";

import { cuisinesList } from "@/config/restaurant-options-config";
import CuisineCheckbox from "./CuisineCheckbox";
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Choisir le type de cuisines servies dans votre restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisinesList.map((cuisine, index) => (
                <CuisineCheckbox key={index} cuisine={cuisine} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
