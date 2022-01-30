import React, { useEffect, useState } from "react";
import "./StoryComponent.scss";
import Hacker from "./assets/WhiteHatHacker.heropng.png";
import useWindowSize from "./utils/UseWindowDimensions";

const StoryComponent = ({ story }) => {
  const [authorScore, setAuthorScore] = useState("...");
  const { width } = useWindowSize();

  const calculateTimeStamp = (timeStamp) => {
    let milliseconds = timeStamp * 1000;
    let dateObject = new Date(milliseconds);
    return dateObject.toLocaleString("en-GB");
  };

  useEffect(() => {
    fetch(
      "https://hacker-news.firebaseio.com/v0/user/" +
        story?.by +
        ".json?print=pretty"
    )
      .then((response) => response.json())
      .then((data) => setAuthorScore(data.karma))
        .catch((e) => window.alert("Author Score for " + story?.by + " could not be fetched right now. ERROR: " + e));
  }, [story?.by]);

  return (
    <div
      className={width > 600 ? "story-container" : "story-container-mobile"}
      onClick={() => window.open(story?.url)}
    >
      <div className={"container"}>
        <img src={Hacker} alt={"HackerImage"} className={"story-image"} />
        <h3 className={"score-overlay"}>{"STORY SCORE: " + story?.score}</h3>
      </div>
      <br />
      <div className={"story-text"}>
        <a href={story?.url} target={"_blank"} rel="noreferrer" className={"StoryLink"}>
          {story?.url}
        </a>
        <p className={"date-text"}>{calculateTimeStamp(story?.time)}</p>
        <h1>{story?.title}</h1>
        <p className={"author-text"}>
          Written By:&nbsp;<b>{story?.by}</b>
        </p>
        <p>
          Author Score:&nbsp;<b>{authorScore}</b>
        </p>
        {width < 600 ? <hr /> : null}
      </div>
    </div>
  );
};

export default StoryComponent;
