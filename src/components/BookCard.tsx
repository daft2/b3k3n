import { BookResponse } from "../api/SejutaCitaApi";
import { CATEGORIES } from "../constants/categories";

type Props = {
  book: BookResponse;
  isLoading: boolean;
};

const BookCard = ({ book, isLoading }: Props) => {
  if (isLoading) return <LoadingComponent />;

  return (
    <div className="flex flex-col max-w-[12rem] gap-2">
      <img
        src={book.cover_url}
        width="100%"
        height={"auto"}
        className="rounded-lg shadow-lg"
        alt={`Book with title of ${book.title}`}
      />
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-sm">{book.authors}</h1>
        <span className="text-xs">{CATEGORIES[book.category_id].label}</span>
      </div>
    </div>
  );
};

export const LoadingComponent = () => (
  <div className="flex flex-col max-w-[12rem] gap-2">
    <div className="max-w-xs h-52 bg-slate-300 animate-pulse rounded-lg shadow-lg" />
    <div className="flex flex-col gap-1">
      <div className="h-6 w-28 bg-slate-300 animate-pulse" />
      <div className="h-6 w-16 bg-slate-300 animate-pulse" />
    </div>
  </div>
);

export default BookCard;
