import { useTaskModal } from "@/context/modal";
import { Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import KanbanCard from "./kanbanCard";
import { Cards } from "@/types/types";

type KanbanBoardProps = {
  title: string;
  id: number;
  cards: Cards[];
};

const KanbanBoard = ({ title, id, cards }: KanbanBoardProps) => {
  const { showDrawer } = useTaskModal();

  return (
    <div className="flex flex-col w-1/4 p-2 gap-6 ">
      <div className="flex justify-between items-center text-[#555555]">
        <h1 className="font-bold text-xl">{title}</h1>
        <Image src={"/ascending.svg"} alt="ascending" width={20} height={20} />
      </div>
      <Droppable droppableId={id.toString()}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col  gap-2"
          >
            {cards.map((d, index) => (
              <KanbanCard
                key={d.id}
                id={index}
                title={d.title}
                description={d.description}
                priority={d.priority}
                deadline={d.deadline}
                created_at={d.created_at}
                column_id={d.column_id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        className="bg-gradient-to-b from-[#3A3A3A] to-[#202020]
       text-white p-2 rounded-md"
        onClick={() => showDrawer(id)}
      >
        <div className="flex items-center justify-between gap-6">
          {" "}
          <h1>Add new </h1> <Plus />
        </div>
      </button>
    </div>
  );
};

export default KanbanBoard;
