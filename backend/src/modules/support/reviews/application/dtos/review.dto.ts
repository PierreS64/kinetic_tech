export class CreateReviewDto {
  productId: string;
  rating: number; // typically 1 to 5
  comment?: string;
}
