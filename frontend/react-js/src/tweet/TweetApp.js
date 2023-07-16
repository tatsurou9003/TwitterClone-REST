import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TweetForm from './TweetForm';
import TweetList from './TweetList';

const TweetApp = () => {
  // ツイート一覧のステートを定義
  const [tweets, setTweets] = useState([]);

  // アクセストークンをLocalStorageから取得する
  const storedAccessToken = localStorage.getItem('access_token');
  const accessToken = storedAccessToken
    ? JSON.parse(storedAccessToken)
    : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NDk3OTkyLCJpYXQiOjE2ODk0OTc2OTIsImp0aSI6IjhhN2JiYTViMGFhMzQzZDNiMWYxNzVmY2Q1NTczZmIyIiwidXNlcl9pZCI6NH0.GkWeN29OW5xD7KZsKJ7pLP9JZLL8k75ZthWMoiKqxYA";

  // マウント時にツイート一覧を取得する
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        // ツイート一覧を取得するAPIのエンドポイントを指定
        const API_URL = '/posts/post/';
        // APIにアクセストークンを含めてリクエスト
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // レスポンスから取得したツイート一覧をステートにセット
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, [accessToken]); // accessTokenが変更されるたびに再度実行

  // 新しいツイートを作成するハンドラー関数
  const handleCreateTweet = async (content) => {
    try {
      // ツイートを作成するAPIのエンドポイントを指定
      const API_URL = '/posts/post/';
      // APIにアクセストークンとツイート内容を含めてリクエスト
      const response = await axios.post(
        API_URL,
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // 成功したら新しいツイートを追加して表示を更新
      setTweets([...tweets, response.data]);
    } catch (error) {
      console.error('Error creating tweet:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* TweetFormコンポーネントにhandleCreateTweetを渡す */}
      <TweetForm handleCreateTweet={handleCreateTweet} />
      {/* TweetListコンポーネントに取得したツイート一覧を渡す */}
      <TweetList tweets={tweets} />
    </div>
  );
};

export default TweetApp;