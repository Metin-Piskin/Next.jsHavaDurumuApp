import React, { FC } from "react";

interface CategoryButtonProps {
  CategoryButtonText: any;
  Press: any;
  onClick: () => void;
}

const CategoryButton: FC<CategoryButtonProps> = ({
  CategoryButtonText,
  Press,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`text-white ${
        Press ? "border-b-2 border-yellow-300" : ""
      } cursor-pointer`}
    >
      {CategoryButtonText}
    </div>
  );
};

export default CategoryButton;
