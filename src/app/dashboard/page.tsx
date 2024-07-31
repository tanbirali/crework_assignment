"use client";
import {
  BarChart3Icon,
  BarcodeIcon,
  Bell,
  Calendar,
  ChevronRight,
  Download,
  Filter,
  Home,
  LightbulbIcon,
  LucideSortAsc,
  Search,
  Settings,
  Share2,
  Stars,
  Users,
} from "lucide-react";

import {
  DoubleRightOutlined,
  PlusCircleFilled,
  QuestionCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import Image from "next/image";
import React, { useState } from "react";
import Cards from "@/components/cards";
import { title } from "process";
import KanbanBoard from "@/components/kanbanBoard";
import TaskModal from "@/components/taskModal";
import { useTaskModal } from "../../context/modal";
import { useAuth } from "@/context/auth";
import { DragDropContext } from "@hello-pangea/dnd";
import { useKanbanBoard } from "@/context/kanbanBoard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const cardData = [
    {
      id: 1,
      imgUrl: "/card_img_1.svg",
      heading: "Introducing tags",
      content:
        "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    },
    {
      id: 2,
      imgUrl: "/card_img_2.svg",
      heading: "Share Notes Instantly",
      content:
        "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    },
    {
      id: 3,
      imgUrl: "/card_img_3.svg",
      heading: "Access Anywhere",
      content:
        "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    },
  ];

  const { open, showDrawer } = useTaskModal();
  const { user, logout } = useAuth();
  const router = useRouter();
  if (!user) {
    router.push("/");
  }
  const { moveCard, kanbanBoardData } = useKanbanBoard();
  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    console.log("destination: ", destination, "\n source: ", source);
    console.log(draggableId);
    if (!destination) {
      return;
    }
    moveCard(
      source.droppableId,
      destination.droppableId,
      parseInt(draggableId),
      parseInt(destination.index)
    );
  };

  return (
    <div className="flex ">
      <div className="w-1/6 flex flex-col p-4 border">
        {/* Profile Section  */}
        <div className="flex flex-1 flex-col w-full">
          <div className="flex flex-col gap-3 ">
            <div className="flex gap-3 w-full">
              <Image
                src={"/next.svg"}
                alt="profile"
                width={25}
                height={25}
                className="rounded-md"
              />
              <h1 className="text-md font-bold ml-10">{user?.fullname}</h1>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <Bell />
                <LightbulbIcon />
                <DoubleRightOutlined />
              </div>
              <button
                className="bg-slate-100 p-2 border
             text-slate-500 rounded-md text-[12px]"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
          {/* Tabs for side bar  */}
          <div className="flex flex-col gap-3 mt-10">
            <div className="flex gap-6 bg-slate-200 p-3 rounded-md text-slate-600">
              <Home /> <h1>Home</h1>
            </div>
            <div className="flex gap-6 p-3">
              <BarcodeIcon /> <h1>Boards</h1>
            </div>
            <div className="flex gap-6 p-3">
              <Settings /> <h1>Settings</h1>
            </div>
            <div className="flex gap-6 p-3">
              <Users /> <h1>Team</h1>
            </div>
            <div className="flex gap-6 p-3">
              <BarChart3Icon /> <h1>Analytics</h1>
            </div>
          </div>
          <button
            className="bg-violet-500 rounded-md border
           text-white mt-4 p-2"
            onClick={() => showDrawer(0)}
          >
            <div className="flex items-center gap-6 justify-center">
              <h1>Create New Task</h1> <PlusCircleFilled />
            </div>
          </button>
        </div>
        <div className=" flex">
          <button className=" border rounded-md p-2 text-slate-600 w-full  ">
            <div className="flex items-center justify-center gap-3">
              <Download />
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">Download the app</h1>
                <p className="text-[12px]">Get the full experience</p>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="w-5/6 flex flex-col ">
        <div className="flex justify-between p-6">
          <h1 className="text-2xl font-bold">
            Good Morning, {user?.fullname}!
          </h1>
          <div className="flex gap-3 items-center">
            <h1>Help & feedback</h1>
            <QuestionCircleOutlined />
          </div>
        </div>
        {/* Cards Begins here  */}
        <div className="flex flex-col lg:flex-row gap-3 p-6">
          {cardData.map((data) => (
            <Cards
              key={data.id}
              imgUrl={data.imgUrl}
              heading={data.heading}
              content={data.content}
            />
          ))}
        </div>
        <div className="flex justify-between items-center p-6">
          <div className="border bg-white flex gap-1 rounded-md p-2">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              className="outline-none "
            />
            <Search className="text-slate-500 hover:cursor-pointer" />
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 bg-slate-100 text-slate-500 p-2 rounded-md">
              <h1>Calendar view</h1>
              <Calendar />
            </div>
            <div className="flex items-center gap-2 bg-slate-100 text-slate-500 p-2 rounded-md">
              <h1>Automation</h1>
              <Stars />
            </div>
            <div className="flex items-center gap-2 bg-slate-100 text-slate-500 p-2 rounded-md">
              <h1>Filter </h1>
              <Filter />
            </div>
            <div className="flex items-center gap-2 bg-slate-100 text-slate-500 p-2 rounded-md">
              <h1>Share </h1>
              <Share2 />
            </div>
            <button
              className="bg-violet-500 rounded-md 
            border text-white p-2"
              onClick={() => showDrawer(0)}
            >
              <div className="flex gap-2">
                <h1>Create new </h1>
                <PlusCircleFilled />
              </div>
            </button>
          </div>
        </div>

        {/* kanban board  */}
        <div className="p-6 rounded-md ">
          <div className="flex w-full rounded-md gap-5  ">
            <DragDropContext onDragEnd={handleDragEnd}>
              {kanbanBoardData.map((data) => (
                <KanbanBoard
                  key={data.id}
                  title={data.title}
                  id={data.id}
                  cards={data.cards}
                />
              ))}
            </DragDropContext>
          </div>
        </div>
      </div>
      <TaskModal open={open} />
    </div>
  );
};

export default Dashboard;
