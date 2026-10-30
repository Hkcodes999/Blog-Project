import React from 'react';
import PostForm from '../components/post/postForm';
import Authcontainer from '../components/auth/authcontainer'
const Addpostpage = () => {
    return (
      <div className="h-fit w-full flex items-center justify-center ">
        <Authcontainer
          button="true"
          ButtonMessage="Go to login"
          message="Login to create posts"
        >
          {" "}
          <PostForm />{" "}
        </Authcontainer>
      </div>
    );
}

export default Addpostpage;
