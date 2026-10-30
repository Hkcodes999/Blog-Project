import React, { useEffect, useState } from "react";
import service, { Service } from "../../appwrite/confg";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Postcard = ({ post, height = "500px", sizeMove = false }) => {
  const [postData] = useState(post);
  const [imageData, setimageData] = useState(null);
  const [postimage, setPostimage] = useState(null);


  // loading = true while either image hasn't resolved yet
  const loading = !postData;

  console.log(post.userAvatar)

  useEffect(() => {
    const fetchimages = async () => {
      try {
        const profile = await service.getFilePreview(post.userAvatar)
        console.log(profile)
        setimageData(profile);
      } catch (error) {
        console.log(error);
      }
    };

    const postImages = async () => {
      try {
        const images = await service.getFilePreview(postData.image);
        setPostimage(images);
      } catch (error) {
        console.log(error);
      }
    };

    postImages();
    fetchimages();
  }, []);


  return (
    // SkeletonTheme sets the color of all <Skeleton /> inside it
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div
        style={{ height }}
        className="group w-full max-w-[430px] rounded-lg flex flex-col border border-gray-200 transition-[background-color,border-color] duration-300 hover:border-orange-300 shrink-0 overflow-hidden select-none"
      >
        <Link to={`/post/${postData.$id}`} className="h-full w-full block">
          <div className="flex flex-col h-full w-full group">
            {/* Thumbnail — skeleton takes exact same height as real image */}
            <div
              className={`h-[60%] ${sizeMove ? "group-hover:h-[45%]" : ""} w-full overflow-hidden bg-gray-100 transition-[opacity, height] duration-500 ease-in-out`}
              style={{ opacity: loading ? 0.5 : 1 }}
            >
              {loading ? (
                <Skeleton height="100%" />
              ) : (
                <img
                  src={postimage}
                  alt={`${postData?.title} img`}
                  draggable="false"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out select-none pointer-events-none"
                />
              )}
            </div>

            {/* Content area — fades in when real data loads */}
            <div
              className={` ${sizeMove ? "group-hover:h-[55%] h-[55%]" : "h-[45%]"} flex flex-col justify-center w-full transition-[height] duration-500`}
            >
              <div
                className="flex flex-col gap-3 px-6 py-4 transition-[opacity] duration-500 ease-in-out w-full "
                style={{ opacity: loading ? 0.4 : 1 }}
              >
                {/* Author row */}
                <div className="flex items-center gap-2 justify-between ">
                  <div className="flex items-center justify-center gap-3">
                    {loading ? (
                      <Skeleton circle width={40} height={40} />
                    ) : (
                      <img
                        className="h-10 w-10 rounded-full object-cover select-none pointer-events-none"
                        src={imageData}
                        alt="Profile img"
                        draggable="false"
                      />
                    )}
                    <h3>
                      {loading ? <Skeleton width={80} /> : postData?.userName}
                    </h3>
                  </div>
                  {loading ? (
                    <Skeleton width={80} />
                  ) : (
                    <p className="text-black/60">2 min read</p>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl capitalize font-bold line-clamp-2">
                  {loading ? <Skeleton width="80%" /> : postData?.title}
                </h2>

                {/* Content preview */}
                <p className="line-clamp-3 text-base text-gray-600 truncate w-full">
                  {loading ? (
                    <Skeleton count={3} />
                  ) : (
                    post?.content && parse(post.content)
                  )}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </SkeletonTheme>
  );
};

export default Postcard;
