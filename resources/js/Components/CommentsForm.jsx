import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InputError from "./InputError";

const CommentsForm = ({ id }) => {
    const [errors, setErrors] = useState([]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const storeDataEl = useRef();
    const [values, setValues] = useState({
        content: "",
        name: "",
        email: "",
    });

    useEffect(() => {
        setValues({
            ...values,
            name: window.localStorage.getItem("name"),
            email: window.localStorage.getItem("email"),
        });
    }, []);

    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        setErrors({});

        const { checked: storeData } = storeDataEl.current;

        if (storeData) {
            window.localStorage.setItem("name", values.name);
            window.localStorage.setItem("email", values.email);
        } else {
            window.localStorage.removeItem("name", values.name);
            window.localStorage.removeItem("email", values.email);
        }

        axios
            .post(`/blogs/${id}/comments`, {
                content: values.content,
                name: values.name,
                email: values.email,
            })
            .then((response) => {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            })
            .catch((error) => setErrors(error.response.data.errors));
    };

    return (
        <div className="p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg">
            <h3 className="pb-4 mb-8 text-xl font-semibold border-b">
                Leave a Comment
            </h3>
            <form onSubmit={submit}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <textarea
                        onChange={handleOnChange}
                        className="w-full p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="Comment.."
                        name="content"
                        id="content"
                    />
                    <InputError messages={errors.content} className="mt-2" />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
                    <input
                        type="text"
                        onChange={handleOnChange}
                        className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="Name.."
                        name="name"
                        id="name"
                    />
                    <InputError messages={errors.name} className="mt-2" />
                    <input
                        type="email"
                        onChange={handleOnChange}
                        className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200"
                        placeholder="Email.."
                        name="email"
                        id="email"
                    />
                    <InputError messages={errors.email} className="mt-2" />
                </div>
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                        <input
                            ref={storeDataEl}
                            type="checkbox"
                            id="storeData"
                            name="storeData"
                        />
                        <label
                            className="ml-2 text-gray-500 cursor-pointer"
                            htmlFor="storeData"
                        >
                            Store my e-mail and name for the next time I
                            comment.
                        </label>
                    </div>
                </div>
                <div className="mt-8">
                    <button
                        type="submit"
                        className="inline-block px-8 py-3 text-lg text-white transition duration-500 bg-[#F1C40F] rounded-full cursor-pointer ease hover:bg-indigo-900"
                    >
                        Post comment
                    </button>
                    {showSuccessMessage && (
                        <span className="float-right mt-3 text-xl font-semibold text-green-500">
                            Comment submitted for review
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CommentsForm;
