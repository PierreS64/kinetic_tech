export class CreateUserDeviceDto {
  productId: string;
  serialNumber: string;
  purchaseDate: string; // ISO String
  warrantyExpiryDate: string; // ISO String
}
