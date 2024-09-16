"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const OnThisPage = ({ htmlcontent }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlcontent;
    const h2Elements = tempDiv.querySelectorAll("h2");
    const h2Texts = Array.from(h2Elements).map((h2) => ({
      text: h2.innerText,
      id: h2.id,
    }));
    setHeadings(h2Texts);
  }, [htmlcontent]);

  return (
    <div className="on-this-page hidden md:absolute top-28 right-1/3">
      <h1 className="text-xl my-5 font-bold cursor-pointer">On this Page</h1>
      <ul className="flex flex-col gap-2 text-[15px] font-semibold">
        {headings.map((heading, index) => {
          return (
            <li className="cursor-pointer" key={index}>
              <Link href={`#${heading.id}`}>{heading.text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default OnThisPage;