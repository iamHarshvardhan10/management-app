import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  suggestionStart,
  suggestionSuccess,
  getSuggestionsSuccess,
  suggestionFailure,
} from "../../../redux/slices/suggestionSlice.js";

import React from "react";

const Complaints = () => {
  const dispatch = useDispatch();
  const { suggestions, isLoading } = useSelector((state) => state.suggestions);

  const [formData, setFormData] = useState({
    subject: "",
    suggestions: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    dispatch(suggestionStart());

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:9000/api/v1/suggestion/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("suggestions", data);

      if (!res.ok) throw new Error(data.message);

      dispatch(suggestionSuccess(data.data));

      // clear form
      setFormData({ subject: "", suggestions: "" });
    } catch (err) {
      dispatch(suggestionFailure(err.message));
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      dispatch(suggestionStart());

      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:9000/api/v1/suggestion/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        dispatch(getSuggestionsSuccess(data.data));
      } catch (err) {
        dispatch(suggestionFailure(err.message));
      }
    };

    fetchSuggestions();
  }, []);
  return (
    <div className="flex">
      <div className="flex flex-col w-[60%] gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <Label htmlFor="complainSuggestion" className={"text-xl"}>
            Complaints and Suggestion Box
          </Label>
        </div>
        <div className="px-4 lg:px-6">
          <Input
            placeholder="Enter Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="px-4 lg:px-6">
          <Label htmlFor="complainSuggestion" className={"mb-4 text-gray-600"}>
            Add Your Suggestion or Post some complaints
          </Label>
          <Textarea
            className={"h-[50vh]"}
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
          />
        </div>
        <div className="px-4 lg:px-6 w-full">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-[40%] gap-4 py-4 md:gap-6 md:py-6 h-[90vh] overflow-y-auto no-scrollbar">
        <div className="px-4 lg:px-6">
          {suggestions?.map((item) => (
            <Card key={item._id} className="mb-2">
              <CardHeader className="flex justify-between">
                <CardTitle>
                  {item.userInfo?.name || item.userInfo?.email}
                </CardTitle>
                <CardTitle>
                  {new Date(item.createdAt).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{item.subject}</p>
                <p>{item.suggestions}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
