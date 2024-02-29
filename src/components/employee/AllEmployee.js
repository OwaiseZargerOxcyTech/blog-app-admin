"use client";
import React, { useState, useMemo, useEffect } from "react";
import CommonTable from "../common/CommonTable";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";

export default function AllEmployee() {
  const [employeeData, setEmployeeData] = useState([]);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [selectedId, setSelectedId] = useState();
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [access, setAccess] = useState("unblock");

  const columns = useMemo(
    () => [
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "username",
        header: "Username",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => {
          return (
            <div className="text-xs">
              <div className="flex items-center gap-4">
                <button
                  className="text-xs text-blue-500"
                  type="button"
                  onClick={() => handleEmployeeEdit(row)}
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
                <button
                  className="text-xs text-red-700 "
                  type="button"
                  onClick={() => handleEmployeDelete(row)}
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "access",
        header: "Access",
        size: 150,
        Cell: ({ row }) => {
          const [isBlocked, setIsBlocked] = useState(false);

          const toggleAccess = () => {
            setIsBlocked(!isBlocked);
            //perform actions here, such as API calls to update the state on the server
          };

          return (
            <div className="text-xs">
              <div className="flex items-center gap-4">
                <button
                  className={`px-3 py-1 text-xs text-white rounded focus:outline-none ${
                    isBlocked
                      ? "bg-green-500 hover:bg-green-600 focus:bg-green-600"
                      : "bg-red-500 hover:bg-red-800 focus:bg-red-800"
                  }`}
                  type="button"
                  onClick={toggleAccess}
                >
                  {isBlocked ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  const getAllEmployees = async () => {
    try {
      const response = await axios.get(
        "/api/get-all-employees?timestamp=${Date.now()}"
      );
      const data = response.data;
      setEmployeeData(data);
    } catch (error) {
      console.error("Error fetching all employees:", error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleEmployeeEdit = async (row) => {
    setSelectedId(row.original.id);
    setUsername(row.original.username);
    setEmail(row.original.email);
    setUpdateModalOpen(true);
  };

  const handleEmployeeUpdate = async (e) => {
    const body = {
      selectedId,
      email,
      username,
      password,
      access,
      action: "edit",
    };
    try {
      const response = await axios.put("/api/update-employee", body);
      alert("Employee updated successfully");
      setUpdateModalOpen(false);
      setPassword("");

      getAllEmployees();
    } catch (error) {
      console.error("Employee Update operation error", error);
    }
  };

  const handleEmployeDelete = (row) => {
    setSelectedId(row.original.id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete("/api/delete-employee", {
        data: { selectedId },
      });
      console.log(response.data.message);
      setDeleteConfirmationOpen(false);
      getAllEmployees();
    } catch (error) {
      console.error("Employee Delete operation error", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold">EMPLOYEE LIST</h2>
      <CommonTable columns={columns} data={employeeData} />
      <Dialog
        open={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Update Customer</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", px: 4 }}>
          <TextField
            sx={{ marginTop: 1 }}
            label="Employee Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{ marginTop: 3 }}
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ marginTop: 3 }}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpdateModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEmployeeUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete Customer</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this customer?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
