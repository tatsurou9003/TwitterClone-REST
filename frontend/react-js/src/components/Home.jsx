import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";
import axios from "axios";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/posts/post/", {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
        console.log(response.data); // APIから取得したデータをログに表示
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        navigate("/login");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Tweet_List</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.userPost}</p>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
};
