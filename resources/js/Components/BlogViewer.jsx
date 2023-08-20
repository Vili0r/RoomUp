import React from "react";
import DOMPurify from "dompurify";

function BlogViewer({ blogHtml }) {
    const sanitizedHtml = DOMPurify.sanitize(blogHtml, {
        USE_PROFILES: { html: true },
    });

    return (
        <div className="">
            <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
    );
}

export default BlogViewer;
