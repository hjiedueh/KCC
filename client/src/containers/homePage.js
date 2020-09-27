import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Home from "../components/layout/home";
import { getPosts, getPostsByAuthor } from "../actions/postActions";

const HomePage = ({
   getPosts,
   posts
}) => {
   useEffect(() => {
      getPosts();
   }, [getPosts]);

   return <Home posts={posts} />;
};

const mapStateToProps = state => ({
   posts: state.post.posts
});

HomePage.propTypes = {
   posts: PropTypes.array.isRequired,
   getPosts: PropTypes.func.isRequired,
};

export default connect(
   mapStateToProps,
   { getPostsByAuthor, getPosts }
)(HomePage);