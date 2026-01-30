export interface ContractData {
  customerName: string;
  customerPhone: string;
  contractId: string;
  vehicleMake: string;
  vehicleModel: string;
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  [key: string]: string;
}
