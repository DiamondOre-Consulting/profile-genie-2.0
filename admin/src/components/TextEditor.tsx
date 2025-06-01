import { useRef } from "react";
import JoditEditor from "jodit-react";

export default function TextEditor({
    value,
    handleBlur,
    height,
}: {
    value: string;
    handleBlur: (value: string) => void;
    height?: number;
}) {
    const editor = useRef(null);

    const config = {
        readonly: false,
        height:  height || 320,
        toolbarSticky: true,
        toolbarAdaptive: false,
        showCharsCounter: true,
        showWordsCounter: true,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: "insert_as_html",
        buttons: [
            "source",
            "|",
            "bold",
            "italic",
            "underline",
            "strike",
            "|",
            "ul",
            "ol",
            "indent",
            "outdent",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "|",
            "image",
            "video",
            "table",
            "link",
            "file",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "hr",
            "fullsize",
            "print",
            "about",
            "copyformat",
            "|",
            "selectall",
            "cut",
            "copy",
            "paste",
        ],
        uploader: {
            insertImageAsBase64URI: true,
        },
        style: {
            margin: 0,
            padding: "5px 24px",
            backgroundColor: "#fff",
        },
    };

    return (
        <div className="max-w-4xl mx-auto rounded">
            <JoditEditor
                ref={editor}
                value={value}
                className="px-1"
                tabIndex={1}
                //@ts-ignore
                config={config}
                onBlur={(newContent) => handleBlur(newContent)} // ✅ Updates react-hook-form on blur
            />
        </div>
    );
}
