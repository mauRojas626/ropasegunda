import { CImg } from '@coreui/react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
const FileUpload = () => {
    const [files, setFiles] = useState([]);

    const onDrop = (acceptedFiles => {
        if(acceptedFiles.length = 1 && (acceptedFiles[0].type === "image/jpg" || acceptedFiles[0].type === "image/png" || acceptedFiles[0].type === "image/jpeg")) {
            setFiles(acceptedFiles.map(file => 
                Object.assign(file, {preview: URL.createObjectURL(file)})    
            ));
            console.log(acceptedFiles)
        }        
    })
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop})
//TO DO : Customize and Style this Drag and Drop to Upload box as you want🧑 💻😊
  return (
    
    <div {...getRootProps()}  className='dropzone mb-3'>
      <input {...getInputProps()} />
      <p>{isDragActive ? ("Arrastra aqui"): files.length > 0 ? ("") : ("Arrastra tu archivo o haz click para abrir el explorador.")}</p>
        {files.map((file) => (
            <CImg src={file.preview} height="2rem"></CImg>
        ))}
    </div>
  );
};
export default FileUpload;