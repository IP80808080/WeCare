"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    gender: "Other",
    phone: "123-456-7890",
    email: "john@example.com",
    role: "patient",
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    phone: "098-765-4321",
    email: "jane@example.com",
    role: "doctor",
  },
  {
    id: 3,
    name: "Kamlesh Kasambe",
    gender: "Male",
    phone: "555-555-5555",
    email: "kasambe.kamlesh1@gmail.com",
    role: "admin",
  },
];

type Props = {};

const UpdateUI = (props: Props) => {
  const [users, setUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    // Here you would typically make an API call to update the user data
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    // Here you would typically make an API call to delete the user
  };

  const handleResetPassword = (id: number) => {
    // Here you would typically make an API call to reset the user's password
    alert(`Password reset requested for user with ID: ${id}`);
  };

  return (
    <div className="w-full bg-white text-black rounded-lg shadow-xl  overflow-hidden border border-[#0FA3B1]">
      <div>
        <div className="rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#0FA3B1]">
                <TableHead className="text-white font-bold">Name</TableHead>
                <TableHead className="text-white font-bold">Gender</TableHead>
                <TableHead className="text-white font-bold">Contact</TableHead>
                <TableHead className="text-white font-bold">Role</TableHead>
                <TableHead className="text-white font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b  border-[#0FA3B1] hover:bg-[#B5E2FA]"
                >
                  <TableCell>
                    {editingId === user.id ? (
                      <Input
                        defaultValue={user.name}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    ) : (
                      <span className="text-black">{user.name}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <Select defaultValue={user.gender}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-black">{user.gender}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <div className="space-y-2">
                        <Input
                          defaultValue={user.phone}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Phone"
                        />
                        <Input
                          defaultValue={user.email}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="Email"
                        />
                      </div>
                    ) : (
                      <div className="text-black">
                        <div>{user.phone}</div>
                        <div>{user.email}</div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === user.id ? (
                      <Select defaultValue={user.role}>
                        <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-black capitalize">{user.role}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {editingId === user.id ? (
                        <Button
                          onClick={() => handleSave(user.id)}
                          size="sm"
                          className="bg-green-300 hover:bg-green-700 text-white"
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleEdit(user.id)}
                          size="sm"
                          className="hover:bg-gray-700"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(user.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleResetPassword(user.id)}
                        size="sm"
                        className="text-black bg-yellow-400 hover:bg-yellow-500"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UpdateUI;
