import React from "react";
import { Link } from "react-router-dom";
import Post from "./post";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import "./post.scss";

const ListPost = ({ posts }) => {
   return (
      <div className="grid-container mx-5">
         {posts.map(post => (
            <Link to={`/blog/post/${post._id}`} key={post._id}>
               <Post post={post} />
            </Link>
         ))}
      </div>
   );
};

ListPost.propTypes = {
   posts: PropTypes.array.isRequired
};

export default ListPost;