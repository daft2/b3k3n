import { Smile, Briefcase, Hourglass, Landmark, LineChart } from "lucide-react";
import React from "react";

type Props = {
  label: string;
  color?: string;
  icon?: boolean;
};

const Badge = ({ label, color = "blue", icon = false }: Props) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    "Happiness & Mindfulness": <Smile color="red" size={16} />,
    "Career & Business": <Briefcase color="purple" size={16} />,
    "Productivity & Time Management": <Hourglass color="blue" size={16} />,
    "Society & Politics": <Landmark color="black" size={16} />,
    "Investment & Finance": <LineChart color="green" size={16} />,
  };

  return (
    <div
      className={`bg-${color}-100 text-neutral-700 rounded px-2 py-1 font-bold text-xs w-fit flex flex-row gap-2`}
    >
      {icon && iconMap[label]}
      {label}
    </div>
  );
};

export default Badge;
