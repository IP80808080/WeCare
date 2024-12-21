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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, CheckCircle, XCircle, Phone, Mail } from "lucide-react";
import Image from "next/image";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  documentUrl: string;
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. John Doe",
    specialty: "Cardiology",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    documentUrl: "/assets/icons/placeholder.png?height=600&width=400",
  },
  {
    id: 2,
    name: "Dr. Sarah Smith",
    specialty: "Pediatrics",
    phone: "+1 (555) 987-6543",
    email: "sarah.smith@example.com",
    documentUrl: "/assets/icons/placeholder.png?height=600&width=400",
  },
  {
    id: 3,
    name: "Dr. Michael Johnson",
    specialty: "Dermatology",
    phone: "+1 (555) 456-7890",
    email: "michael.johnson@example.com",
    documentUrl: "/assets/icons/placeholder.png?height=600&width=400",
  },
  {
    id: 4,
    name: "Dr. Emily Brown",
    specialty: "Neurology",
    phone: "+1 (555) 234-5678",
    email: "emily.brown@example.com",
    documentUrl: "/assets/icons/placeholder.png?height=600&width=400",
  },
  {
    id: 5,
    name: "Dr. David Wilson",
    specialty: "Orthopedics",
    phone: "+1 (555) 876-5432",
    email: "david.wilson@example.com",
    documentUrl: "/assets/icons/placeholder.png?height=600&width=400",
  },
];

export default function Component() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleApprove = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  const handleReject = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  return (
    <div className="w-full bg-white text-black rounded-lg shadow-xl pt-3 overflow-hidden border border-[#0FA3B1]">
      <h1 className="text-3xl text-gray-700 font-bold mb-6 text-center">
        Pending Approvals
      </h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#0FA3B1]">
              <TableHead className="text-white font-bold">Doctor</TableHead>
              <TableHead className="text-white font-bold">Specialty</TableHead>
              <TableHead className="text-white font-bold">Contact</TableHead>
              <TableHead className="text-white font-bold">Document</TableHead>
              <TableHead className="text-white font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow
                key={doctor.id}
                className="border-b border-[#0FA3B1] hover:bg-[#B5E2FA] transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <span>{doctor.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-gray-700 text-gray-100"
                  >
                    {doctor.specialty}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {doctor.phone}
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {doctor.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-white bg-gray-700 border-gray-600 hover:bg-gray-700"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black border-gray-700">
                      <DialogHeader>
                        <DialogTitle>Doctor Document</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <Image
                          src={
                            selectedDoctor?.documentUrl ??
                            "/assets/icons/placeholder.png"
                          }
                          alt="Doctor Document"
                          className="w-full h-auto rounded-lg border border-gray-600"
                          height={1200}
                          width={1200}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-green-300 hover:bg-green-800 text-white"
                      onClick={() => handleApprove(doctor.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-300 hover:bg-red-800 text-white"
                      onClick={() => handleReject(doctor.id)}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
