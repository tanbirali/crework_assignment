"use client";
import { useKanbanBoard } from "@/context/kanbanBoard";
import { Cards } from "@/types/types";
import { Draggable } from "@hello-pangea/dnd";
import { Edit2, EllipsisVertical, Timer, Trash } from "lucide-react";
import React, { useState } from "react";

const KanbanCard = ({
  id,
  title,
  description,
  priority,
  deadline,
  created_at,
  column_id,
}: Cards) => {
  function calculateUrgencyColor() {
    switch (priority) {
      case "Low":
        return "bg-[#0ecc5a]";
      case "Medium":
        return "bg-[#FFA235]";
      case "Urgent":
        return "bg-[#FF6B6B]";
    }
  }
  function calculateTimeAgo() {
    const time = new Date(created_at);
    console.log(time);
    const now = new Date();
    const difference = now.getTime() - time.getTime();
    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const { deleteCard } = useKanbanBoard();
  return (
    <Draggable draggableId={id.toString()} index={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-col gap-3 p-3 border rounded-md">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">{title}</h1>
              <div className={`${isOpen ? "block" : "hidden"} relative`}>
                <ul className="absolute top-5 gap-2 bg-slate-100 rounded-md z-[1] p-2">
                  <li className="flex gap-1">
                    <Edit2 />
                    <h1>Edit</h1>
                  </li>
                  <li
                    className="flex gap-1"
                    onClick={() => deleteCard(column_id, id)}
                  >
                    <Trash /> <h1>Delete</h1>
                  </li>
                </ul>
              </div>
              <div
                onClick={() => setIsOpen(true)}
                className="hover:cursor-pointer"
              >
                <EllipsisVertical />
              </div>
            </div>
            <p>{description}</p>
            <div
              className={` border rounded-md w-fit p-2 ${calculateUrgencyColor()} `}
            >
              {priority}
            </div>
            <div className="flex gap-3 items-center">
              {" "}
              <Timer /> <h2>{deadline}</h2>
            </div>
            <h1>{calculateTimeAgo()}</h1>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
