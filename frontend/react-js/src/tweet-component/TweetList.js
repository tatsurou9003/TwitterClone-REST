import React from 'react';
import './TweetList.css'; // CSSファイルをインポート

function TweetList({ tweets }) {
  return (
    <div>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default TweetList;