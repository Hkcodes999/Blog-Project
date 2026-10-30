import React from 'react';
import PostForm from '../components/post/postForm';
import Errorcontainer from '../components/common/errorcontainer';
import { useSelector } from 'react-redux';

const Addpostpage = () => {
  const authstatus = useSelector((state) => state.auth.status);

  return (
    <div className="h-fit w-full flex items-center justify-center ">
      <Errorcontainer
        unauthorized={!authstatus}
        button={true}
        ButtonMessage="Go to login"
        message="Login to create posts"
      >
        <PostForm />
      </Errorcontainer>
    </div>
  );
};

export default Addpostpage;
