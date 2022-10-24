import {
  Book,
  BookmarkMinus,
  BookmarkPlus,
  BookOpen,
  Music,
  Timer,
} from "lucide-react";
import React from "react";
import { BookResponse } from "../../api/SejutaCitaApi";
import Button from "./Button";
import Modal from "./Modal";

type Props = {
  book?: BookResponse;
  isOpen: boolean;
  onClose: () => void;
  onBookmark: (value: BookResponse[]) => void;
};

const BookDetailModal = ({ book, isOpen, onClose, onBookmark }: Props) => {
  const [bookmarks, setBookmarks] = React.useState<BookResponse[]>([]);

  React.useEffect(() => {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) setBookmarks(JSON.parse(bookmarks));
  }, []);

  const isBookmarked = bookmarks.find(
    (b) => b.id === book?.id || b.title === book?.title
  );

  const handleAddBookmark = (book: BookResponse) => {
    const newData = [...bookmarks, book];
    localStorage.setItem("bookmarks", JSON.stringify(newData));
    setBookmarks(newData);
    onBookmark(newData);
  };

  const handleRemoveBookmark = (book: BookResponse) => {
    const newData = bookmarks.filter((b) => b.id !== book.id);
    localStorage.setItem("bookmarks", JSON.stringify(newData));
    setBookmarks(newData);
    onBookmark(newData);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={book?.cover_url}
            width="100%"
            height={"auto"}
            className="rounded-lg shadow-lg max-w-[10rem]"
            alt={`Book with title of ${book?.title}`}
          />
          {!isBookmarked && (
            <button
              onClick={() => handleAddBookmark(book!)}
              className="absolute top-1 right-1 cursor-pointer bg-violet-500 p-1 rounded"
            >
              <h1 className="text-white">
                <BookmarkPlus size={18} />
              </h1>
            </button>
          )}
          {isBookmarked && (
            <button
              onClick={() => handleRemoveBookmark(book!)}
              className="absolute top-1 right-1 cursor-pointer bg-violet-500 p-1 rounded"
            >
              <h1 className="text-white">
                <BookmarkMinus size={18} />
              </h1>
            </button>
          )}
        </div>
        <div className="flex">
          <Button
            className="my-4"
            label={
              <span className="flex flex-row items-center gap-1">
                <BookOpen size={16} />
                <h1>Read</h1>
              </span>
            }
          />
          <Button
            className="my-4"
            label={
              <span className="flex flex-row items-center gap-1">
                <Music size={16} />
                <h1>Listen</h1>
              </span>
            }
            outline
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-bold text-xl">{book?.title}</span>
        <span className="font-semibold text-sm">{book?.authors}</span>
        <hr />
        <div className="flex flex-row justify-around">
          <div className="flex flex-col items-center">
            <Book />
            {book?.sections.length + " chapters"}
          </div>
          <div className="flex flex-col items-center">
            <Timer />
            {Math.ceil(book?.audio_length! / 60) + " minutes"}
          </div>
        </div>
        <hr />
        <span className="font-bold">What's it about?</span>
        <span>{book?.description}</span>
        <hr />
        <span className="font-bold">Chapter</span>
        <div className="max-h-36 overflow-y-scroll">
          {book?.sections.map((section, index) => (
            <div
              className="my-2"
              key={`book-section-key-${section.title}-${index}`}
            >
              <h1 className="font-bold">{`Chapter ${index + 1}: ${
                section.title
              }`}</h1>
              <span>{section.content}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default BookDetailModal;
