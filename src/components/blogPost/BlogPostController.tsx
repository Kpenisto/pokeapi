import React, { useState, useEffect } from "react";
import axios from "axios";
import { BlogPostView } from "./BlogPostView";

interface BlogPost {
    _id: string;
    title: string;
    body: string;
    author: string;
    date: string;
}

export const BlogPostController = () => {
    //Display all posts
    const [posts, setPosts] = useState<BlogPost[]>([]);

    //Create Posts
    const [creatingPost, setCreatePost] = useState<boolean>(false);
    const [newPostTitle, setNewPostTitle] = useState<string>("");
    const [newPostBody, setNewPostBody] = useState<string>("");
    const [newPostAuthor, setNewPostAuthor] = useState<string>("");

    //Edit Posts
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editedTitle, setEditTitle] = useState<string>("");
    const [editedBody, setEditBody] = useState<string>("");
    const [editedAuthor, setEditAuthor] = useState<string>("");

    //API blog-posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3001/blog-posts");
            setPosts(response.data);
        } catch (error: any) {
            if (error.request) {
                console.log("No response from server.");
                setPosts([]);
            } else {
                console.log("Error setting up the request:", error.message);
            }
        }
    };

    //API create-blog-post
    const createNewPost = async () => {
        try {
            await axios.post("http://localhost:3001/create-blog-post", {
                title: newPostTitle,
                body: newPostBody,
                author: newPostAuthor
            });
            setCreatePost(false);
            //Reload after creation
            fetchPosts();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleEdit = (postId: string, title: string, body: string, author: string) => {
        setEditMode(postId);
        setEditTitle(title);
        setEditBody(body);
        setEditAuthor(author);
    };

    //API edit-blog-post
    const handleSaveEdit = async (postId: string) => {
        try {
            await axios.post(`http://localhost:3001/edit-blog-post?id=${postId}`, {
                title: editedTitle,
                body: editedBody,
                author: editedAuthor
            });
            setEditMode(null);
            //Reload after edit
            fetchPosts();
        } catch (error) {
            console.error("Error saving edit:", error);
        }
    };

    //API delete-blog-post
    const handleDelete = async (postId: string) => {
        try {
            await axios.delete(`http://localhost:3001/delete-blog-post?id=${postId}`);
            setEditMode(null);
            //Reload after delete
            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <BlogPostView
            posts={posts}

            createNewPost={createNewPost}
            creatingPost={creatingPost}
            setCreatePost={setCreatePost}
            newPostTitle={newPostTitle}
            setNewPostTitle={setNewPostTitle}
            newPostBody={newPostBody}
            setNewPostBody={setNewPostBody}
            newPostAuthor={newPostAuthor}
            setNewPostAuthor={setNewPostAuthor}

            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            editMode={editMode}
            setEditMode={setEditMode}
            editedTitle={editedTitle}
            setEditTitle={setEditTitle}
            editedBody={editedBody}
            setEditBody={setEditBody}
            editedAuthor={editedAuthor}
            setEditAuthor={setEditAuthor}

            onDelete={handleDelete}
        />
    );
};