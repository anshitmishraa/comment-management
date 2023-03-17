import React from "react";
import { formatTimeAgo } from "./Utils";
import { showReplyBox } from "./ReplyBox";
import { renderReplies } from "./Reply";

function Comment(props) {
  return (
    <li key={props.comment._id} className="comment">
      <div className="comment-info">
        <div className="comment-author">
          <strong>{props.comment.author.name}</strong>
        </div>
        <div className="comment-date">
          <p>{formatTimeAgo(props.comment.created_at)}</p>
        </div>
      </div>
      <p
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: props.comment.content }}
      ></p>
      <div>
        <button
          onClick={() => {
            props.setReplyCommentId(props.comment._id);
          }}
        >
          Reply
        </button>
        {props.replyCommentId === props.comment._id &&
          showReplyBox(props.comment, props)}
      </div>
      {renderReplies(props.comment)}
      <hr />
    </li>
  );
}

export default Comment;
