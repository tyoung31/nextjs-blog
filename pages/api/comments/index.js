import { comments } from "../../../data/comments";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ comments });
  } else if (req.method === "POST") {
    const comment = JSON.parse(req.body);
    const newComment = {
      id: Date.now(), //easiest way to get a unique id
      post_id: comment.post_id,
      author: "Anonymous",
      date: getTodaysDate(),
      text: comment.comment,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
}
