"use client";
import { useKanbanBoard } from "@/context/kanbanBoard";
import { useTaskModal } from "@/context/modal";
import { ExpandAltOutlined } from "@ant-design/icons";
import { Divider, Drawer, Space } from "antd";
import {
  AlertTriangleIcon,
  Calendar,
  Edit2,
  LightbulbIcon,
  Plus,
  Share2,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
type TaskModalProps = {
  open: boolean;
  // setOpen: (param: boolean) => void;
};

const TaskModal = ({ open }: TaskModalProps) => {
  const { btnId, onClose } = useTaskModal();

  const { addCard } = useKanbanBoard();
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    description: "",
    deadline: "",
    status: "",
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };
  useEffect(() => {
    switch (btnId) {
      case 0:
        setFormData({ ...formData, status: "" });
        break;
      case 1:
        setFormData({ ...formData, status: "todo" });

        break;
      case 2:
        setFormData({ ...formData, status: "inprogress" });

        break;
      case 3:
        setFormData({ ...formData, status: "underreview" });

        break;
      case 4:
        setFormData({ ...formData, status: "finished" });

        break;
      default:
        setFormData({ ...formData, status: "" });
    }
  }, [btnId]);
  const card = {
    title: formData.title,
    priority: formData.priority,
    description: formData.description,
    deadline: formData.deadline,
    status: formData.status,
  };
  const columnId =
    formData.status === "todo"
      ? 0
      : formData.status === "inprogress"
      ? 1
      : formData.status === "underreview"
      ? 2
      : formData.status === "finished"
      ? 3
      : 0;
  const handleSave = () => {
    addCard(columnId, card);
    setFormData({
      title: "",
      priority: "",
      description: "",
      deadline: "",
      status: "",
    });
  };
  return (
    <Drawer
      onClose={onClose}
      open={open}
      width={500}
      title={<ExpandAltOutlined className="text-slate-400" />}
      extra={
        <Space>
          <div
            className="flex gap-3 items-center bg-slate-200 
          p-2 border rounded-md text-slate-500 hover:cursor-pointer"
          >
            <h1>Share</h1>
            <Share2 />
          </div>
          <div
            className="flex gap-3 items-center bg-slate-200 
          p-2 border rounded-md text-slate-500 hover:cursor-pointer"
          >
            <h1>Favourite</h1>
            <Star />
          </div>
        </Space>
      }
    >
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        className="text-3xl p-2 w-80 outline-none font-semibold mb-8"
      />
      <div className="flex flex-col gap-4 text-[#555555]">
        <div className="flex gap-8 items-center">
          <LightbulbIcon />
          <h1>Status</h1>
          <select
            value={formData.status}
            name="status"
            onChange={handleInputChange}
          >
            <option value="">Not Selected</option>
            <option value="todo">To do</option>
            <option value="inprogress">In progress</option>
            <option value="underreview">Under review</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div className="flex gap-8 items-center">
          <AlertTriangleIcon />
          <h1>Priority</h1>
          <select
            className=""
            name="priority"
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option value="">Not Selected</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
        <div className="flex gap-8 items-center">
          <Calendar />
          <h1>Deadline</h1>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-8 items-center ">
          <Edit2 />
          <h1>Description</h1>
          <input
            placeholder="Not Selected"
            className="p-2 outline-none"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-violet-600 rounded-md p-2 text-white"
            onClick={handleSave}
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="flex gap-3 mt-9">
        <Plus />
        <h1>Add custom property</h1>
      </div>
      <Divider />
      <p className="text-slate-400">
        Start writing, or drag your own files here.
      </p>
    </Drawer>
  );
};

export default TaskModal;
