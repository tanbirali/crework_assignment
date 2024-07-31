"use client";
// kanbanBoardContext.ts
import { createContext, ReactNode, useContext, useState } from "react";

interface KanbanBoardContextProps {
  children: ReactNode;
}

interface KanbanBoardContextType {
  kanbanBoardData: any[];
  addCard: (columnId: number, card: any) => void;
  updateCard: (columnId: number, cardId: number, updatedCard: any) => void;
  deleteCard: (columnId: number, cardId: number) => void;
  moveCard: (
    sourceColumnId: number,
    targetColumnId: number,
    cardId: number,
    destinationIndex: number
  ) => void;
}

const KanbanBoardContext = createContext<KanbanBoardContextType | null>(null);

export const KanbanBoardProvider = ({ children }: KanbanBoardContextProps) => {
  const [kanbanBoardData, setKanbanBoardData] = useState([
    {
      id: 0,
      title: "To do",
      cards: [
        {
          id: 0,
          title: "Watch Youtube",
          description:
            "I will be watiching cricket, food vlogs and coding lectures, mit lectures and have a blast ",
          priority: "Medium",
          deadline: "20/10/2024",
          created_at: new Date().toISOString(),
        },
        {
          id: 1,
          title: "Watch Insta",
          description:
            "I will be watiching cricket, food vlogs and coding lectures, mit lectures and have a blast ",
          priority: "Low",
          deadline: "20/10/2024",
          created_at: "1 hours ago",
        },
        {
          id: 2,
          title: "Watch Netflix",
          description:
            "I will be watiching cricket, food vlogs and coding lectures, mit lectures and have a blast ",
          priority: "Urgent",
          deadline: "20/10/2024",
          created_at: "1 hours ago",
        },
      ],
    },
    {
      id: 1,
      title: "In progress",
      cards: [],
    },
    {
      id: 2,
      title: "Under review",
      cards: [],
    },
    {
      id: 3,
      title: "Finished",
      cards: [],
    },
  ]);

  const addCard = (columnId: number, card: any) => {
    const updatedData = [...kanbanBoardData];
    const column = updatedData.find((column) => column.id === columnId);
    if (column) {
      column.cards.push(card);
      setKanbanBoardData(updatedData);
    }
  };

  const updateCard = (columnId: number, cardId: number, updatedCard: any) => {
    const updatedData = [...kanbanBoardData];
    const column = updatedData.find((column) => column.id === columnId);
    if (column) {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        column.cards[cardIndex] = updatedCard;
        setKanbanBoardData(updatedData);
      }
    }
  };

  const deleteCard = (columnId: number, cardId: number) => {
    const updatedData = [...kanbanBoardData];
    const column = updatedData.find((column) => column.id === columnId);
    if (column) {
      const cardIndex = column.cards.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        column.cards.splice(cardIndex, 1);
        setKanbanBoardData(updatedData);
      }
    }
  };

  const moveCard = (
    sourceColumnId: number,
    targetColumnId: number,
    cardId: number,
    destinationIndex: number
  ) => {
    const updatedData = [...kanbanBoardData];
    const sourceColumn = updatedData[sourceColumnId];
    const targetColumn = updatedData[targetColumnId];
    if (sourceColumn && targetColumn) {
      const cardIndex = sourceColumn.cards.findIndex(
        (card) => card.id === cardId
      );
      if (cardIndex !== -1) {
        const card = sourceColumn.cards.splice(cardIndex, 1)[0];
        targetColumn.cards.splice(destinationIndex, 0, card);
        // console.log(updatedData);
        setKanbanBoardData(updatedData);
      }
    }
  };

  return (
    <KanbanBoardContext.Provider
      value={{
        kanbanBoardData,
        addCard,
        updateCard,
        deleteCard,
        moveCard,
      }}
    >
      {children}
    </KanbanBoardContext.Provider>
  );
};

export const useKanbanBoard = (): KanbanBoardContextType => {
  const context = useContext(KanbanBoardContext);
  if (!context) {
    throw new Error("useKanbanBoard must be used within a KanbanBoardProvider");
  }
  return context;
};
