import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";
import { useSelector } from "react-redux";

function Feed() {
  const {tweet} =  useSelector(store=>store.tweet)
  return (
    <div className="w-[50%] border border-gray-300">
      <div>
        <CreatePost />
       {
        tweet?.map((tweet) =><Tweet key={tweet?._id} tweet={tweet}/>)
       }
        
        
      </div>
    </div>
  );
}

export default Feed;
