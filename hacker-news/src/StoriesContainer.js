import React, { useEffect, useState } from "react";
import StoryComponent from "./StoryComponent";
import "./StoriesContainer.scss";

const numberOfStories = [
  30076389, 30074949, 30074414, 30077271, 30070425, 30077380, 30077948,
  30073186, 30070378, 30077065,
];

const StoriesContainer = () => {
  const [stories, setStories] = useState([]);

  /* useEffect(() => {
         if (stories.length === 0) {
           fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
             .then((r) => console.log(r.status))
             .then((data) => setStories((stories) => [...stories, data.json()]));
         } else console.log(stories);
       }, [stories]);*/

  return (
    <div className={"StoriesContainer"}>
      {numberOfStories.map((story, index) => (
        <StoryComponent storyID={story} key={index} />
      ))}
    </div>
  );
};

export default StoriesContainer;
