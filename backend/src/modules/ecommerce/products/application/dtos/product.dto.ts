import { ComponentType } from '@prisma/client';

export class CreateAdminProductDto {
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  tags?: string;
  inStock?: string; // from formData it will be string 'true' or 'false'

  brand?: string;
  description?: string;

  // PcComponentSpec fields
  componentType?: ComponentType;
  socket?: string; // Can be stringified JSON array or comma separated
  chipset?: string;
  ramType?: string;
  ramSpeed?: string;
  ramModules?: string;
  ramSlots?: string;
  ramCapacity?: string;
  formFactor?: string;
  length?: string;
  maxGpuLength?: string;
  height?: string;
  maxCoolerHeight?: string;
  wattage?: string;
  psuEfficiency?: string;
  pcie8Pin?: string;
  pcie12Vhpwr?: string;
  eps8Pin?: string;
  sataPorts?: string;
  m2Slots?: string;
  m2FormFactor?: string;
  radiatorSize?: string;
  supportedRadiators?: string;
}
