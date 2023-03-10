const Post =require ("../models/post.models");
const User =require ("../models/user.models");

/* CREATE */
module.exports ={
createPost : async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
},

/* READ */
getFeedPosts : async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
},

getUserPosts : async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
},

/* UPDATE */
likePost : async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
},
addComment:(req , res)=>{

  Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: req.body } },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((comment) => res.json(comment))
      .catch((err) => res.status(400).json(err));
},
showAllComment:(req,res)=>{
  Post.findById({_id:req.params.id})
  .then(post=>post.comments.map(m=>m))
  .catch((err) => res.status(400).json(err));
}
  
}

