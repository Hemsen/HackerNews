import React, { useEffect, useState } from "react";
import StoryComponent from "./StoryComponent";
import "./StoriesContainer.scss";

const numberOfStories = [
  30076389, 30074949, 30074414, 30077271, 30070425, 30077380, 30077948,
  30073186, 30070378, 30077065,
];

const StoriesContainer = () => {
  const [allStories, setAllStories] = useState([]);
  const [tenSortedStories, setTenSortedStories] = useState([]);

  useEffect(() => {
    if (allStories.length === 0) {
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then((response) => response.json())
        .then((data) => setAllStories((stories) => [...stories, data]));
    }
  }, []);

  useEffect(() => {
    if (allStories.length > 0) {
      console.log(
        allStories.sort(function (a, b) {
          return a - b;
        })
      );
      setTenSortedStories(
        allStories.sort(function (a, b) {
          return a - b;
        })
      );
    }
  }, [allStories]);

  return (
    <div className={"StoriesContainer"}>
      {tenSortedStories?.map((story, index) => (
        <StoryComponent storyID={story} key={index} />
      ))}
    </div>
  );
};

export default StoriesContainer;
