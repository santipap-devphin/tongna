import React , {useContext} from 'react';
import DataContext from '../context/DataContext';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditorExper = ({ initialContent = "", placeholder = "" ,  onChange , ImageUpload }) =>  {

    const {urlServer} = useContext(DataContext);
     
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
        "imageGalleryUrl": urlServer+"imgmedia/exper",
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
                "table",
                "link",
                /*"image",*/
                "imageGallery",
                "fullScreen",
                "showBlocks",
                "codeView",
               
                /*"preview"*/
               
            ]
        ]
     }
   
  return (<div>
            <SunEditor
                autoFocus={false}
                width="100%"
                height="auto"
                setOptions={opt}
                setContents={initialContent}
                onChange={onChange}
                onImageUpload = {ImageUpload}
               
                placeholder={placeholder}
            />
            {/* preview <div>{content}</div> */}
        </div>
    )
}

export default EditorExper