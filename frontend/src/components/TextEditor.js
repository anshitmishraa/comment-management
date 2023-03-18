import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentEditable from "react-contenteditable";
import CommentList from "./CommentList";

function TextEditor() {
  const [text, setText] = useState("Write a comment...");
  const [comments, setComments] = useState([]);
  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [reply, setReply] = useState("Write a reply...");
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCommentMessage = "Comment has been fetched successfully";
  const addCommentMessage = "Comment has been added successfully";
  const addReplyCommentMessage = "Reply has been added successfully";

  useEffect(() => {
    // Remove the first success message from the array after 3 seconds
    if (success.length > 0) {
      const timeoutId = setTimeout(() => {
        setSuccess(success.slice(1));
      }, 3000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  useEffect(() => {
    // Remove the first error message from the array after 10 seconds
    if (errorMessage.length > 0) {
      const timeoutId = setTimeout(() => {
        setErrorMessage(errorMessage.slice(1));
      }, 10000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [errorMessage]);

  // API call to get comments
  async function fetchComments() {
    try {
      const response = await axios.get("https://comment-management.vercel.app/comments");
      setSuccess([...success, fetchCommentMessage]);
      setComments(response.data);
    } catch (error) {
      setErrorMessage([...errorMessage, error.response.data.message]);
    }
  }

  // Handle change in the main comment box
  function handleInputChange(event) {
    setText(event.target.value);
  }

  // Handle change in the reply box
  function handleReplyInputChange(event) {
    setReply(event.target.value);
  }

  // Handle submit button click for main comment
  function handleSubmit(event) {
    event.preventDefault();
    if (text) {
      axios
        .post("https://comment-management.vercel.app/comments", { content: text })
        .then((response) => {
          setSuccess([...success, addCommentMessage]);
          setText("Write a comment...");
        })
        .catch((error) => {
          setErrorMessage([...errorMessage, error.response.data.message]);
        });
    }
  }

  // Handle submit button click for reply
  async function handleReplySubmit(commentId, replyContent) {
    try {
      await axios.post(`https://comment-management.vercel.app/comments/${commentId}/replies`, {
        content: replyContent,
      });
      setSuccess([...success, addReplyCommentMessage]);
    } catch (error) {
      setErrorMessage([...errorMessage, error.response.data.message]);
    }
  }

  // Handle bold button click
  function handleBoldClick() {
    setBold(!isBold);
    document.execCommand("bold", isBold, null);
  }

  // Handle italic button click
  function handleItalicClick() {
    setItalic(!isItalic);
    document.execCommand("italic", isItalic, null);
  }

  return (
    <div className="comment-section">
      <div class="container">
        <div class="top-left">
          <h1>Comment</h1>
        </div>
        <div class="top-right">
          <button onClick={fetchComments}>Fetch Comment</button>
        </div>
      </div>

      <div>
        <button onClick={handleBoldClick} className={isBold ? "focused" : ""}>
          <i className="fas fa-bold"></i>
        </button>
        <button
          onClick={handleItalicClick}
          className={isItalic ? "focused" : ""}
        >
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
      <CommentList
        comments={comments}
        handleReplySubmit={handleReplySubmit}
        handleReplyInputChange={handleReplyInputChange}
        setReplyCommentId={setReplyCommentId}
        replyCommentId={replyCommentId}
        reply={reply}
        setReply={setReply}
        fetchComments={fetchComments}
      />
      {errorMessage &&
        errorMessage.map((message, index) => (
          <div key={index} className="error-message">
            {message}
          </div>
        ))}
      {success &&
        success.map((message, index) => (
          <div key={index} className="success-message">
            {message}
          </div>
        ))}
    </div>
  );
}

export default TextEditor;
