import { api } from '../../../lib/axios';

export type Paper = {
  title: string;
  authorName: string;
  resume: string;
  email: string;
};

export const PaperService = {
  search: async (
    page: number = 0,
    pageSize: number = 8,
    title: string = '',
  ) => {
    try {
      const { data } = await api.get(
        `papers?page=${page}&pageSize=${pageSize}&title=${title}`,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  submitPaper: async ({ title, authorName, resume, email }: Paper) => {
    try {
      const submitPaperData = {
        title,
        authorName,
        resume,
        email,
      };

      const { data } = await api.post('papers', submitPaperData);

      return data;
    } catch (error) {
      console.log(error);
    }
  },

  getPaperQuantity: async () => {
    try {
      const { data } = await api.get('papers/quantity');
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllRegisteredEmails: async () => {
    try {
      const { data } = await api.get('papers/emails');
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  getAllRegisteredAuthors: async () => {
    try {
      const { data } = await api.get('papers/authors');
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
