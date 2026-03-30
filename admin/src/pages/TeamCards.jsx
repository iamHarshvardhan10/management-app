import React from "react";
import {
  getUsersSuccess,
  userFailure,
  userStart,
} from "../redux/slices/userSlice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import profileImage from "../assets/bg-1.jpg";

const TeamCards = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(userStart());

      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:9000/api/v1/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // console.log(data);

        if (!res.ok) throw new Error(data.message);

        dispatch(getUsersSuccess(data.data));
      } catch (err) {
        dispatch(userFailure(err.message));
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className="">
      <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-4 lg:gap-x-6">
            {users.map((item) => (
              <div key={item._id} className="group relative mb-10">
                <img
                  alt={item?.profileDetails?.fullName || "User"}
                  src={item?.profilePic || `${profileImage}`}
                  className="w-full rounded-lg bg-white object-cover object-top group-hover:opacity-75 max-sm:h-30 sm:aspect-2/1 lg:aspect-square"
                />

                <h3 className="mt-3 text-sm text-gray-500">
                  <span className="absolute inset-0" />
                  {item?.profileDetails?.fullName || "No Name"}
                </h3>

                <p className="text-base font-semibold text-gray-900">
                  {item?.profileDetails?.designation || "No Designation"} |{" "}
                  {item?.profileDetails?.experience || "0 yrs"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCards;
