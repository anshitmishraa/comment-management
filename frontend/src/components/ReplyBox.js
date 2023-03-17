import ContentEditable from "react-contenteditable";

export function showReplyBox(comment, props) {
  return (
    <div>
      <ContentEditable
        className="comment-box"
        html={props.reply}
        onChange={props.handleReplyInputChange}
      />
      <button
        disabled={!props.reply}
        onClick={() => {
          props.handleReplySubmit(comment._id, props.reply);
          props.fetchComments();
          props.setReplyCommentId(null);
          props.setReply("Write a reply...");
        }}
      >
        Submit
      </button>
    </div>
  );
}
