import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = () => {
	const [convertedText, setConvertedText] = useState("");
	return (
		<div>
			<ReactQuill
				theme="snow"
				value={convertedText}
				onChange={setConvertedText}
				//style={{ minHeight: "300px" }}
			/>
		</div>
	);
};

export default RichTextEditor;
