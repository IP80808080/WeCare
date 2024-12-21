"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  Clock,
  User,
  FileText,
  X,
  RefreshCw,
  Ellipsis,
} from "lucide-react";
import Image from "next/image";

export default function AppointmentBooking() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [rescheduleIndex, setRescheduleIndex] = useState<number | null>(null);

  const handleBookAppointment = () => {
    const newAppointment = {
      date,
      time,
      doctor,
      reason,
      specialty,
      remarks,
      status: "pending",
    };
    if (rescheduleIndex !== null) {
      const updatedAppointments = [...appointments];
      updatedAppointments[rescheduleIndex] = newAppointment;
      setAppointments(updatedAppointments);
      setRescheduleIndex(null);
    } else {
      setAppointments([...appointments, newAppointment]);
    }
    resetForm();
  };

  const resetForm = () => {
    setDate(new Date());
    setTime("");
    setDoctor("");
    setReason("");
    setSpecialty("");
    setRemarks("");
  };

  const handleCancelAppointment = (index: number) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const handleRescheduleAppointment = (index: number) => {
    const appointment = appointments[index];
    setDate(appointment.date);
    setTime(appointment.time);
    setDoctor(appointment.doctor);
    setReason(appointment.reason);
    setSpecialty(appointment.specialty);
    setRemarks(appointment.remarks);
    setRescheduleIndex(index);
  };

  return (
    <div className="min-h-screen  text-white p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="bg-gray-800 mb-8">
          <CardHeader>
            <CardTitle>
              {rescheduleIndex !== null
                ? "Reschedule Appointment"
                : "Book Your Appointment"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {rescheduleIndex !== null
                ? "Update your appointment details"
                : "Select your preferences and schedule a virtual visit"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 ">
              <div className="space-y-2">
                <Label htmlFor="doctor">Select Doctor</Label>
                <Select value={doctor} onValueChange={setDoctor}>
                  <SelectTrigger
                    id="doctor"
                    className="rounded-md border border-dark-500 bg-dark-400"
                  >
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                    <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                    <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger
                    id="reason"
                    className="rounded-md border border-dark-500 bg-dark-400"
                  >
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Check-up">General Checkup</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                    <SelectItem value="Prescription">
                      Prescription Renewal
                    </SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialty">Doctor Specialty</Label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger
                    id="specialty"
                    className="rounded-md border border-dark-500 bg-dark-400"
                  >
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GP">General Practitioner</SelectItem>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger
                    id="time"
                    className="rounded-md border border-dark-500 bg-dark-400"
                  >
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Select Date</Label>
              <div className="flex justify-center items-center rounded-md border border-dark-500 bg-dark-400">
                <Image
                  src="/assets/icons/calendar.svg"
                  height={24}
                  width={24}
                  alt="calendar"
                  className="ml-2"
                />
                <DatePicker
                  selected={null}
                  dateFormat="dd/MM/yyyy"
                  showTimeSelect={false}
                  wrapperClassName="cdate-picker w-full"
                  className="rounded p-2 w-full"
                  placeholderText="Select a date"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Any additional information for the doctor"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="h-24 rounded-md border border-dark-500 bg-dark-400"
              />
            </div>
            <Button className="w-full" onClick={handleBookAppointment}>
              {rescheduleIndex !== null
                ? "Update Appointment"
                : "Book Appointment"}
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4 text-black">
          Your Appointments
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {appointments.map((appointment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card
                  className={`bg-gradient-to-br ${
                    index % 3 === 0
                      ? "from-pink-500 to-orange-400"
                      : index % 3 === 1
                      ? "from-green-400 to-blue-500"
                      : "from-purple-500 to-indigo-500"
                  } border-none`}
                >
                  <CardHeader>
                    <CardTitle className="text-white text-lg sm:text-xl">
                      Appointment with {appointment.doctor}
                    </CardTitle>
                    <CardDescription className="text-gray-100 text-sm sm:text-base">
                      {appointment.specialty} - {appointment.reason}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2 text-white text-sm sm:text-base">
                      <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{appointment.date.toDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white text-sm sm:text-base">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white text-sm sm:text-base">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="truncate">{appointment.remarks}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-1 sm:flex-row gap-2">
                    <Button
                      className={`w-full text-white sm:w-auto ${
                        appointment.status === "pending"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {" "}
                      <Ellipsis className="mr-2 h-4 w-4" />
                      {appointment.status === "pending" ? "Pending" : "Connect"}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full sm:w-auto">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reschedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Reschedule Appointment</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to reschedule this
                            appointment? This will update the booking form with
                            the current appointment details.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button
                            variant="outline"
                            onClick={() => handleRescheduleAppointment(index)}
                          >
                            Confirm Reschedule
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      className="w-full sm:w-auto"
                      onClick={() => handleCancelAppointment(index)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
