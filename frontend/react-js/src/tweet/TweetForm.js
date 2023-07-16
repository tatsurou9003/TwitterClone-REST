import React, { useState } from 'react';


const TweetForm = ({ handleCreateTweet }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.trim() !== '') {
      handleCreateTweet(content);
      setContent('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="何か"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Tweet</button>
      </form>
    </div>
  );
};

export default TweetForm;