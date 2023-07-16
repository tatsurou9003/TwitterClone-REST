import React from 'react';
import "./TweetList.css";

const TweetList = ({ tweets }) => {
  return (
    <div className="tweet-list">
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <p>{tweet.content}</p>
          <p>{tweet.author}</p>
          <img src={tweet.img} alt="Tweet Image" style={{ maxWidth: '300px' }} />
        </div>
      ))}
    </div>
  );
};

export default TweetList;