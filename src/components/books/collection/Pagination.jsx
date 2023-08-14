import React, { useState } from "react";

export default function Pagination({ collection, itemsPerPage }) {
  console.log(collection.length);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(collection.length / itemsPerPage);

  // Calculate the range of visible page numbers
  const visiblePages = calculateVisiblePages(currentPage, totalPages);

  // Helper function to calculate the range of visible page numbers
  function calculateVisiblePages(currentPage, totalPages) {
    const range = 2; // Number of visible pages on each side of the current page
    let start = currentPage - range;
    let end = currentPage + range;

    if (start < 1) {
      start = 1;
      end = Math.min(start + range * 2, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - range * 2, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Handle page navigation
  function goToPage(page) {
    setCurrentPage(page);
  }

  return (
    <div>
      <div>
        {/* Render your collection items for the current page */}
        {collection
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((item, index) => (
            <div key={index}>{item.title}</div>
          ))}
      </div>

      <div>
        {/* Render pagination controls */}
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          Prev
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
