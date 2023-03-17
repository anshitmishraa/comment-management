import React from "react";
import Comment from "./Comment";

function CommentList({
  comments,
  handleReplySubmit,
  handleReplyInputChange,
  setReplyCommentId,
  replyCommentId,
  reply,
  setReply,
  fetchComments,
}) {
  return (
    <ul className="comments-list">
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          handleReplySubmit={handleReplySubmit}
          handleReplyInputChange={handleReplyInputChange}
          setReplyCommentId={setReplyCommentId}
          replyCommentId={replyCommentId}
          reply={reply}
          setReply={setReply}
          fetchComments={fetchComments}
        />
      ))}
    </ul>
  );
}

export default CommentList;
