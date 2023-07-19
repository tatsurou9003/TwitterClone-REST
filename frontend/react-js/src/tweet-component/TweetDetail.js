import React from 'react';
import './TweetDetail.css'; // CSSファイルをインポート

function TweetDetail({ tweet }) {
  return (
    <div className="tweet-detail">
      <h2>ツイート詳細</h2>
      <p>{tweet}</p>
    </div>
  );
}

export default TweetDetail;