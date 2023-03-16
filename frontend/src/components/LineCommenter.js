import React, { useState } from 'react';

const LineCommenter = ({ text }) => {
  const periodRegex = /\.$/;
  const [lines, setLines] = useState(text.split(/\r\n|\n/));
  const [comments, setComments] = useState([]);
  
  const handleCommentClick = (index) => {
    const commentText = prompt("Enter a comment");
    // Add comment to state
    setComments(prevComments => [
      ...prevComments,
      {
        line: index + 1,
        text: commentText
      }
    ]);
  };
  
  const handleLineChange = (index, newLine) => {
    // Check if new line ends with a period
    const endsWithPeriod = periodRegex.test(newLine);
    // Update line with comment icon if necessary
    const updatedLine = endsWithPeriod
      ? (
        <div>
          {newLine.replace(periodRegex, '')}
          <i className="fa fa-comment" onClick={() => handleCommentClick(index)} />
        </div>
      )
      : newLine;
    // Update state with new line
    setLines(prevLines => prevLines.map((line, i) => i === index ? updatedLine : line));
  };

  const handleCommentSubmit = (event, index) => {
    event.preventDefault();
    const commentText = event.target.commentInput.value;
    // Add comment to state
    setComments(prevComments => [
      ...prevComments,
      {
        line: index + 1,
        text: commentText
      }
    ]);
    // Clear input field
    event.target.commentInput.value = '';
  };

  return (
    <div>
      {lines.map((line, index) => (
        <div key={index}>
          {line}
          {comments.filter(comment => comment.line === index + 1).map((comment, i) => (
            <div key={i} className="comment">
              {comment.text}
            </div>
          ))}
          {periodRegex.test(line) && (
            <form onSubmit={(event) => handleCommentSubmit(event, index)}>
              <input type="text" name="commentInput" placeholder="Add a comment" />
            </form>
          )}
        </div>
      ))}
    </div>
  );
};
export default LineCommenter;

