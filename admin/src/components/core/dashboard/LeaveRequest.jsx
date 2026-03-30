import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
// import { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";
// import { addDays } from "date-fns";
import { useState } from "react";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowUpRightIcon } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  leaveStart,
  leaveSuccess,
  leaveFailure,
} from "../../../redux/slices/leavesSlice.js";

const LeaveRequest = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.leave);

  const [formData, setFormData] = useState({
    leaveSubject: "",
    leaveReasons: "",
    leaveType: "Casual",
  });
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select leave dates");
      return;
    }

    dispatch(leaveStart());

    dispatch(leaveStart());

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:9000/api/v1/leaves/leave-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            fromDate: dateRange.from,
            toDate: dateRange.to,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      dispatch(leaveSuccess(data.data));

      setFormData({
        leaveSubject: "",
        leaveReasons: "",
      });
      setDateRange({
        from: undefined,
        to: undefined,
      });
    } catch (err) {
      dispatch(leaveFailure(err.message));
    }
  };
  return (
    <div className="flex">
      <div className="flex flex-col w-[55%] gap-2 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <Label htmlFor="complainSuggestion" className={"text-xl"}>
            Drop Your Leave Request Mail
          </Label>
        </div>
        <div className="px-4 lg:px-6">
          <Input
            className={"mb-3"}
            placeholder="To : operation@abcdesigns.in"
            readOnly
          />
          <Input
            className={"mb-3"}
            placeholder="CC : info@abcdesigns.in , zakir@abcdesigns.in"
            readOnly
          />
        </div>
        <div className="px-4 lg:px-6">
          <Label htmlFor="complainSuggestion" className={"mb-4 text-gray-600"}>
            Subject for leave request
          </Label>
          <Input
            name="leaveSubject"
            value={formData.leaveSubject}
            onChange={handleChange}
          />
        </div>
        <div className="px-4 lg:px-6">
          <Label htmlFor="complainSuggestion" className={"mb-4 text-gray-600"}>
            Specific Reasons for leave Request
          </Label>
          <Textarea
            className={"h-[30vh]"}
            name="leaveReasons"
            value={formData.leaveReasons}
            onChange={handleChange}
          />
        </div>
        <div className="px-4 lg:px-6 w-full">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Post"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-[45%] gap-4 py-4 md:gap-6 md:py-6 h-[90vh] overflow-y-auto no-scrollbar">
        <div className="px-4 lg:px-6">
          <div className="px-4 lg:px-6 w-full">
            <Label className="mb-4 text-gray-600">Leave Type</Label>
            <Select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className={"w-full mb-2"}
            >
              <SelectTrigger className="w-full mb-5">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Sick">Sick</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Card className="mx-auto  p-0">
            <CardContent className="p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
              />
            </CardContent>
          </Card>
          <p className="text-center text-sm text-gray-500 mt-2">
            {dateRange?.from && dateRange?.to
              ? `${dateRange.from.toDateString()} → ${dateRange.to.toDateString()}`
              : "Please select date range"}
          </p>
        </div>

        <div className="px-4 lg:px-6 flex flex-col">
          <div className="flex justify-evenly">
            <Badge className={"px-15 py-2"} variant="secondary">
              Total Leaves Pending : 0
            </Badge>
            <Badge className={"px-15 py-2"} variant="destructive">
              Total Leaves Taken : 0
            </Badge>
          </div>
        </div>
        <div className="px-4 lg:px-6 flex flex-col">
          <p className="text-start text-md capitalize">
            You Can generate your Leave Request Mail Using room.ai
          </p>
        </div>
        <div className="px-4 lg:px-6 flex flex-col">
          {/* <Button variant="outline" className={"cursor-pointer"}>
           
          </Button> */}
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button variant="outline">
                {" "}
                Open Room <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>ROOM AI</DrawerTitle>
                <DrawerDescription>
                  Personalize AI Tool For Content Generation.
                </DrawerDescription>
              </DrawerHeader>
              <div className="no-scrollbar overflow-y-auto px-4 flex justify-center items-center h-screen">
                {/* {Array.from({ length: 10 }).map((_, index) => (
                  <p
                    key={index}
                    className="mb-4 leading-normal style-lyra:mb-2 style-lyra:leading-relaxed"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                ))} */}
                <p className="text-center text-xl capitalize">
                  Room.ai is waiting for your first message?
                </p>
              </div>
              <DrawerFooter>
                <Input placeholder={"Generate your message"} />
                <Button>Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
