// src/components/ToolbarPlugin.tsx
import React from "react";
import { $getSelection, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


export const ToolbarPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    const applyFormat = (format: string) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.formatText(format);
            }
        });
    };

    return (
        <div className="flex space-x-2 border-b pb-2 mb-2">
            <button
                onClick={() => applyFormat("bold")}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                Bold
            </button>
            <button
                onClick={() => applyFormat("italic")}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                Italic
            </button>
            <button
                onClick={() => applyFormat("underline")}
                className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
                Underline
            </button>
        </div>
    );
};
