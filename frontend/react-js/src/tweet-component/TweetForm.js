import React, { useState } from 'react';
import './TweetForm.css'; // CSSファイルをインポート

function TweetForm({ onTweetSubmit }) {
  const [tweetText, setTweetText] = useState('');

  const handleInputChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onTweetSubmit(tweetText);
    setTweetText('');
  };

  return (
    <div className="tweet-form">
      <h2>ツイートを投稿する</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={tweetText}
          onChange={handleInputChange}
          placeholder="ツイート内容を入力してください"
        />
        <br />
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
}

export default TweetForm;