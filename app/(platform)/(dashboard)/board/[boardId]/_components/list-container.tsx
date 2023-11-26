"use client";

import { TListWithCards } from "@/types";
import { List } from "@prisma/client";
import ListForm from "./list-form";

interface IListContainerProps {
  data: TListWithCards[];
  boardId: string;
}

const ListContainer = ({ data, boardId }: IListContainerProps) => {
  return (
    <div>
      <ol>
        <ListForm />
        <div className="flex shrink-0 w-1" />
      </ol>
    </div>
  );
};

export default ListContainer;
