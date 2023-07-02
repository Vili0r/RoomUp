import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import moment from "moment";
import { HousePlaceholder } from "@/assets";
import { SecondaryButton, InputError } from "@/Components";

const Index = (props) => {
    const { conversations, conversation } = usePage().props;
    const { data, setData, processing, reset, post, errors } = useForm({
        body: "",
    });

    const showImage = () => {
        return "/storage/";
    };

    const handleSingleConversation = (id) => {
        router.get(
            `/conversation/${id}`,
            {},
            { preserveScroll: true, only: ["conversation"] }
        );
    };

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("conversation.reply", conversation.id), {
            preserveScroll: true,
        });
    };

    console.log(conversation);

    return (
        <GuestLayout user={props.auth.user}>
            <Head title="Start conversation" />
            <div className="max-w-9xl mx-auto mt-[6rem]">
                <div className="flex flex-row justify-between bg-white">
                    <div className="sticky flex-col hidden w-2/5 border-r-2 [@media(min-width:700px)]:flex">
                        <div className="p-4 text-xl font-semibold">
                            All Conversations
                        </div>
                        {conversations.map((item) => (
                            <>
                                <article
                                    key={item.id}
                                    onClick={() =>
                                        handleSingleConversation(item.id)
                                    }
                                    className={`${
                                        conversation &&
                                        conversation.id == item.id
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
                            <div className="py-4 text-xl font-semibold border-b-2">
                                {conversation
                                    ? conversation.message.full_name
                                    : "Select a conversation"}
                            </div>
                            {conversation && (
                                <>
                                    <div className="flex flex-col h-full mb-4 overflow-x-auto">
                                        <div className="flex flex-col h-full">
                                            <div className="grid grid-cols-12 gap-y-2">
                                                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                    <div className="flex flex-row-reverse items-center justify-start">
                                                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-black uppercase bg-indigo-500 rounded-full">
                                                            {
                                                                conversation
                                                                    .message
                                                                    .initial
                                                            }
                                                        </div>
                                                        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
                                                            <div>
                                                                {
                                                                    conversation
                                                                        .message
                                                                        .message_text
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                <div className="flex flex-row items-center">
                                                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full">
                                                        A
                                                    </div>
                                                    <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                                                        <div>
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Perspiciatis, in.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
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

                    {conversation && (
                        <div className="w-2/5 px-5 [@media(max-width:1024px)]:hidden border-l-2 sticky">
                            <div className="flex flex-col">
                                <div className="py-4 text-xl font-semibold">
                                    {conversation.message.owner.title}
                                </div>
                                <img
                                    src={
                                        conversation.message.owner.images
                                            ? showImage() +
                                              conversation?.message.owner
                                                  .images[0]
                                            : HousePlaceholder
                                    }
                                    className="object-cover h-64 rounded-xl"
                                    alt=""
                                />
                                <div className="py-4 font-semibold">
                                    Created{" "}
                                    {moment(
                                        conversation.message.owner.created_at
                                    ).format("MMM DD, YYYY")}
                                </div>
                                <div className="font-light">
                                    {conversation.message.owner.description}
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
