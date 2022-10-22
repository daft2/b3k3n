import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Searchbar = ({ className, ...props }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-center w-full max-w-sm">
      <label className="block text-md text-gray-900">Search</label>
      <input
        type="text"
        name="search"
        className={`${className} block text-xs bg-white w-full border border-gray-300 rounded-md h-7 px-2 placeholder:text-gray-500 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1`}
        placeholder="Search by book title.."
        {...props}
      />
    </div>
  );
};

export default Searchbar;
