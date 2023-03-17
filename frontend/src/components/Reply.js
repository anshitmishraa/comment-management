import { formatTimeAgo } from "./Utils";

export function renderReplies(comment) {
  return (
    <ul className="comment-replies">
      {comment.replies.map((reply) => (
        <li key={reply._id} className="comment">
          <div className="comment-info">
            <div className="comment-author">
              <strong>{reply.author.name}</strong>
            </div>
            <div className="comment-date">
              <p>{formatTimeAgo(reply.created_at)}</p>
            </div>
          </div>
          <p
            className="comment-content"
            dangerouslySetInnerHTML={{ __html: reply.content }}
          ></p>
        </li>
      ))}
    </ul>
  );
}
