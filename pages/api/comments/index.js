import { comments } from "../../../data/comments";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ comments });
  } else if (req.method === "POST") {
    const body = JSON.parse(req.body);
    var commentsForPost = comments.filter((comment) => {
      return comment.post_id == body.post_id;
    });
    res.status(201).json(commentsForPost);
  }
}
