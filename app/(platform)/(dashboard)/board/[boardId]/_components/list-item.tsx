"use client";

import { TListWithCards } from "@/types";
import ListHeader from "./list-header";

interface IListeItemProps {
  data: TListWithCards;
  index: number;
}

const ListItem = ({ index, data }: IListeItemProps) => {
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
};

export default ListItem;
