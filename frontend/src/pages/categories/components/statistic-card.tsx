import { LucideIcon } from 'lucide-react';

type CategoryStatisticCardProps = {
  categoryStatistic: {
    label: string;
    value: string | number;
    icon: LucideIcon;
    iconColor: string;
  };
};

export function CategoryStatisticCard({
  categoryStatistic
}: CategoryStatisticCardProps) {
  const { label, value, icon: Icon, iconColor } = categoryStatistic;

  return (
    <div className="flex gap-4 rounded-[12px] border border-gray-200 bg-white p-6">
      <div className="flex gap-2">
        <div className="last:capitalize">
          <span className="flex items-center gap-4 font-bold text-gray-800 lg:text-[28px]">
            <Icon className={iconColor} /> {value}
          </span>
          <p className="mt-2 text-xs font-medium text-gray-500 uppercase">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
