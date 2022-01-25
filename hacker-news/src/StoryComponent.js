import React, { useEffect, useState } from "react";
import "./StoryComponent.scss";
import Hacker from "./assets/WhiteHatHacker.heropng.png";

const StoryComponent = ({ storyID }) => {
  const [story, setStory] = useState(null);

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
      <p>{story?.url}</p>
      <p>Story Timestamp</p>
      <h1>Story Title - Story Score</h1>
      <p>Author ID - Author Score</p>
    </div>
  );
};

export default StoryComponent;
