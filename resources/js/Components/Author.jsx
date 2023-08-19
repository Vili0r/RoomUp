import React from "react";

const Author = ({ author }) => {
    const showImage = () => {
        return "/storage/";
    };
    return (
        <div className="relative p-12 mt-20 mb-8 text-center bg-black rounded-lg bg-opacity-20">
            <div className="absolute left-0 right-0 -top-14">
                <img
                    alt={author.first_name}
                    height="100px"
                    width="100px"
                    className="align-middle rounded-full"
                    src={
                        author.avatar ===
                        "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                            ? "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                            : author.avatar
                    }
                />
            </div>
            <h3 className="mt-4 mb-4 text-xl font-bold text-white capitalize">
                {author.first_name}
            </h3>
            <p className="text-white text-ls">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus itaque qui nobis praesentium quam reiciendis, quasi,
                numquam repellendus veritatis molestiae saepe alias, sit
                voluptatibus eveniet unde earum aliquam. Accusantium, deleniti.
            </p>
        </div>
    );
};

export default Author;
