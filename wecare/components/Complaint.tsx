"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Eye, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for initial complaints
const initialComplaints = [
  {
    id: 1,
    name: "John Doe",
    phone: "123-456-7890",
    email: "john@example.com",
    complaint: "The video call quality was poor during my last consultation.",
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "098-765-4321",
    email: "jane@example.com",
    complaint: "I was charged incorrectly for my last appointment.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    phone: "555-555-5555",
    email: "alex@example.com",
    complaint: "The doctor was 30 minutes late for our scheduled appointment.",
  },
];

export default function Complaint() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState<
    (typeof initialComplaints)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleView = (complaint: (typeof initialComplaints)[0]) => {
    setSelectedComplaint(complaint);
    setIsDialogOpen(true);
  };

  const handleDismiss = (id: number) => {
    setComplaints(complaints.filter((complaint) => complaint.id !== id));
  };

  return (
    <div className="w-full bg-white text-black rounded-lg shadow-xl overflow-hidden border border-[#0FA3B1]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#0FA3B1]">
                <TableHead className="text-white font-bold">Name</TableHead>
                <TableHead className="text-white font-bold">Contact</TableHead>
                <TableHead className="text-white font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow
                  key={complaint.id}
                  className="border-b text-black border-gray-700"
                >
                  <TableCell>
                    <span className="text-black">{complaint.name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-black">
                      <div>{complaint.phone}</div>
                      <div>{complaint.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => handleView(complaint)}
                        size="sm"
                        className="bg-black text-white border-gray-600 hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleDismiss(complaint.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Dismiss
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Complaint Details
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="mt-4 max-h-[60vh]">
            <DialogDescription className="text-black">
              <p>
                <strong>Name:</strong> {selectedComplaint?.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedComplaint?.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedComplaint?.email}
              </p>
              <p className="mt-4">
                <strong>Complaint:</strong>
              </p>
              <p className="mt-2 text-white">{selectedComplaint?.complaint}</p>
            </DialogDescription>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)} className="">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
