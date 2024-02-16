import { useFieldArray, useFormContext } from "react-hook-form";

import MenuItemInput from "./MenuItemInput";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const MenuItemsSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Menus</h2>
        <FormDescription>
          Créez vos menus, attribuez leur un nom et un prix
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
                key={index}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button type="button" onClick={() => append({ name: "", price: "" })}>
        Ajouter un Menu
      </Button>
    </div>
  );
};

export default MenuItemsSection;
