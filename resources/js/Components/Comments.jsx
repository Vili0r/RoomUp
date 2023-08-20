import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import axios from "axios";

const Comments = ({ id }) => {
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        const response = await axios.get(`/blogs/${id}/comments`);
        setComments(response.data);
    };

    useEffect(() => {
        getComments();
    }, [id]);

    return (
        <>
            {comments?.length > 0 && (
                <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
                    <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
                        {comments.length} Comments
                    </h3>
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="pb-4 mb-4 border-b border-gray-100"
                        >
                            <p className="mb-4">
                                <span className="font-semibold">
                                    {comment.name} on{" "}
                                    {moment(comment.create_at).format(
                                        "MMM DD, YYYY"
                                    )}
                                </span>
                            </p>
                            <p className="w-full text-gray-600 whitespace-pre-line">
                                {parse(comment.content)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Comments;
