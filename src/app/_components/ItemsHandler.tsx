import { useState } from "react";
import { api } from "~/trpc/react";
import { ChevronLeft, ChevronRight, ChevronsRight, ChevronsLeft } from "lucide-react";

export default function ItemsHandler({ userId }: { userId: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    data: products,
    isLoading,
    error,
  } = api.items.getItems.useQuery({ userId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPageButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + totalPageButtonsToShow - 1);

    if (endPage - startPage + 1 < totalPageButtonsToShow) {
      startPage = Math.max(1, endPage - totalPageButtonsToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="mx-4 w-full max-w-md space-y-12 rounded-xl border bg-card p-6 sm:px-8">
          <div className="space-y-4 text-center">
            <h2 className="mt-5 text-2xl font-bold">
              Please mark your interests!
            </h2>
            <p className="font-semibold">We will keep you notified.</p>
          </div>

          <div className="ml-3 space-y-4">
            <p className="font-semibold mb-5">My Saved interest!</p>
            {currentProducts?.map((product) => (
              <div key={product.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={product.id}
                  name={product.name}
                  className="mr-3 h-6 w-6 rounded border-gray-300 text-gray-500 focus:ring-gray-500"
                />
                <label htmlFor={product.id} className="font-medium">
                  {product.name}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              
              className="p-1 bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronsLeft size={20} />
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            {getPageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            {totalPages > getPageNumbers()[getPageNumbers().length - 1] && (
              <span>...</span>
            )}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1 bg-gray-200 rounded disabled:opacity-50"
            >
              <ChevronsRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}