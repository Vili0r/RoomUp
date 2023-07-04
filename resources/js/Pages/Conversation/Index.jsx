import React, { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { SecondaryButton, InputError } from "@/Components";

const Index = (props) => {
    const { conversations, getConversation } = usePage().props;
    const [singleConversation, setSingleConversation] =
        useState(getConversation);
    const [allConversations, setAllConversations] = useState(conversations);
    const { data, setData, processing, reset, post, errors, setError } =
        useForm({
            body: "",
        });

    const showImage = () => {
        return "/storage/";
    };

    const handleSingleConversation = (id) => {
        router.get(
            `/conversation/${id}`,
            {},
            {
                preserveScroll: true,
                only: ["getConversation"],
                onSuccess: (response) => {
                    console.log(response);
                    setAllConversations(response.props.conversations);
                },
            }
        );
    };

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        axios
            .post(`/conversation/${singleConversation.id}/reply`, {
                body: data.body,
            })
            .then((response) => {
                // Handle the response
                setSingleConversation(response.data);
                setData("body", "");
            })
            .catch((error) => {
                // Handle errors
                setError(error);
            });

        // post(route("conversation.reply", singleConversation.id), {
        //     preserveScroll: true,
        //     only: ["singleConversation"],
        // });
    };

    // console.log(singleConversation.replies);

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Start conversation" />
            <div className="max-w-8xl mx-auto mt-[6rem]">
                <div className="flex flex-row justify-between bg-white">
                    <div className="[@media(min-width:700px)]:overflow-y-hidden flex-col hidden w-2/5 border-r-2 [@media(min-width:700px)]:flex">
                        <div className="p-4 text-xl font-semibold">
                            All Conversations
                        </div>
                        {allConversations.map((item) => (
                            <>
                                <article
                                    key={item.id}
                                    onClick={() =>
                                        handleSingleConversation(item.id)
                                    }
                                    className={`${
                                        singleConversation &&
                                        singleConversation.id == item.id
                                            ? "bg-gray-200/80"
                                            : ""
                                    } flex items-start p-5 space-x-6 cursor-pointer hover:bg-slate-100`}
                                >
                                    <img
                                        src={
                                            item.user_id === props.auth.user.id
                                                ? item.message.owner.receiver
                                                      .avatar !==
                                                  "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                                    ? showImage() +
                                                      item.message.owner
                                                          .receiver.avatar
                                                    : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                                : item.sender.avatar !==
                                                  "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                                ? showImage() +
                                                  item.sender.avatar
                                                : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                        }
                                        width="60"
                                        height="88"
                                        className="flex-none rounded-md bg-slate-100"
                                    />
                                    <div className="relative flex-auto min-w-0">
                                        <h2 className="pr-20 font-semibold truncate text-slate-900">
                                            {item.user_id === props.auth.user.id
                                                ? item.message.owner.receiver
                                                      .first_name
                                                : item.sender.first_name}
                                        </h2>
                                        <dl className="flex flex-wrap text-sm font-medium leading-6">
                                            <div className="absolute top-0 right-0 flex items-center space-x-1">
                                                <dt className="text-[#F5B041]">
                                                    {item.last_reply}
                                                </dt>
                                            </div>

                                            <div className="flex-none w-full font-normal">
                                                <dd className="text-slate-400">
                                                    {item.message.message_text}
                                                </dd>
                                            </div>
                                            <div className="flex-none w-full font-normal">
                                                <dd className="text-slate-400">
                                                    {item.message.owner.title}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </article>
                                <hr className="w-[90%] mx-auto border-gray-300" />
                            </>
                        ))}
                    </div>

                    <div className="flex flex-col flex-auto w-full h-screen p-6 overflow-y-hidden">
                        <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-gray-100 rounded-2xl">
                            <div className="sticky py-4 text-xl font-semibold border-b-2">
                                {singleConversation
                                    ? singleConversation.user_id ===
                                      props.auth.user.id
                                        ? singleConversation.message.owner
                                              .receiver.first_name
                                        : singleConversation.sender.first_name
                                    : "Select a conversation"}
                            </div>
                            {singleConversation && (
                                <>
                                    <div className="flex flex-col h-full mb-4 overflow-x-auto">
                                        <div className="flex flex-col h-full">
                                            <div className="grid grid-cols-12 gap-y-2">
                                                {singleConversation.user_id ===
                                                props.auth.user.id ? (
                                                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                        <div className="flex flex-row-reverse items-center justify-start">
                                                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-black uppercase bg-[#F5B041] rounded-full">
                                                                {singleConversation.user_id !==
                                                                props.auth.user
                                                                    .id
                                                                    ? singleConversation
                                                                          .message
                                                                          .owner
                                                                          .receiver
                                                                          .initial
                                                                    : singleConversation
                                                                          .message
                                                                          .initial}
                                                            </div>
                                                            <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
                                                                <div>
                                                                    {
                                                                        singleConversation.body
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                        <div className="flex flex-row items-center">
                                                            <div className="flex items-center justify-center flex-shrink-0 text-black w-10 h-10 bg-[#F5B041] rounded-full">
                                                                {singleConversation.user_id ===
                                                                props.auth.user
                                                                    .id
                                                                    ? singleConversation
                                                                          .message
                                                                          .owner
                                                                          .receiver
                                                                          .initial
                                                                    : singleConversation
                                                                          .message
                                                                          .initial}
                                                            </div>
                                                            <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                                                                <div>
                                                                    {
                                                                        singleConversation.body
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {singleConversation.replies
                                                    ?.length > 0 &&
                                                    singleConversation.replies?.map(
                                                        (reply) =>
                                                            reply.user_id !==
                                                            props.auth.user
                                                                .id ? (
                                                                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                                    <div className="flex flex-row items-center">
                                                                        <div className="flex items-center justify-center flex-shrink-0 text-black w-10 h-10 bg-[#F5B041] rounded-full">
                                                                            {singleConversation.user_id ===
                                                                            props
                                                                                .auth
                                                                                .user
                                                                                .id
                                                                                ? singleConversation
                                                                                      .message
                                                                                      .owner
                                                                                      .receiver
                                                                                      .initial
                                                                                : singleConversation
                                                                                      .message
                                                                                      .initial}
                                                                        </div>
                                                                        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                                                                            <div>
                                                                                {
                                                                                    reply.body
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                                    <div className="flex flex-row-reverse items-center justify-start">
                                                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-black uppercase bg-[#F5B041] rounded-full">
                                                                            {singleConversation.user_id !==
                                                                            props
                                                                                .auth
                                                                                .user
                                                                                .id
                                                                                ? singleConversation
                                                                                      .message
                                                                                      .owner
                                                                                      .receiver
                                                                                      .initial
                                                                                : singleConversation
                                                                                      .message
                                                                                      .initial}
                                                                        </div>
                                                                        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
                                                                            <div>
                                                                                {
                                                                                    reply.body
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={submit}>
                                        <div className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl">
                                            <div>
                                                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex-grow ml-4">
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        name="body"
                                                        placeholder="Type your message..."
                                                        value={data.body}
                                                        onChange={
                                                            handleOnChange
                                                        }
                                                        className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
                                                    />
                                                    <InputError
                                                        message={errors.body}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <button
                                                    type="submit"
                                                    className="flex items-center justify-center flex-shrink-0 px-4 py-2 text-white bg-black hover:bg-gray-800 rounded-xl"
                                                >
                                                    <span>Send</span>
                                                    <span className="ml-2">
                                                        <svg
                                                            className="w-4 h-4 -mt-px transform rotate-45"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>

                    {singleConversation && (
                        <div className="w-2/5 px-5 [@media(max-width:1024px)]:hidden border-l-2 sticky">
                            <div className="flex flex-col">
                                <div className="py-4 text-xl font-semibold">
                                    {singleConversation.message.owner.title}
                                </div>
                                <img
                                    src={
                                        singleConversation.message.owner.images
                                            ? showImage() +
                                              singleConversation?.message.owner
                                                  .images[0]
                                            : HousePlaceholder
                                    }
                                    className="object-cover h-64 rounded-xl"
                                    alt=""
                                />
                                <div className="py-4 font-semibold">
                                    Created{" "}
                                    {moment(
                                        singleConversation.message.owner
                                            .created_at
                                    ).format("MMM DD, YYYY")}
                                </div>
                                <div className="font-light">
                                    {
                                        singleConversation.message.owner
                                            .description
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
};

export default Index;
