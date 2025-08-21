// src/app/models/client-billing.model.ts

export interface ClientBilling {
  customerId: number;
  planName: string;
  description: string;
  price: number;
  chargerTypeId: number;
  
}