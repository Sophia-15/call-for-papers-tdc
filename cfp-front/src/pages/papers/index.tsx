import { useQuery } from '@tanstack/react-query';
import { Header } from '../../components/Header';
import { Paper, PaperService } from '../../services/http/paper';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucidePlus,
  Search,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from '../../hooks/useDebounce';

type ReactPaginateProps = {
  selected: number;
};

export function ListPapers() {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(8);
  const navigate = useNavigate();
  const { register, watch } = useForm();
  const title = watch('title');

  const debouncedTitle = useDebounce(title, 300);

  const { data: papers } = useQuery({
    queryKey: ['papers', pageNumber, debouncedTitle],
    queryFn: () => {
      return PaperService.search(pageNumber, pageSize, title?.trim());
    },
    enabled: true,
  });

  const { data: quantity, isLoading: isQuantityLoading } = useQuery({
    queryKey: ['paper quantity'],
    queryFn: () => PaperService.getPaperQuantity(),
  });

  function handleChangePage({ selected }: ReactPaginateProps) {
    setPageNumber(selected);
  }

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            Palestras
          </h1>
        </div>

        <div className="flex flex-col">
          <button
            className="flex items-center gap-2 bg-blue-500 px-4 py-2 text-white rounded-sm font-medium cursor-pointer ml-auto my-4"
            onClick={() => navigate('/enviar')}
          >
            Submeter <LucidePlus />
          </button>

          <div className="flex items-center justify-between gap-8">
            <div className="relative">
              <div className="absolute top-3 left-3 text-gray-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Procurar por título..."
                className="pl-9 pr-4 py-2 bg-white rounded-sm text-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-gray-200 "
                {...register('title')}
              />
            </div>
          </div>

          <div className="min-h-[650px] my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="rounded-lg overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-blue-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Nome do Autor
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Título
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {papers &&
                      papers.map((paper: Paper, index: number) => {
                        const initialsBg = [
                          'bg-red-500/20',
                          'bg-blue-500/20',
                          'bg-green-500/20',
                          'bg-orange-500/20',
                          'bg-purple-500/20',
                        ];

                        const initialTextColor = [
                          'text-red-500',
                          'text-blue-500',
                          'text-green-500',
                          'text-orange-500',
                          'text-purple-500',
                        ];

                        return (
                          <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div
                                  className={`h-10 w-10 flex-shrink-0 rounded-full ${
                                    initialsBg[index % initialsBg.length]
                                  } flex items-center justify-center`}
                                >
                                  <span
                                    className={`${
                                      initialTextColor[
                                        index % initialTextColor.length
                                      ]
                                    } font-medium`}
                                  >
                                    {paper.authorName.split(' ')[0][0]}
                                    {paper.authorName.split(' ').length > 1 &&
                                      paper.authorName.split(' ')[1][0]}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {paper.authorName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">
                                {paper.title}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {paper.email}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isQuantityLoading && (
        <ReactPaginate
          pageCount={quantity / pageSize}
          previousLabel={<LucideChevronLeft />}
          nextLabel={<LucideChevronRight />}
          onPageChange={handleChangePage}
          containerClassName="flex items-center justify-center space-x-2 "
          pageLinkClassName="px-4 py-2 border-2 border-blue-100 rounded-lg cursor-pointer hover:bg-blue-200"
          activeLinkClassName="bg-blue-500 text-white font-medium hover:bg-blue-500"
          // previousLinkClassName="rounded-lg px-3 py-2 bg-blue-300 hover:bg-blue-400 text-blue-800 cursor-pointer"
          // nextLinkClassName="rounded-lg px-3 py-2 bg-blue-300 hover:bg-blue-400 text-blue-800 cursor-pointer"
          breakClassName="text-blue-500"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      )}

      <footer className="text-center mt-20 mb-4">
        <span className="inline-block h-3 w-3 rounded-full bg-red-500 mr-1"></span>
        <span className="inline-block h-3 w-3 rounded-full bg-blue-500 mr-1"></span>
        <span className="inline-block h-3 w-3 rounded-full bg-green-500 mr-1"></span>
        <span className="inline-block h-3 w-3 rounded-full bg-orange-500 mr-1"></span>
        <span className="inline-block h-3 w-3 rounded-full bg-purple-500 mr-1"></span>
      </footer>
    </>
  );
}
