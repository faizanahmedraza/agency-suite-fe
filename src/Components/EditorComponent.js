import '@styles/react/libs/editor/editor.scss'
import { Editor } from 'react-draft-wysiwyg'

const EditorControlled = ({ editorState, onEditorStateChange }) => {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ['inline', 'blockType', 'fontFamily', 'fontSize', 'list', 'textAlign','link', 'history'],
        inline: { inDropdown: true },
        blockType: { inDropdown: true },
        fontFamily: { inDropdown: true },
        fontSize: { inDropdown: true },
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: true },
      }}
    />
  )
}

export default EditorControlled;
