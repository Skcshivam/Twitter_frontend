import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

function RightSidebar({ otherUsers }) {
  return (
    <div className="w-[25%] ">
      <div className="flex p-2 text-gray bg-gray-100 rounded-full items-center outline-none">
        <IoSearchSharp size="24px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-xl my-4">
        <h1 className="font-bold text-lg">Who to Follow</h1>
        {otherUsers?.map((user) => {
          return (
            <div
              key={user._id}
              className="flex items-center justify-between my-3"
            >
              <div className="flex">
                <div>
                  <Avatar
                    className="rounded-full"
                    src="https://pbs.twimg.com/profile_images/1874558173962481664/8HSTqIlD_400x400.jpg"
                    twitterHandle="sitebase"
                    size="40"
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user.Name}</h1>
                  <p className="text-sm">{`@${user?.Username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user._id}`}>
                  <button className="px-4 py-1 bg-black text-white font-semibold rounded-full">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RightSidebar;
