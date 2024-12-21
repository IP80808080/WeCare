"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const consultationData = [
  { month: "Jan", count: 65 },
  { month: "Feb", count: 59 },
  { month: "Mar", count: 80 },
  { month: "Apr", count: 81 },
  { month: "May", count: 56 },
  { month: "Jun", count: 55 },
];

const prescriptionData = [
  { name: "Antibiotics", value: 400 },
  { name: "Pain Relievers", value: 300 },
  { name: "Antidepressants", value: 200 },
  { name: "Antihypertensives", value: 278 },
  { name: "Antidiabetics", value: 189 },
];

const labTestData = [
  { month: "Jan", bloodTests: 45, urineTets: 24, imagingTests: 31 },
  { month: "Feb", bloodTests: 52, urineTets: 29, imagingTests: 33 },
  { month: "Mar", bloodTests: 49, urineTets: 27, imagingTests: 36 },
  { month: "Apr", bloodTests: 63, urineTets: 32, imagingTests: 40 },
  { month: "May", bloodTests: 59, urineTets: 30, imagingTests: 38 },
  { month: "Jun", bloodTests: 67, urineTets: 35, imagingTests: 43 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Analysis() {
  const [sortBy, setSortBy] = useState("count");

  const sortedConsultationData = [...consultationData].sort(
    (a, b) => b[sortBy] - a[sortBy]
  );
  const sortedPrescriptionData = [...prescriptionData].sort(
    (a, b) => b.value - a.value
  );

  return (
    <div className="min-h-screen">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-0.5 md:text-lg lg:text-lg text-xs bg-white text-black  rounded-xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="labTests">Lab Tests</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                  Consultations Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={consultationData}>
                    <defs>
                      <linearGradient
                        id="colorCount"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: "4px",
                      }}
                      labelStyle={{ color: "#000" }}
                      itemStyle={{ color: "#000" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorCount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                  Prescription Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={sortedPrescriptionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sortedPrescriptionData.map((entry, index) => (
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
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                  Lab Tests Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={labTestData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: "4px",
                      }}
                      labelStyle={{ color: "#000" }}
                      itemStyle={{ color: "#000" }}
                    />
                    <Bar dataKey="bloodTests" stackId="a" fill="#8884d8" />
                    <Bar dataKey="urineTets" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="imagingTests" stackId="a" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="consultations">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                Consultations Analysis
              </CardTitle>
              <Select onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[180px] bg-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="count">Count</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent style={{ height: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedConsultationData}>
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#8884d8"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="url(#colorGradient)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="prescriptions">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                Prescription Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={sortedPrescriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {sortedPrescriptionData.map((entry, index) => (
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
        </TabsContent>
        <TabsContent value="labTests">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
                Lab Tests Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={labTestData}>
                  <defs>
                    <linearGradient
                      id="colorBloodTests"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorUrineTests"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorImagingTests"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="bloodTests"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorBloodTests)"
                  />
                  <Area
                    type="monotone"
                    dataKey="urineTets"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorUrineTests)"
                  />
                  <Area
                    type="monotone"
                    dataKey="imagingTests"
                    stroke="#ffc658"
                    fillOpacity={1}
                    fill="url(#colorImagingTests)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
