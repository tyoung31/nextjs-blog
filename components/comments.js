import { useState } from "react";
import styles from "./comments.module.css";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  console.log(props.post_id);
  const fetchComments = async () => {
    //make the api call
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ post_id: props.post_id }),
      headers: {
        "Content-Type": "aplication/json",
      },
    });
    //get the data from the response
    const data = await response.json();
    setComments(data);
  };
  return (
    <>
      <button onClick={fetchComments}>Show comments</button>
      {comments.map((comment) => {
        return (
          <div className={styles.comments} key={comment.id}>
            <div className={styles.header}>
              <div className={styles.author}>{comment.author}</div>
              <div className={styles.date}>{comment.date}</div>
            </div>
            <div className={styles.text}>{comment.text}</div>
          </div>
        );
      })}
    </>
  );
}
