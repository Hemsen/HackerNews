import React, { useEffect, useState } from "react";
import "./StoryComponent.scss";
import Hacker from "./assets/WhiteHatHacker.heropng.png";

const StoryComponent = ({ storyID }) => {
  const [story, setStory] = useState(null);

  const calculateTimeStamp = (timeStamp) => {
    let milliseconds = timeStamp * 1000;
    let dateObject = new Date(milliseconds);
    return dateObject.toLocaleString("en-GB");
  };

  useEffect(() => {
    fetch(
      "https://hacker-news.firebaseio.com/v0/item/" +
        storyID +
        ".json?print=pretty"
    )
      .then((response) => response.json())
      .then((data) => setStory(data));
  }, [storyID]);

  return (
    <div className={"StoryContainer"}>
      <img src={Hacker} alt={"HackerImage"} className={"StoryImage"} />
      <a href={story?.url} target={"_blank"}>
        {story?.url}
      </a>
      <p>{calculateTimeStamp(story?.time)}</p>
      <h1>{story?.title + " - Story Score: " + story?.score}</h1>
      <p>{"Written By: " + story?.by}</p>
      <p>Author Score: </p>
    </div>
  );
};

export default StoryComponent;
