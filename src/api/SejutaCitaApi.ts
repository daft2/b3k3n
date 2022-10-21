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
    return await axios.get("/fee-assessment-categories");
  },
  getBooks: async ({ categoryId = 1, page = 0, size }: ParamsType) => {
    const body = {
      categoryId,
      page,
      size,
    };

    return await axios.get("/fee-assessment-books", { params: body });
  },
};

export default SejutaCitaApi;
