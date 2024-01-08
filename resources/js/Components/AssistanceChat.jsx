import React, { useEffect } from "react";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import moment from "moment";

const AssistanceChat = ({ showChat }) => {
    const { data, setData, post, processing, errors } = useForm({
        body: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };
    console.log(data.body);

    const submit = (e) => {
        console.log("ok");
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
    const Chat = () => {
        return (
            <div
                style={{
                    boxShadow: `0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)`,
                }}
                className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[483px]"
            >
                <div className="flex flex-col space-y-1.5 pb-6">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Customer Support
                    </h2>

                    <p className="text-sm text-[#6b7280] leading-3">
                        Please enter your enquiry.
                    </p>
                </div>

                <div
                    className="pr-4 h-[324px]"
                    style={{
                        minWidth: "100%",
                        display: "table",
                    }}
                >
                    <div className="flex flex-1 gap-3 my-4 text-sm text-gray-600">
                        <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0">
                            <div className="p-1 bg-gray-100 border rounded-full">
                                <svg
                                    stroke="none"
                                    fill="black"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    ariaHidden="true"
                                    height="20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                    ></path>
                                </svg>
                            </div>
                        </span>
                        <p className="leading-relaxed">
                            <span className="block font-bold text-gray-700">
                                Support{" "}
                            </span>
                            Hi, how can I help you today?
                        </p>
                    </div>

                    <div className="flex flex-1 gap-3 my-4 text-sm text-gray-600">
                        <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0">
                            <div className="p-1 bg-gray-100 border rounded-full">
                                <svg
                                    stroke="none"
                                    fill="black"
                                    strokeWidth="0"
                                    viewBox="0 0 16 16"
                                    height="20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                                </svg>
                            </div>
                        </span>
                        <p className="leading-relaxed">
                            <span className="block font-bold text-gray-700">
                                You{" "}
                            </span>
                            fewafef
                        </p>
                    </div>
                </div>
                <div className="flex items-center pt-0">
                    <form
                        onSubmit={submit}
                        className="flex items-center justify-center w-full space-x-2"
                    >
                        <input
                            type="text"
                            name="body"
                            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                            placeholder="Type your message"
                            value={data.body}
                            onChange={handleOnChange}
                        />
                        <InputError message={errors.body} className="mt-2" />
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        );
    };
    return showChat ? <Chat /> : null;
};

export default AssistanceChat;
