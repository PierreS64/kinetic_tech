export class CreateAdminProductDto {
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  cpu?: string;
  ram?: string;
  storage?: string;
  gpu?: string;
  tags?: string;
  inStock?: string; // from formData it will be string 'true' or 'false'
}
