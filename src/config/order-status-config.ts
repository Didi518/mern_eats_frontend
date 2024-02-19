import { OrderStatus } from "@/types/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Commandée", value: "commandée", progressValue: 0 },
  {
    label: "Attente de Confirmation du Restaurant",
    value: "réglée",
    progressValue: 25,
  },
  { label: "En Cours", value: "enCours", progressValue: 50 },
  { label: "Livraison en Route", value: "livraisonEnRoute", progressValue: 75 },
  { label: "Livrée", value: "livrée", progressValue: 100 },
];
