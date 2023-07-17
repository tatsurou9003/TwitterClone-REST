import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TweetForm from './tweet-component/TweetForm';
import TweetList from './tweet-component/TweetList';
import TweetDetail from './tweet-component/TweetDetail';
import './App.css';

function App() {
  const [tweets, setTweets] = useState([]);
  const [selectedTweet, setSelectedTweet] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await fetchAccessToken();
      fetchTweets();
    };

    fetchData();
  }, []);

  const fetchTweets = async () => {
    try {
      // DRFのAPIエンドポイント、JWTトークンを指定、ツイート一覧を取得
      const API_URL = '/posts/post/';
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });
      setTweets(response.data);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    }
  };

  const fetchAccessToken = async () => {
    try {
      // JWTを取得するるURLを指定
      const TOKEN_URL = '/authen/jwt/create/';
      const response = await axios.post(TOKEN_URL, {
        email: 'user5@gmail.com',
        password: 'user5',
      });
      setAccessToken(response.data.access);
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  const handleTweetSubmit = async (tweetText) => {
    try {
      // DRFのAPIエンドポイントを指定、JWTトークンを指定、ツイートを作成
      const API_URL = '/posts/post/';
      const response = await axios.post(
        API_URL,
        { content: tweetText },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );
      setTweets([...tweets, response.data]);
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  const handleTweetClick = (tweet) => {
    // クリックされたツイートを選択
    setSelectedTweet(tweet);
  };


  return (
    <div className="app-container">
      <h1>TweetClone_REST</h1>
      <div className="app-content">
        <div className="right-column">
          <TweetList tweets={tweets} onTweetClick={handleTweetClick} />
        </div>
        <div className="left-column">
          <TweetForm onTweetSubmit={handleTweetSubmit} />
          <TweetDetail tweet={selectedTweet} />
        </div>
      </div>
    </div>
  );
}

export default App;