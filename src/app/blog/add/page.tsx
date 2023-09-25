"use client"; //CSRにする

import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { config } from "@/lib/config";

// APIのURL
const url = config.apiPrefix + config.apiHost + "api/blog/";

const postBlog = async (
  title: string | undefined,
  description: string | undefined
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  try {
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const PostBlog = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //リロードを防ぐ
    toast.loading("投稿中です"); //toastを使って、Loading中を出す
    await postBlog(titleRef.current?.value, descriptionRef.current?.value);
    toast.success("投稿に成功しました"); //toastを使って、Loading中を出す
    router.push("/"); // トップ画面に戻る
    router.refresh(); // リフレッシュつけないと、新しい投稿が出てこないことがある
  };
  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログ新規作成 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostBlog;
