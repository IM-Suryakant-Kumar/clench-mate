import { useDocumentTitle } from "../hooks"
import {AddComment, Post as CPost} from "../components";
import { useGetPostQuery } from "../features/apis";
import { useParams } from "react-router";

export const Post = () => {
  useDocumentTitle("Post");
  const {postId} = useParams();
  const {data} = useGetPostQuery(postId!)
  
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {data?.post && <CPost post={data.post} />}
      <AddComment postId={postId!} />
      
    </div>
  )
}