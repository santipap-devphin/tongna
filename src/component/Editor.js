import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const Editor = ({ initialContent = "", placeholder = "" ,  onChange }) => {

    const opt = {
        "defaultTag": "",
        "mode": "classic",
        "rtl": false,
        "katex": "window.katex",
        "fontSize": [
            8,
            10,
            14,
            18,
            24,
            36
	    ],
	    "videoFileInput": false,
        "tabDisable": false,
        "buttonList": [
		[
			"undo",
			"redo",
			"font",
			"fontSize",
			"formatBlock",
			"paragraphStyle",
			"blockquote",
			"bold",
			"underline",
			"italic",
			"strike",
			"fontColor",
			"hiliteColor",
			"textStyle",
			"removeFormat",
			"outdent",
			"indent",
			"align",
			"horizontalRule",
			"list",
			"lineHeight",
			"link",
		    "fullScreen",
			"showBlocks",
			"codeView",
			"preview",
		]
	],
	}

  return (<div>
            <SunEditor
                autoFocus={false}
                width="100%"
                height="auto"
                setOptions={opt}
                setContents={initialContent}
                onChange={onChange}
                placeholder={placeholder}
            />
            {/* preview <div>{content}</div> */}
            </div>
        )
}

export default Editor