import { useState } from "react";
import styles from "./comments.module.css";
import Date from "../components/date";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  console.log(props.post_id);
  const fetchComments = async () => {
    //make the api call
    const response = await fetch("/api/comments/" + props.post_id);
    //get the data from the response
    const data = await response.json();
    setComments(data);
  };
  const postComment = async (post_id) => {
    const response = await fetch(`/api/comments/${post_id}`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <input
        className={styles.comment_input}
        type="text"
        placeholder="Add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></input>
      <button onClick={() => postComment(props.post_id)}>Post Comment</button>
      <br></br>
      <button
        className={`${styles.show_comments} ${styles.button1}`}
        onClick={fetchComments}
      >
        Show comments
      </button>
      {comments.map((comment) => {
        return (
          <div className={styles.comments} key={comment.id}>
            <div className={styles.header}>
              <div className={styles.author}>{comment.author}</div>
              <div className={styles.date}>
                <Date dateString={comment.date} />
              </div>
            </div>
            <div className={styles.text}>{comment.text}</div>
          </div>
        );
      })}
    </>
  );
}
