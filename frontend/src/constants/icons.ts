import * as LucideIcons from 'lucide-react';

export type IconNameType = (typeof iconNames)[number];

export const iconNames = [
  'briefcase_business',
  'car_front',
  'heart_pulse',
  'piggy_bank',
  'shopping_cart',
  'ticket',
  'tool_case',
  'utensils',
  'paw_print',
  'house',
  'gift',
  'dumbbell',
  'book_open',
  'baggage_claim',
  'mailbox',
  'receipt_text'
] as const;

export const iconMap: Record<IconNameType, React.ElementType> = {
  briefcase_business: LucideIcons.BriefcaseBusiness,
  car_front: LucideIcons.CarFront,
  heart_pulse: LucideIcons.HeartPulse,
  piggy_bank: LucideIcons.PiggyBank,
  shopping_cart: LucideIcons.ShoppingCart,
  ticket: LucideIcons.Ticket,
  tool_case: LucideIcons.ToolCase,
  utensils: LucideIcons.Utensils,
  paw_print: LucideIcons.PawPrint,
  house: LucideIcons.House,
  gift: LucideIcons.Gift,
  dumbbell: LucideIcons.Dumbbell,
  book_open: LucideIcons.BookOpen,
  baggage_claim: LucideIcons.BaggageClaim,
  mailbox: LucideIcons.Mailbox,
  receipt_text: LucideIcons.ReceiptText
};
