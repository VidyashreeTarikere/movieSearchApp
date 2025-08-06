import React, { useState } from "react";
import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(`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`);

const AISearch = () => {
  const [searchAI, setSearchAI] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleAISearch = (e) => {
    setSearchAI(e.target.value);
  };

  const handleAISubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    let out = "";

    const stream = hf.chatCompletionStream({
      provider: "hf-inference",
      model: "HuggingFaceTB/SmolLM3-3B",
      messages: [
        {
          role: "user",
          content: `give [ { person: "Tom Cruise", genre: "all", date: "1980"}] for the input ${searchAI}`,
        },
      ],
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        // eslint-disable-next-line no-unused-vars
        out += newContent;
        console.log(newContent);
      }
    }
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={handleAISubmit}>
        <label htmlFor="search" className="sr-only">
          SearchAI
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            {/* Magnifying icon */}
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>

          {/* Search input */}
          <input
            type="text"
            id="search"
            value={searchAI}
            disabled={buttonDisabled}
            onInput={handleAISearch}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Recommend me a sci-fi movie from the 80s"
            required
          />
        </div>

        {/* Submit button with icon */}
        <button
          type="submit"
          disabled={buttonDisabled}
          className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {buttonDisabled ? (
            <svg
              className="mr-2 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="5" cy="12" r="2">
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <circle cx="12" cy="12" r="2">
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.3s"
                />
              </circle>
              <circle cx="19" cy="12" r="2">
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.6s"
                />
              </circle>
            </svg>
          ) : (
            <svg
              className="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3l1.09 3.36L16.5 7.5l-3.41 1.14L12 12l-1.09-3.36L7.5 7.5l3.41-1.14L12 3zM5 15l.7 2.1L8 18l-2.3.9L5 21l-.7-2.1L2 18l2.3-.9L5 15zm14 0l.7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15z"
              />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default AISearch;
