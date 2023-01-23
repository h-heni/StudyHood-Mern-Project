import express from "express";
import { getFeedPosts, getUserPosts, likePost, deletePost,addComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.delete("/:id/delete", verifyToken, deletePost);
router.put("/:id/comment", addComment);

export default router;
