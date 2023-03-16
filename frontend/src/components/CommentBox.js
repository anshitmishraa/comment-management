import './CommentBox.css';

function CommentBox(props) {
  return (
    <div className="comment-box">
      <div className="comment-header">
      <div className="comment-content">{props.content}</div>
        <small>{props.date}</small>
      </div>
      <div className="comment-actions">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default CommentBox;
