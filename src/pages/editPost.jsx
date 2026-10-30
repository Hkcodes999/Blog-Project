import React, { useEffect, useState } from "react";
import Authcontainer from "../components/auth/authcontainer";
import PostForm from "../components/post/postForm";
import service from "../appwrite/confg";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const userPost = async () => {
      if (slug) {
        try {
          const data = await service.getPost(slug);
          if (data) {
            setPost(data);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.log(error);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    userPost();
  }, [slug, navigate]);

  console.log(post);

  return (
    <Authcontainer>
      <div className="min-h-screen flex justify-center items-center ">
        {post ? <PostForm post={post} /> : null}
      </div>
    </Authcontainer>
  );
};

export default EditPost;
