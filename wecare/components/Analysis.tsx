"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const userTypeData = [
  { name: "Doctors", value: 400 },
  { name: "Patients", value: 600 },
];

const userActivityData = [
  { name: "Jan", doctors: 60, patients: 200 },
  { name: "Feb", doctors: 70, patients: 250 },
  { name: "Mar", doctors: 80, patients: 300 },
  { name: "Apr", doctors: 90, patients: 350 },
  { name: "May", doctors: 100, patients: 400 },
  { name: "Jun", doctors: 110, patients: 450 },
];

const metricsData = [
  { name: "Consult", value: 1500 },
  { name: "Follow-ups", value: 600 },
  { name: "Referrals", value: 400 },
];

const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1"];

export default function Analysis() {
  const [sortBy, setSortBy] = useState("value");
  const [sortedMetricsData, setSortedMetricsData] = useState(metricsData);

  useEffect(() => {
    setSortedMetricsData(
      [...metricsData].sort((a, b) => b[sortBy] - a[sortBy])
    );
  }, [sortBy]);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-clip-text  text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                User Distribution
              </CardTitle>
              <CardDescription className="text-black">
                Breakdown of user types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="overflow-hidden bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                User Activity Over Time
              </CardTitle>
              <CardDescription className="text-black">
                Monthly active users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                  <Legend />
                  <defs>
                    <linearGradient
                      id="colorDoctors"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorPatients"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <Area
                    type="monotone"
                    dataKey="doctors"
                    stroke="#FF6B6B"
                    fillOpacity={1}
                    fill="url(#colorDoctors)"
                  />
                  <Area
                    type="monotone"
                    dataKey="patients"
                    stroke="#4ECDC4"
                    fillOpacity={1}
                    fill="url(#colorPatients)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 lg:col-span-1"
        >
          <Card className="overflow-hidden bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                Key Metrics
              </CardTitle>
              <CardDescription className="text-gray-300">
                <Select onValueChange={setSortBy} defaultValue={sortBy}>
                  <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="value">Sort by Value</SelectItem>
                    <SelectItem value="name">Sort by Name</SelectItem>
                  </SelectContent>
                </Select>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={sortedMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444 " />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    labelStyle={{ color: "#000" }}
                    itemStyle={{ color: "#000" }}
                  />
                  <Bar dataKey="value">
                    {sortedMetricsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
