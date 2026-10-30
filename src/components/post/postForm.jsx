import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../common/input";
import RTE from "../RTE";
import Select from "../common/select";
import service from "../../appwrite/confg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../common/button";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        image: post?.image || "",
        status: post?.status || "Active",
        userId: post?.userId || "",
        content: post?.content || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        await service.deleteFile(post.image);
      }

      const dbpost = await service.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });

      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : undefined;

      if (file) {
        data.image = file.$id;

        const dbpost = await service.createPost({
          ...data,
          userId: userData.$id,
          userName: userData.name,
          userAvatar: userData.prefs.avatar
        });

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(0, 36)          // Appwrite documentId max 36 chars
        .replace(/-+$/, "");   // remove any trailing hyphens after slicing

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="h-fit w-[70vw] border-1 border-gray-400 p-8 rounded-xl gap-4 flex flex-col mt-10 mb-10">
      <div className="flex gap-5 border-b-1 border-gray-400/50 pb-5">
        <form
          className="flex gap-5 flex-col w-full"
          onSubmit={handleSubmit(submit)}
        >
          <div className="w-full flex items-end justify-end">
            <Button
              type="submit"
              children={`${post ? "Update Post" : "Upload Post "}`}
              className="bg-[#FF6F3A] hover:bg-[#E35D2B] px-6 py-2 rounded-lg cursor-pointer transition-all duration-300"
              textColor="text-white"
            />
          </div>
          <div className="flex gap-5 w-full">
            <Input
              label="Title"
              className="w-[100%] h-10 border-1 rounded-lg border-gray-400 p-3"
              placeholder="Add title"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              className="w-[100%] h-10 border-1 rounded-lg border-gray-400 p-3"
              placeholder="Title slug"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            <Input
              label="Image"
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-[#FF6F3A] file:text-white
            file:cursor-pointer hover:file:bg-[#e35d2b] file:transition-all file:duration-300"
              {...register("image", { required: !post })}
            />
            <Select
              label="Status"
              options={["Active", "Unactive"]}
              {...register("status", { required: true })}
            />
          </div>
          <div>
            <RTE
              name="content"
              control={control}
              label="Content"
              defaultValue={getValues("content")}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
