import Image from "next/image";
import React from "react";

type cardProps = {
  imgUrl: string;
  heading: string;
  content: string;
};

const Cards = ({ imgUrl, heading, content }: cardProps) => {
  return (
    <div className="bg-white flex flex-row gap-6 p-3 border rounded-md">
      <Image src={imgUrl} alt="CardImage" width={100} height={100} />
      <div className="flex flex-col">
        <h1 className="text-slate-600 text-xl font-medium">{heading}</h1>
        <h1 className="text-slate-400">{content}</h1>
      </div>
    </div>
  );
};

export default Cards;
