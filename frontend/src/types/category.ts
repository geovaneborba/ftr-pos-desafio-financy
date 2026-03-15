import { ColorVariantType } from '@/constants/colors';
import { IconNameType } from '@/constants/icons';

export type Category = {
  id: string;
  name: string;
  description?: string;
  icon: IconNameType;
  color: ColorVariantType;
  transactionCount: number;
  totalAmountInCents: number;
  createdAt: Date;
  updatedAt: Date;
};
