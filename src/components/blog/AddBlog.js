"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [metaData, setMetaData] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.core.setContents(content);
    }
  }, [content]);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setImageName(selectedFile ? selectedFile.name : ""); // Set the file name
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("metaData", metaData);
      formData.append("content", content);
      formData.append("image", image);

      const response = await axios.post("/api/add-blog", formData);

      setTitle("");
      setMetaData("");
      setContent("");
      setImage(null);
      setImageName("");
      console.log(response.data);
    } catch (error) {
      console.error("Blog addition operation error", error);
    }
  };

  return (
    <>
      <div className="bg-white my-5 rounded-md shadow-[0px_5px_20px_lightgray] mb-20">
        <h1 className="p-4 text-3xl font-semibold">Add Blog</h1>

        <div className="p-2 rounded-md md:p-5">
          <h2 className="ml-[480px] text-2xl font-semibold uppercase">
            Blog Details
          </h2>

          <div className="ml-44 mr-60 flex flex-col items-center gap-3 py-5 lg:flex-row lg:justify-between lg:items-start">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
                className="text-sm md:text-base md:w-[850px] sm:w-[300px] h-[30px] md:h-[40px] px-2 py-0 border-gray-300 placeholder-gray-500 outline-none rounded-md"
              />
              <input
                type="text"
                id="metaData"
                name="metaData"
                value={metaData}
                onChange={(e) => setMetaData(e.target.value)}
                placeholder="Blog MetaData"
                className="text-sm md:text-base md:w-[850px] sm:w-[300px] h-[30px] md:h-[40px] px-2 py-0 border-gray-300 placeholder-gray-500 outline-none rounded-md"
              />
              <SunEditor
                ref={editorRef}
                setContents={content}
                onChange={setContent}
                height="300px"
                placeholder="Blog Content"
                className="text-black"
                setOptions={{
                  width: "100px",
                  height: "100%",
                  buttonList: [
                    ["undo", "redo"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["preview", "print"],
                    ["link", "image", "video"],
                    [
                      "font",
                      "fontSize",
                      "formatBlock",
                      "align",
                      "list",
                      "table",
                    ],
                    ["fontColor", "hiliteColor", "horizontalRule"],
                  ],
                  font: ["Arial", "Courier New"], // Example: specify fonts
                  fontColor: "red", // Set font color
                  backgroundColor: "red", // Set background color
                }}
              />
              <label
                htmlFor="image"
                className="p-2 border border-gray-300 relative cursor-pointer text-gray-500 hover:text-blue-700"
              >
                <span>{imageName ? imageName : "Upload Blog Image"}</span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden text-sm md:text-base md:w-[850px] sm:w-[300px] h-[30px] md:h-[40px] px-2 py-0 border-gray-300 outline-none rounded-md"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 py-5">
            <button
              onClick={handleAddBlog}
              className="bg-green-500 text-white rounded px-2 py-1"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
