"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import CommonTable from "../common/CommonTable";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";

export default function AllBlog() {
  const [blogsData, setBlogsData] = useState([]);
  const [title, setTitle] = useState();
  const [metaData, setMetaData] = useState("");
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [slug, setSlug] = useState();
  const [imageName, setImageName] = useState("");
  const [previousimage, setPreviousImage] = useState();
  const [selectedId, setSelectedId] = useState();
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
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

  const handleDialogClose = () => {
    setUpdateModalOpen(false);
    setImageName("");
  };

  const handleGetBlogs = async (e) => {
    try {
      const response = await axios.get("/api/get-all-blogs");
      const data = response.data;
      setBlogsData(data);
    } catch (error) {
      console.error("Blogs Get operation error", error);
    }
  };

  useEffect(() => {
    handleGetBlogs();
  }, []);

  const handleBlogEdit = async (row) => {
    setSelectedId(row.original.id);
    setTitle(row.original.title);
    setMetaData(row.original.metaData);
    setContent(row.original.content);
    setImage(row.original.image);
    setSlug(row.original.slug);
    setPreviousImage(row.original.image);
    setImageName("");
    setUpdateModalOpen(true);
  };

  const handleBlogUpdate = async (e) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("metaData", metaData);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("slug", slug);
      formData.append("selectedId", selectedId);
      formData.append("previousimage", previousimage);

      const response = await axios.put("/api/update-blog", formData);
      alert("Blog updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Customer Update operation error", error);
    } finally {
      setUpdateModalOpen(false);
      handleGetBlogs();
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Sr.no",
        enableEditing: false,
      },
      {
        accessorKey: "title",
        header: "Title",
        enableEditing: false,
      },
      {
        accessorKey: "metaData",
        header: "Metadata",
        enableEditing: false,
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ row }) => {
          return (
            <div className="text-xs">
              <div className="flex items-center gap-4">
                <button
                  className="text-xs text-blue-500"
                  type="button"
                  onClick={() => handleBlogEdit(row)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <h2 className="text-2xl font-bold">ITEM LIST</h2>
      <CommonTable columns={columns} data={blogsData} />
      <Dialog
        open={isUpdateModalOpen}
        onClose={() => {
          handleDialogClose;
        }}
      >
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="text-sm md:text-base w-full h-[30px] md:h-[40px] px-2 py-0 border-gray-300 placeholder-gray-500 outline-none rounded-md mb-2"
          />
          <input
            type="text"
            id="metaData"
            name="metaData"
            value={metaData}
            onChange={(e) => setMetaData(e.target.value)}
            placeholder="Blog MetaData"
            className="text-sm md:text-base w-full h-[30px] md:h-[40px] px-2 py-0 border-gray-300 placeholder-gray-500 outline-none rounded-md mb-2"
          />
          <div className="mb-2 w-full">
            <label
              htmlFor="image"
              className="w-full inline-block p-2 border border-gray-300 relative cursor-pointer text-gray-500 hover:text-blue-700 rounded-md"
            >
              <span>{imageName ? imageName : "Upload New Blog Image"}</span>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="hidden text-sm md:text-base w-full h-[30px] md:h-[40px] px-2 py-0 border-gray-300 outline-none rounded-md"
              />
            </label>
          </div>
          <SunEditor
            ref={editorRef}
            setContents={content}
            onChange={setContent}
            placeholder="Blog Content"
            className="text-black"
            setOptions={{
              width: "100px",
              height: "1000px", // Use px unit for height
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
                ["font", "fontSize", "formatBlock", "align", "list", "table"],
                ["fontColor", "hiliteColor", "horizontalRule"],
              ],
              font: ["Arial", "Courier New"], // Example: specify fonts
              fontColor: "red", // Set font color
              backgroundColor: "red", // Set background color
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleBlogUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this blog?</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
