import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";

const PaginationButton = ({ pageCount, onPageChange }) => {
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4"> ... </span>}
        nextLabel={
          <div className="w-10 h-10 flex items-center justify-center rounded-md">
            <i className="bx bxs-right-arrow text-white"></i>
          </div>
        }
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          <div className="w-10 h-10 flex items-center justify-center rounded-md">
            <i className="bx bxs-left-arrow text-white"></i>
          </div>
        }
        containerClassName="flex items-center justify-center mt-10 mb-4 cursor-pointer"
        pageClassName="block border- border-gray-300 hover:bg-indigo-800 w-10 h-10 flex items-center justify-center rounded-md text-white font-semibold"
        activeClassName="bg-indigo-900 font-bold border-none"
      />
    </motion.div>
  );
};

export default PaginationButton;
