import React, { useEffect, useState } from "react";
import Errorcontainer from "../components/common/errorcontainer";
import PostForm from "../components/post/postForm";
import service from "../appwrite/confg";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const authstatus = useSelector((state) => state.auth.status);

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

  return (
    <Errorcontainer
      unauthorized={!authstatus}
      message="Login to edit posts"
      ButtonMessage="Go to login"
    >
      <div className="min-h-screen flex justify-center items-center ">
        {post ? <PostForm post={post} /> : null}
      </div>
    </Errorcontainer>
  );
};

export default EditPost;
