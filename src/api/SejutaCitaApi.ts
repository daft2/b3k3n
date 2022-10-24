import axios from "axios";

export type CategoryResponse = {
  id: number;
  name: string;
};

export type BookResponse = {
  id: number;
  title: string;
  category_id: number;
  authors: string[];
  cover_url: string;
  description: string;
  sections: {
    title: string;
    content: string;
  }[];
  audio_length: number;
};

type ParamsType = {
  categoryId?: number;
  page?: number;
  size?: number;
};

const SejutaCitaApi = {
  getCategories: async () => {
    console.log(process.env.REACT_APP_VERCEL_URL);
    return await axios.get(
      process.env.REACT_APP_VERCEL_URL + "/fee-assessment-categories"
    );
  },
  getBooks: async ({ categoryId = 1, page = 0, size }: ParamsType) => {
    console.log(process.env.REACT_APP_VERCEL_URL);

    const body = {
      categoryId,
      page,
      size,
    };

    return await axios.get(
      process.env.REACT_APP_VERCEL_URL + "/fee-assessment-books",
      {
        params: body,
      }
    );
  },
  getTotalBooks: async ({ categoryId }: ParamsType) => {
    const totalBooks = await axios
      .get(process.env.REACT_APP_VERCEL_URL + "/fee-assessment-books", {
        params: { categoryId },
      })
      .then((response) => response.data.length || 0)
      .catch(() => 0);

    return {
      count: totalBooks,
    };
  },
};

export default SejutaCitaApi;
