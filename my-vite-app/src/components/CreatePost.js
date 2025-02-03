import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getIsActive, getRefresh } from "../redux/tweetSlice";
// import img from "./";
// import img from "../Images/8HSTqIlD_400x400";

function CreatePost() {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const disptach = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user._id },
        {
          withCredentials: true,
        }
      );
      disptach(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");
  };

  const forYouHandler = () => {
    disptach(getIsActive(true));
  };

  const followingHandler = () => {
    disptach(getIsActive(false));
  };

  return (
    <div className="w-[100%] ">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200 ">
          <div
            onClick={forYouHandler}
            className={`${
              isActive ? "border-b-4 border-blue-600 " : ""
            }cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg ">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive ? "border-b-4 border-blue-600 " : ""
            }cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>

        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                className="rounded-full"
                src="https://pbs.twimg.com/profile_images/1874558173962481664/8HSTqIlD_400x400.jpg"
                twitterHandle="sitebase"
                size="40"
              />
            </div>
            <input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full outline-none border-none text-xl ml-2"
              type="text"
              placeholder="What is happening?"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex ">
              <div>
                <FaImages size="24px" />
              </div>
              <div className="ml-4">
                <MdOutlineEmojiEmotions size="24px" />
              </div>
              <div className="ml-4">
                <IoLocationOutline size="24px" />
              </div>
              <div className="ml-4">
                <MdOutlineGifBox size="24px" />
              </div>
            </div>
            <button
              onClick={submitHandler}
              className="bg-[#1D9BF0] rounded-full border-none px-4 py-1 text-lg text-white text-right"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

// {`${
//               isActive
//                 ? "border-b-4 border-blue-600"
//                 : " border-b-4 border-transparent"
//             }}
