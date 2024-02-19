import { useEffect, useState } from "react";

import { useUpdateMyRestaurantOrder } from "@/api/myRestaurantApi";
import { Order, OrderStatus } from "@/types/types";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const [status, setStatus] = useState<OrderStatus>(order.status);

  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Nom du Client:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Adresse de Livraison:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}
            </span>
            <span className="ml-2 font-normal">
              {order.deliveryDetails.zipCode}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Heure:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Prix Total:
            <span className="ml-2 font-normal">
              {(order.totalAmount / 100).toFixed(2)}€
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span key={cartItem.menuItemId}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Ou en est cette commande?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.progressValue} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
