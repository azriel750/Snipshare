import express from "express";
import userRouter from "./user";
import snippetRouter from "./snippets";
import authRouter from "./auth";
import commentRouter from "./commenter";
import likeRouter from "./like";
import tagRouter from "./tag";

const router = express.Router();


router.use("/users", userRouter);
router.use("/snippets", snippetRouter);
router.use("/auth", authRouter);
router.use("/comments", commentRouter);
router.use("/likes", likeRouter);
router.use("/tags", tagRouter);
export default router;
