import React, { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, useForm, router, Link } from "@inertiajs/react";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { CustomerService } from "@/assets";
import InputError from "@/Components/InputError";
import { CgMenuRight } from "react-icons/cg";

const Index = (props) => {
    const { conversations, getConversation } = usePage().props;
    const [singleConversation, setSingleConversation] =
        useState(getConversation);
    const [replies, setReplies] = useState(getConversation?.replies);
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
                only: ["getConversation", "conversations"],
                onSuccess: (response) => {
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

        if (singleConversation != null) {
            Echo.leave(`conversation.${singleConversation.id}`);
        }

        post(route("conversation.reply", singleConversation.id), {
            preserveScroll: true,
            preserveState: true,
            only: ["getConversation"],
            onSuccess: (response) => {
                setSingleConversation(response.props.getConversation);
                setAllConversations(response.props.conversations);
                setReplies(response.props.getConversation.replies);
                setData("body", "");
                add();
            },
        });
    };

    const add = () => {
        if (singleConversation != null) {
            Echo.private(`conversation.${singleConversation.id}`).listen(
                "ConversationReplyCreated",
                (e) => {
                    setReplies((prevReplies) => [e, ...prevReplies]);
                }
            );
        }
    };

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Start conversation" />
            <div className="max-w-8xl mx-auto mt-[6rem]">
                <div className="flex flex-row justify-between bg-white">
                    <div
                        className={`${
                            singleConversation
                                ? "[@media(min-width:700px)]:flex hidden"
                                : "flex"
                        } flex-col border-r-2 [@media(min-width:700px)]:overflow-y-hidden [@media(min-width:700px)]:w-2/5 w-full`}
                    >
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
                                                    ? item.message.owner
                                                          .receiver.avatar
                                                    : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                                : item.sender.avatar !==
                                                  "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                                ? item.sender.avatar
                                                : "https://www.gravatar.com/avatar/000000000000000000000000000000?d=mp"
                                        }
                                        className="w-[60px] h-[60px] flex-none rounded-md bg-slate-100"
                                    />
                                    <div className="relative flex-auto min-w-0">
                                        <h2 className="pr-20 font-semibold capitalize text-slate-900">
                                            {item.user_id === props.auth.user.id
                                                ? item.message.owner.receiver
                                                      ?.first_name
                                                : item.sender.first_name}
                                        </h2>
                                        <dl className="flex flex-wrap text-sm font-medium leading-6">
                                            <div
                                                className={`${
                                                    singleConversation
                                                        ? "static xl:absolute"
                                                        : "md:static lg:absolute [@media(max-width:700px)]:absolute"
                                                }  top-0 right-0 flex items-center space-x-1`}
                                            >
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

                    <div
                        className={`${
                            singleConversation
                                ? "flex"
                                : "[@media(min-width:700px)]:flex hidden"
                        } flex-col flex-auto w-full h-screen p-6 overflow-y-hidden`}
                    >
                        <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-gray-100 rounded-2xl">
                            <div className="sticky flex justify-between py-4 text-xl font-semibold capitalize border-b-2">
                                <Link
                                    href={route("conversation.index")}
                                    className="inline-flex [@media(min-width:700px)]:hidden items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 dark:hover:bg-gray-900 focus:outline-none dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400"
                                >
                                    <CgMenuRight className="inline-flex w-6 h-6" />
                                </Link>
                                {singleConversation
                                    ? singleConversation.user_id ===
                                      props.auth.user.id
                                        ? singleConversation.message.owner
                                              .receiver.first_name
                                        : singleConversation.sender?.first_name
                                    : "Select a conversation"}
                            </div>
                            {singleConversation && (
                                <>
                                    <div className="flex flex-col h-full mb-4 overflow-x-auto">
                                        <div className="flex flex-col h-full">
                                            <div className="grid grid-cols-12 gap-y-2">
                                                {replies?.length > 0 &&
                                                    replies?.map((reply) =>
                                                        reply.user_id !==
                                                        props.auth.user.id ? (
                                                            <div className="col-start-1 col-end-8 mt-2 rounded-lg">
                                                                <div className="flex flex-row items-center">
                                                                    <div className="flex items-center justify-center uppercase flex-shrink-0 text-black w-10 h-10 bg-[#F5B041] rounded-full">
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
                                                            <div className="col-start-6 col-end-13 mt-2 rounded-lg">
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
                                                {singleConversation.user_id ===
                                                props.auth.user.id ? (
                                                    <div className="col-start-6 col-end-13 mt-2 rounded-lg">
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
                                                    <div className="col-start-1 col-end-8 mt-2 rounded-lg">
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
                                                                          ?.initial}
                                                            </div>
                                                            <div className="relative ml-3 text-sm bg-white shadow xs:px-4 xs:py-2 rounded-xl">
                                                                <div>
                                                                    {
                                                                        singleConversation.body
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={submit}>
                                        <div className="flex items-center justify-between w-full h-16 pr-3 bg-white rounded-xl">
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
                                                    disabled={processing}
                                                    type="submit"
                                                    className="flex items-center justify-center flex-shrink-0 px-4 py-2 text-white bg-black hover:bg-gray-800 rounded-xl"
                                                >
                                                    <span className="[@media(max-width:400px)]:hidden">
                                                        Send
                                                    </span>
                                                    <span className="ml-2 [@media(max-width:400px)]:ml-0 [@media(max-width:400px)]:py-1">
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
                        <div className="w-2/5 px-5 [@media(max-width:1023px)]:hidden border-l-2 sticky">
                            <div className="flex flex-col">
                                <div className="py-4 text-xl font-semibold">
                                    {singleConversation.message?.owner.title}
                                </div>
                                <img
                                    src={
                                        singleConversation.message?.model ===
                                        "support"
                                            ? CustomerService
                                            : singleConversation.message?.owner
                                                  .images
                                            ? showImage() +
                                              singleConversation.message.owner
                                                  .images[0]
                                            : HousePlaceholder
                                    }
                                    className="object-cover h-64 rounded-xl"
                                    alt=""
                                />
                                {singleConversation.message?.model ===
                                "support" ? null : (
                                    <>
                                        <div className="py-4 font-semibold">
                                            Created{" "}
                                            {moment(
                                                singleConversation.message
                                                    ?.owner.created_at
                                            ).format("MMM DD, YYYY")}
                                        </div>
                                        <div className="font-light">
                                            {
                                                singleConversation.message
                                                    ?.owner.description
                                            }
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
};

export default Index;
