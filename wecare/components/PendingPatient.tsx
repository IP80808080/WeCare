import React from "react";
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
import { Check, X } from "lucide-react";

interface Appointment {
  id: number;
  patientName: string;
  scheduleTime: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

type Props = {};

const PendingPatient = (props: Props) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: "John Doe",
      scheduleTime: "2023-10-20 14:30",
      reason: "Annual check-up",
      status: "pending",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      scheduleTime: "2023-10-21 10:00",
      reason: "Follow-up on recent lab results",
      status: "pending",
    },
    {
      id: 3,
      patientName: "Alice Johnson",
      scheduleTime: "2023-10-22 11:15",
      reason: "Chronic pain management",
      status: "pending",
    },
    {
      id: 4,
      patientName: "Bob Williams",
      scheduleTime: "2023-10-23 09:30",
      reason: "Vaccination",
      status: "pending",
    },
    {
      id: 5,
      patientName: "Carol Brown",
      scheduleTime: "2023-10-24 13:45",
      reason: "Prenatal check-up",
      status: "pending",
    },
  ]);

  const handleApprove = (id: number) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "approved" } : app
      )
    );
  };

  const handleReject = (id: number) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
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
              <TableHead className="text-white font-bold">
                Patient Name
              </TableHead>
              <TableHead className="text-white font-bold">
                Schedule Time
              </TableHead>
              <TableHead className="text-white font-bold">Reason</TableHead>
              <TableHead className="text-white font-bold">Status</TableHead>
              <TableHead className="text-white font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment.id}
                className="border-b border-[#0FA3B1] hover:bg-[#B5E2FA] transition-colors"
              >
                <TableCell className="font-medium">
                  {appointment.patientName}
                </TableCell>
                <TableCell>{appointment.scheduleTime}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>
                  <span
                    className={`
                    px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      appointment.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : appointment.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  `}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  {appointment.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleApprove(appointment.id)}
                        size="sm"
                        className="bg-green-300 text-white hover:bg-green-500"
                      >
                        <Check className="mr-1 h-4 w-4" /> Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(appointment.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <X className="mr-1 h-4 w-4" /> Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PendingPatient;
