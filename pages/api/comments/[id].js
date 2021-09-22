import { comments } from "../../../data/comments";
import getTodaysDate from "../../../lib/getTodaysDate";

export default function handler(req, res) {
  //get comments by post_id
  const { id } = req.query;
  if (req.method === "GET") {
    var commentsForPost = comments.filter((comment) => {
      return comment.post_id == id;
    });
    commentsForPost.sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    });
    res.status(200).json(commentsForPost);
    //add comment
  } else if (req.method === "POST") {
    const comment = req.body.comment;
    const newComment = {
      id: Date.now(), //easiest way to get a unique id
      post_id: id,
      author: "Anonymous",
      date: getTodaysDate(),
      text: comment,
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  }
}
