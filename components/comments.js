import { useState } from "react";

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
          <div key={comment.id}>
            <p>
              {comment.author} {comment.date}
            </p>
            <p>{comment.text}</p>
          </div>
        );
      })}
    </>
  );
}
