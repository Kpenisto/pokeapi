import React from "react";
import "./blogPostCSS.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface BlogPost {
    _id: string;
    title: string;
    body: string;
    author: string;
    date: string;
}

interface BlogPostProps {
    posts: BlogPost[];

    creatingPost: boolean;
    setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
    newPostTitle: string;
    setNewPostTitle: React.Dispatch<React.SetStateAction<string>>;
    newPostBody: string;
    setNewPostBody: React.Dispatch<React.SetStateAction<string>>;
    newPostAuthor: string;
    setNewPostAuthor: React.Dispatch<React.SetStateAction<string>>;
    createNewPost: () => void;

    editMode: string | null;
    editedTitle: string;
    editedBody: string;
    editedAuthor: string;
    onEdit: (postId: string, title: string, body: string, author: string) => void;
    onSaveEdit: (postId: string) => void;
    onDelete: (postId: string) => void;
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    setEditBody: React.Dispatch<React.SetStateAction<string>>;
    setEditAuthor: React.Dispatch<React.SetStateAction<string>>;
    setEditMode: React.Dispatch<React.SetStateAction<string | null>>;
}

export const BlogPostView = ({
    posts,

    creatingPost,
    setCreatePost,
    newPostTitle,
    setNewPostTitle,
    newPostBody,
    setNewPostBody,
    newPostAuthor,
    setNewPostAuthor,
    createNewPost,

    editMode,
    editedTitle,
    editedBody,
    editedAuthor,
    onEdit,
    onSaveEdit,
    setEditTitle,
    setEditBody,
    setEditAuthor,
    setEditMode,

    onDelete
}: BlogPostProps) => {
    return (
        <div className="blog-container">
            <Typography variant="h3" gutterBottom>
                Kyle's Blog
            </Typography>
            <hr />
            {
                creatingPost ? 
                (
                    <div className="new-post-container">
                        <TextField
                            type="text"
                            placeholder="Title"
                            value={newPostTitle}
                            onChange={(e) => setNewPostTitle(e.target.value)} 
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <TextField
                            placeholder="Body"
                            value={newPostBody}
                            onChange={(e) => setNewPostBody(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <TextField
                            type="text"
                            placeholder="Author"
                            value={newPostAuthor}
                            onChange={(e) => setNewPostAuthor(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className="new-post-button-creation-container">
                            <Button variant="contained" onClick={createNewPost} className="muiButton">Create Post</Button>
                            <Button variant="contained" onClick={() => setCreatePost(false)} className="muiButton">Cancel</Button>
                        </div>
                    </div>
                ) 
                : 
                (
                    <div className="new-post-button-container">                    
                        <Button variant="contained" onClick={() => setCreatePost(true)} className="muiButton new-post-button">New Post</Button>
                    </div>
                )
            }
            {
            posts.length === 0 ? 
                (
                    <div>
                        <Typography variant="h5" gutterBottom>
                            No blog posts
                        </Typography>
                    </div>
                    
                ) 
                : 
                (
                    <div className="blog-posts-container">
                        {posts.map(post => (
                            <div key={post._id} className="blog-post">
                                {editMode === post._id ? 
                                    (
                                        <div className="blog-posts-edit-container">
                                            Title <TextField
                                                type="text"
                                                value={editedTitle}
                                                onChange={e => setEditTitle(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            Body <TextField
                                                value={editedBody}
                                                onChange={e => setEditBody(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            Author <TextField
                                                type="text"
                                                value={editedAuthor}
                                                onChange={e => setEditAuthor(e.target.value)}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                            <br />
                                                <div className="blog-posts-edit-buttons">
                                                    <Button variant="contained" onClick={() => onSaveEdit(post._id)} className="muiButton">Save</Button>
                                                    <Button variant="contained" onClick={() => setEditMode(null)} className="muiButton">Cancel</Button>
                                                </div>
                                        </div>
                                    ) 
                                    : 
                                    (
                                        <>
                                            <div className="blog-title">
                                                <Typography variant="h5" gutterBottom>
                                                    {post.title}
                                                </Typography>
                                                <div className="blog-date">{new Date(post.date).toLocaleString()}</div>
                                            </div>
                                            <div className="blog-body">{post.body}</div>
                                            <div className="blog-bottom-body">
                                                <div className="blog-author">{post.author}</div>
                                                <div className="blog-actions">
                                                <Button variant="outlined" onClick={() => onEdit(post._id, post.title, post.body, post.author)} className="muiButton">Edit</Button>
                                                <Button variant="outlined" onClick={() => onDelete(post._id)} className="muiButton" color="error">Delete</Button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};