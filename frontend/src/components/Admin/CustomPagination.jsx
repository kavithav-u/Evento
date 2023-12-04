import React from 'react';
import ReactPaginate from 'react-paginate';

const CustomPagination = ({ pageCount, onPageChange, currentPage }) => (
  <ReactPaginate
    previousLabel="Previous"
    nextLabel="Next"
    breakLabel="..."
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={onPageChange}
    containerClassName="flex justify-center list-none p-0"
    activeClassName="text-white bg-blue-500"
    pageClassName="inline-block mr-2"
    pageLinkClassName="block py-2 px-4 text-blue-500 border border-gray-300 rounded hover:bg-blue-100"
    previousClassName="inline-block mr-2 text-blue-500 border border-gray-300 rounded hover:bg-blue-100"
    previousLinkClassName="py-2 px-4"
    nextClassName="inline-block ml-2 text-blue-500 border border-gray-300 rounded hover:bg-blue-100"
    nextLinkClassName="py-2 px-4"
    breakClassName="inline-block mr-2 text-blue-500 border border-gray-300 rounded hover:bg-blue-100"
    breakLinkClassName="py-2 px-4"
    initialPage={currentPage}
  />
);

export default CustomPagination;
