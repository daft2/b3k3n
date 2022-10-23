import { ChevronRight, ChevronLeft } from "lucide-react";

type Props = {
  pages: number;
  currentPage: number;
  onClickPage: (value: number) => void;
};

const Pagination = (props: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <nav
          className="isolate inline-flex rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            disabled={props.currentPage === 1}
            onClick={() => props.onClickPage(props.currentPage - 2)}
            className="relative disabled:text-gray-300 inline-flex items-center rounded-l-md border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft size={16} />
          </button>
          {props.currentPage === props.pages && props.pages > 1 && (
            <button
              onClick={() => props.onClickPage(props.currentPage - 3)}
              key={`page-key-${props.currentPage - 2}`}
              className=" text-gray-500 hover:bg-gray-50 border-gray-300 bg-white relative inline-flex items-center border px-2 py-1 text-sm font-medium focus:z-20"
            >
              {props.currentPage - 2}
            </button>
          )}
          {props.currentPage > 1 && (
            <button
              onClick={() => props.onClickPage(props.currentPage - 2)}
              key={`page-key-${props.currentPage - 1}`}
              className=" text-gray-500 hover:bg-gray-50 border-gray-300 bg-white relative inline-flex items-center border px-2 py-1 text-sm font-medium focus:z-20"
            >
              {props.currentPage - 1}
            </button>
          )}
          {Array.from({ length: 1 }, (_, i) => props.currentPage + i).map(
            (page) => (
              <button
                onClick={() => props.onClickPage(page - 1)}
                key={`page-key-${page}`}
                className={`${
                  page === props.currentPage
                    ? "border-indigo-500 bg-indigo-50 text-indigo-600 z-10"
                    : "text-gray-500 hover:bg-gray-50 border-gray-300 bg-white"
                } relative inline-flex items-center border px-2 py-1 text-sm font-medium focus:z-20`}
              >
                {page}
              </button>
            )
          )}
          {props.currentPage === 1 && props.pages > 1 && (
            <>
              <button
                onClick={() => props.onClickPage(props.currentPage)}
                key={`page-key-${props.currentPage + 1}`}
                className=" text-gray-500 hover:bg-gray-50 border-gray-300 bg-white relative inline-flex items-center border px-2 py-1 text-sm font-medium focus:z-20"
              >
                {props.currentPage + 1}
              </button>
              <button
                onClick={() => props.onClickPage(props.currentPage + 1)}
                key={`page-key-${props.currentPage + 2}`}
                className=" text-gray-500 hover:bg-gray-50 border-gray-300 bg-white relative inline-flex items-center border px-2 py-1 text-sm font-medium focus:z-20"
              >
                {props.currentPage + 2}
              </button>
            </>
          )}
          {props.currentPage > 1 && props.currentPage < props.pages && (
            <button
              onClick={() => props.onClickPage(props.currentPage)}
              key={`page-key-${props.currentPage + 1}`}
              className=" text-gray-500 hover:bg-gray-50 border-gray-300 bg-white relative inline-flex items-center border px-2 py-1 text-sm font-medium focus:z-20"
            >
              {props.currentPage + 1}
            </button>
          )}
          <button
            onClick={() => props.onClickPage(props.currentPage)}
            disabled={props.currentPage === props.pages}
            className="relative disabled:text-gray-300 inline-flex items-center rounded-r-md border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          >
            <span className="sr-only">Next</span>
            <ChevronRight size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
