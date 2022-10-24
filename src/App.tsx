import React from "react";
import SejutaCitaApi, {
  BookResponse,
  CategoryResponse,
} from "./api/SejutaCitaApi";
import BookCard from "./components/BookCard";
import Searchbar from "./components/common/Searchbar";
import SelectCategory from "./components/SelectCategory";
import Pagination from "./components/common/Pagination";
import BookDetailModal from "./components/common/BookDetailModal";

function App() {
  const [categories, setCategories] = React.useState<CategoryResponse[] | []>(
    []
  );
  const [books, setBooks] = React.useState<BookResponse[] | []>([]);
  const [loading, setLoading] = React.useState({
    categories: true,
    books: true,
    meta: true,
  });
  const [params, setParams] = React.useState({
    categoryId: 1,
    size: 12,
  });
  const [meta, setMeta] = React.useState({
    page: 0,
    total_pages: 0,
    total_books: 0,
  });
  const [selectedBook, setSelectedBook] = React.useState<
    BookResponse | undefined
  >(undefined);

  const [bookmarkedBooks, setBookmarkedBooks] = React.useState<BookResponse[]>(
    [] as BookResponse[]
  );

  const [searchValue, setSearchValue] = React.useState("");
  const lowercasedSearchValue = searchValue.toLowerCase();

  let filteredBooks: BookResponse[] = [];
  // Search through books state for each keys
  if (books.length > 0) {
    filteredBooks = books.filter((book: any) => {
      return Object.keys(book).some((key: any) =>
        book[key].toString().toLowerCase().includes(lowercasedSearchValue)
      );
    });
  }

  const higlightBook = books.slice(0, 1);

  const getCategories = () => {
    setLoading((prev) => ({ ...prev, categories: true }));

    SejutaCitaApi.getCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading((prev) => ({ ...prev, categories: false })));
  };

  const getBooks = () => {
    setLoading((prev) => ({ ...prev, books: true }));

    SejutaCitaApi.getBooks({ ...params, page: meta.page })
      .then((response) => setBooks(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading((prev) => ({ ...prev, books: false })));
  };

  const getTotalBooks = () => {
    setLoading((prev) => ({ ...prev, meta: true }));

    SejutaCitaApi.getTotalBooks({ categoryId: params.categoryId })
      .then((response) => {
        const pages = Math.floor(response.count / params.size);
        setMeta((prev) => ({
          ...prev,
          total_books: response.count,
          total_pages: pages,
        }));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading((prev) => ({ ...prev, meta: false })));
  };

  React.useEffect(() => {
    getCategories();
    getTotalBooks();
    setMeta((prev) => ({ ...prev, page: 0 }));
  }, [params.categoryId]);

  React.useEffect(() => {
    getBooks();
  }, [params.categoryId, meta.page]);

  React.useEffect(() => {
    const bookmarks = localStorage.getItem("bookmarks");
    if (bookmarks) setBookmarkedBooks(JSON.parse(bookmarks));
  }, []);

  const handleSelectCategory = (value: number) => {
    setParams((prev) => ({ ...prev, categoryId: value }));
  };

  const handleChangePage = (value: number) => {
    setMeta((prev) => ({ ...prev, page: value }));
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handlePressBook = (book: BookResponse) => {
    setSelectedBook(book);
    setIsOpen(!isOpen);
  };

  const onBookmark = (bookmark: BookResponse[]) => {
    setBookmarkedBooks(bookmark);
  };

  return (
    <div className="relative">
      <div className="flex font-poppins flex-col bg-white bg-[url('/src/images/endless-clouds.svg')] min-h-screen text-neutral-800">
        <div className="flex flex-row items-center justify-between bg-violet-500 text-white px-8 py-2 sticky top-0 z-50 ">
          <h1 className="text-3xl font-semibold">
            Booku<span className="text-yellow-300">!</span>
          </h1>
        </div>
        <BookDetailModal
          onClose={handleCloseModal}
          book={selectedBook}
          isOpen={isOpen}
          onBookmark={onBookmark}
        />
        <div className="flex flex-col bg-violet-500 text-white px-8 py-2">
          <h1 className="text-center text-xl md:text-2xl lg:text-3xl p-2">
            Booku Recommendation
          </h1>
          {higlightBook.map((book) => (
            <div className="flex flex-col lg:flex-row justify-around items-center gap-2 p-2 ">
              <img
                src={book.cover_url}
                width="100%"
                height={"auto"}
                className="rounded-lg shadow-lg max-w-[10rem]"
                alt={`Book with title of ${book.title}`}
              />
              <div className="flex flex-col gap-2 items-center">
                <span className="text-center text-lg md:text-xl lg:text-2xl">
                  "{book.description}"
                </span>
                <span>-{book.authors}</span>
                <button
                  onClick={() => handlePressBook(book)}
                  className="bg-violet-700 py-1 px-4 hover:bg-violet-400 rounded-full"
                >
                  Read Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {bookmarkedBooks.length > 0 && (
          <div className="px-8 py-4 flex flex-col gap-2">
            <span className="text-2xl font-bold">My Bookmark</span>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {bookmarkedBooks.map((book: BookResponse, index: number) => (
                <div
                  className="cursor-pointer"
                  key={`book-key-${index}-${book.id}`}
                  onClick={() => handlePressBook(book)}
                >
                  <BookCard book={book} isLoading={false} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex px-8 py-4 flex-col relative">
          <span className="text-2xl font-bold">Available Books</span>
          <div className="flex flex-col lg:flex-row gap-2 mb-8">
            <Searchbar
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <SelectCategory
              onSelectCategory={handleSelectCategory}
              categories={categories}
            />
          </div>
          {filteredBooks.length === 0 && (
            <div className="h-80 flex justify-center items-center">
              <h1>
                We can't find the book you're looking for, check that you typed
                the title or authors name correctly or maybe try searching for
                different thing...
              </h1>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {searchValue === "" &&
              books.map((book, index) => (
                <div
                  className="cursor-pointer"
                  key={`book-key-${index}-${book.id}`}
                  onClick={() => handlePressBook(book)}
                >
                  <BookCard book={book} isLoading={loading.books} />
                </div>
              ))}
            {searchValue !== "" &&
              filteredBooks.map((book, index) => (
                <div
                  className="cursor-pointer"
                  key={`book-key-${index}-${book.id}`}
                  onClick={() => handlePressBook(book)}
                >
                  <BookCard book={book} isLoading={loading.books} />
                </div>
              ))}
          </div>
        </div>
        {!loading.meta && searchValue === "" && (
          <Pagination
            onClickPage={handleChangePage}
            currentPage={meta.page + 1}
            pages={meta.total_pages + 1}
          />
        )}
      </div>
    </div>
  );
}

export default App;
