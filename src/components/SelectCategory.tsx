import { SelectHTMLAttributes } from "react";
import { CategoryResponse } from "../api/SejutaCitaApi";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  categories: CategoryResponse[];
  classNames?: string;
  onSelectCategory: (value: number) => void;
}

const SelectCategory = ({
  categories,
  classNames,
  onSelectCategory,
  ...props
}: Props) => {
  return (
    <div
      className={`flex flex-col lg:flex-row lg:gap-2 lg:items-center max-w-sm ${classNames}`}
    >
      <label className="block text-md text-gray-900">Category</label>
      <select
        className="bg-white h-7 px-2 border w-full border-gray-300 text-gray-900 text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block"
        {...props}
        onChange={(e) => onSelectCategory(parseInt(e.target.value))}
      >
        {categories.map((category, index) => (
          <option
            key={`category-option-key-${category.id}-${index}`}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategory;
