import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

const EditorControlled = ({ getEditorValue , serviceDetails }) => {
  return <ReactQuill value={serviceDetails.description}
  onChange={getEditorValue} />
};

export default EditorControlled;
