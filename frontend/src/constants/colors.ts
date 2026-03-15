export type ColorVariantType = (typeof colorVariants)[number];

export const colorVariants = [
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow'
] as const;

export const colorMap: Record<ColorVariantType, string> = {
  green: 'bg-green-base',
  blue: 'bg-blue-base',
  purple: 'bg-purple-base',
  pink: 'bg-pink-base',
  red: 'bg-red-base',
  orange: 'bg-orange-base',
  yellow: 'bg-yellow-base'
};
