import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/application/prisma.service';
import { ComponentType } from '@prisma/client';

@Injectable()
export class BuilderService {
  constructor(private prisma: PrismaService) {}

  async getComponentsByType(type: ComponentType) {
    return this.prisma.product.findMany({
      where: {
        deletedAt: null,
        PcComponentSpec: {
          componentType: type,
        },
      },
      include: {
        PcComponentSpec: true,
        ProductImage: true,
        ProductVariant: true,
      },
    });
  }

  async checkCompatibility(productIds: string[]) {
    if (!productIds || productIds.length === 0) {
      return { compatible: true, warnings: [] };
    }

    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { PcComponentSpec: true },
    });

    const warnings: string[] = [];

    const cpu = products.find(
      (p) => p.PcComponentSpec?.componentType === 'CPU',
    )?.PcComponentSpec;
    const mb = products.find(
      (p) => p.PcComponentSpec?.componentType === 'MOTHERBOARD',
    )?.PcComponentSpec;
    const ram = products.find(
      (p) => p.PcComponentSpec?.componentType === 'RAM',
    )?.PcComponentSpec;
    const psu = products.find(
      (p) => p.PcComponentSpec?.componentType === 'PSU',
    )?.PcComponentSpec;
    const gpu = products.find(
      (p) => p.PcComponentSpec?.componentType === 'GPU',
    )?.PcComponentSpec;
    const pcCase = products.find(
      (p) => p.PcComponentSpec?.componentType === 'CASE',
    )?.PcComponentSpec;
    const cooler = products.find(
      (p) => p.PcComponentSpec?.componentType === 'COOLER',
    )?.PcComponentSpec;

    // 1. CPU and Motherboard socket check
    if (cpu && mb) {
      const cpuSockets = cpu.socket || [];
      const mbSockets = mb.socket || [];
      const hasMatchingSocket = cpuSockets.some((s) => mbSockets.includes(s));
      if (!hasMatchingSocket) {
        warnings.push(
          `Cảnh báo: CPU Socket không khớp với Motherboard Socket.`,
        );
      }
    }

    // 2. RAM and Motherboard type check
    if (ram && mb) {
      if (ram.ramType && mb.ramType && ram.ramType !== mb.ramType) {
        warnings.push(
          `Cảnh báo: Chuẩn RAM (${ram.ramType}) không khớp với hỗ trợ của Motherboard (${mb.ramType}).`,
        );
      }
    }

    // 3. GPU Length vs Case Max GPU Length
    if (gpu && pcCase) {
      if (
        gpu.length &&
        pcCase.maxGpuLength &&
        gpu.length > pcCase.maxGpuLength
      ) {
        warnings.push(
          `Cảnh báo: Chiều dài GPU (${gpu.length}mm) vượt quá mức cho phép của Case (${pcCase.maxGpuLength}mm).`,
        );
      }
    }

    // 4. Power Supply (Wattage)
    if (psu) {
      const cpuWattage = cpu?.wattage || 0;
      const gpuWattage = gpu?.wattage || 0;
      const totalEstimatedWattage = cpuWattage + gpuWattage + 100; // Adding 100W buffer for other components
      if (psu.wattage && totalEstimatedWattage > psu.wattage) {
        warnings.push(
          `Cảnh báo: Công suất nguồn (${psu.wattage}W) có thể không đủ. Ước tính hệ thống cần khoảng ${totalEstimatedWattage}W.`,
        );
      }
    }

    // 5. Cooler Height vs Case
    if (cooler && pcCase && pcCase.maxCoolerHeight && cooler.height) {
      if (cooler.height > pcCase.maxCoolerHeight) {
        warnings.push(
          `Cảnh báo: Chiều cao tản nhiệt (${cooler.height}mm) vượt quá mức cho phép của Case (${pcCase.maxCoolerHeight}mm).`,
        );
      }
    }

    return {
      compatible: warnings.length === 0,
      warnings,
    };
  }
}
