"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const complaintCategories = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing Problem" },
  { value: "service", label: "Service Complaint" },
  { value: "feedback", label: "General Feedback" },
  { value: "other", label: "Other" },
];

export default function SendComplaint() {
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the complaint data to your backend
    console.log("Submitting complaint:", { category, subject, description });
    setIsSubmitted(true);
    // Reset form after submission
    setCategory("");
    setSubject("");
    setDescription("");
    // Reset submission status after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen flex items-start justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden ">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger
                    id="category"
                    className="w-full rounded-md border border-dark-500 bg-dark-400 text-gray-100 "
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md border border-dark-500 bg-dark-400">
                    {complaintCategories.map((cat) => (
                      <SelectItem
                        key={cat.value}
                        value={cat.value}
                        className="text-gray-100 focus:bg-black"
                      >
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full rounded-md border border-dark-500 bg-dark-400 text-gray-100  "
                  placeholder="Brief subject of your complaint"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full h-32 rounded-md border border-dark-500 bg-dark-400 text-gray-100 "
                  placeholder="Provide details about your complaint"
                />
              </div>
              <Button
                type="submit"
                className="w-full text-black font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit Complaint
              </Button>
            </form>
          </div>
        </div>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 p-4 bg-green-300 text-white rounded-lg shadow-lg flex items-center justify-center"
          >
            <CheckCircle2 className="mr-2" />
            <span>Your complaint has been submitted successfully!</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
