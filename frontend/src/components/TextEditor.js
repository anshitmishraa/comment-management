import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import "../CommentBox.css";
import axios from "axios";
import moment from "moment";

function TextEditor() {
  const [text, setText] = useState("Write a comment...");
  const [comments, setComments] = useState([]);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);

  function handleInputChange(event) {
    setText(event.target.value);
  }

  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get("http://localhost:5000/comments");
      setComments(response.data);
    }
    fetchComments();
  }, []);

  function handleBoldClick() {
    setBold(!isBold);
    document.execCommand("bold", isBold, null);
  }

  function handleItalicClick() {
    setItalic(!isItalic);
    document.execCommand("italic", isItalic, null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    axios
      .post("http://localhost:5000/comments", { content: text })
      .then((response) => {
        console.log("Comment posted:", response.data);
        setText("");
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  }

  function formatTimeAgo(time) {
    const diff = moment().diff(moment.utc(time));
    const duration = moment.duration(diff);
    const seconds = duration.asSeconds();
    const days = duration.asDays();
    if (days > 7) {
      return moment.utc(time).format("MMMM Do YYYY, h:mm:ss a");
    } else if (days >= 1) {
      return moment.utc(time).format("dddd [at] h:mm a");
    } else if (seconds >= 60) {
      return moment.utc(time).startOf("minute").fromNow();
    } else {
      return moment.utc(time).format("ss [seconds ago]");
    }
  }

  async function handleReplySubmit(commentId, replyContent) {
    const response = await axios.post(
      `http://localhost:5000/comments/${commentId}/replies`,
      { content: replyContent }
    );
    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) {
        return { ...comment, replies: [...comment.replies, response.data] };
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
  }

  function renderReplies(comment) {
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

  function renderComments() {
    return (
      <ul className="comments-list">
   {comments.map((comment) => (
    
      <li key={comment._id} className="comment">
        <div className="comment-info">
          <div className="comment-author">
          {/* <p>{JSON.stringify(comment)}</p> */}
            <strong>{comment.author.name}</strong>
          </div>
          <div className="comment-date">
            <p>{formatTimeAgo(comment.created_at)}</p>
          </div>
        </div>
        <p
          className="comment-content"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        ></p>

        {renderReplies(comment)}

        <hr />
        <div>
          {/*
            Render the reply button only if the user has not clicked it yet
            and the comment has no replies yet
          */}
          {!comment.showReplyBox && comment.replies.length === 0 && (
            <button
              onClick={() => {
                const updatedComments = comments.map((c) => {
                  if (c._id === comment._id) {
                    return { ...c, showReplyBox: true };
                  } else {
                    return { ...c, showReplyBox: false };
                  }
                });
                setComments(updatedComments);
              }}
            >
              Reply
            </button>
          )}

          {/*
            Render the reply box if the user has clicked the reply button
            or if the comment already has replies
          */}
          {(comment.showReplyBox || comment.replies.length > 0 )              && (

            <>
              <ContentEditable
                className="comment-box"
                html={comment.reply ? comment.reply : ""}
                onChange={(e) => {
                  const updatedComments = comments.map((c) => {
                    if (c._id === comment._id) {
                      return { ...c, reply: e.target.value };
                    } else {
                      return {...c};
                    }
                  });
                  setComments(updatedComments);
                }}
              />
              <button
                disabled={!comment.reply}
                onClick={() => {
                  handleReplySubmit(comment._id, comment.reply);
                  const updatedComments = comments.map((c) => {
                    if (c._id === comment._id) {
                      return { ...c, reply: "", showReplyBox: false };
                    } else {
                      return c;
                    }
                  });
                  setComments(updatedComments);
                }}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </li>
    ))}
  </ul>
)};

return (
  <div className="comment-section">
    <h2>Comment</h2>
    <div>
      <button onClick={handleBoldClick} className={isBold ? "focused" : ''}>
        <i className="fas fa-bold"></i>
      </button>
      <button onClick={handleItalicClick} className={isItalic ? "focused" : ''}>
        <i className="fas fa-italic"></i>
      </button>
    </div>
    <ContentEditable
      html={text}
      className="comment-box"
      onChange={handleInputChange}
    />
    <button onClick={handleSubmit} disabled={!text}>
      Submit
    </button>
    <hr />
    {renderComments()}
  </div>
);
}

export default TextEditor;
