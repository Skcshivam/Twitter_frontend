import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import { getUser } from "../redux/userSlice";
//import { timeSince } from "../utils/constant";

function Tweet({ tweet }) {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };

  const bookMarkHandler = async (tweetId) => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/bookmark/${tweetId}`,
        { id: user?._id },
        { withCredentials: true }
      );

      // ✅ Update Redux state: Modify ONLY the bookmark list for THIS user
      const updatedBookmarks = user.bookMarks.includes(tweetId)
        ? user.bookMarks.filter((id) => id !== tweetId) // Remove
        : [...user.bookMarks, tweetId]; // Add

      dispatch(getUser({ ...user, bookMarks: updatedBookmarks }));

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4 ">
          <Avatar
            className="rounded-full"
            src="https://pbs.twimg.com/profile_images/1874558173962481664/8HSTqIlD_400x400.jpg"
            twitterHandle="sitebase"
            size="40"
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">{tweet?.userDetails[0].Name}</h1>
              <p className="text-gray-500 text-sm ml-1">{`@${tweet?.userDetails[0].Username} . 1m`}</p>
            </div>
            <div>
              <p>{tweet.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 cursor-pointer rounded-full">
                  <FaRegComment size="20px" />
                </div>
                <p>{user.bookMarks.length}</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 hover:bg-red-200 cursor-pointer rounded-full"
                >
                  <FaRegHeart size="20px" />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div
                onClick={() => bookMarkHandler(tweet?._id)}
                className="flex items-center"
              >
                <div className="p-2 hover:bg-yellow-200 cursor-pointer rounded-full">
                  <FaRegBookmark size="20px" />
                </div>
                <p>{user?.bookMarks?.length || 0}</p>
              </div>

              {user?._id === tweet?.userID && (
                <div className="flex items-center">
                  <div
                    onClick={() => deleteTweetHandler(tweet?._id)}
                    className="p-2 hover:bg-red-600 cursor-pointer rounded-full"
                  >
                    <AiTwotoneDelete size="20px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
