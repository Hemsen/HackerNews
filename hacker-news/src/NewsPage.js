import React, { useEffect, useState } from "react";
import StoryComponent from "./StoryComponent";
import "./NewsPage.scss";

const NewsPage = () => {
  const [allStories, setAllStories] = useState([]);
  const [tenRandomStoryID, setTenRandomStoryID] = useState([]);
  const [tenStories, setTenStories] = useState([]);

  useEffect(() => {
    if (allStories.length === 0) {
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then((response) => response.json())
        .then((data) => setAllStories((stories) => [...stories, data]));
    } else if (allStories.length > 0) {
      setTenRandomStoryID(
        allStories[0].sort(() => Math.random() - Math.random()).slice(0, 10)
      );
    }
  }, [allStories]);

  useEffect(() => {
    if (tenStories.length !== 10) {
      tenRandomStoryID.forEach((storyID) =>
        fetch(
          "https://hacker-news.firebaseio.com/v0/item/" +
            storyID +
            ".json?print=pretty"
        )
          .then((response) => response.json())
          .then((data) =>
            setTenStories((tenSortedStories) => [...tenSortedStories, data])
          )
      );
    }
  }, [tenRandomStoryID]);

  return (
    <div className={"news-container"}>
      {tenStories
        ?.sort((a, b) => a.score - b.score)
        .map((story, index) => (
          <StoryComponent story={story} key={index} />
        ))}
    </div>
  );
};

export default NewsPage;
