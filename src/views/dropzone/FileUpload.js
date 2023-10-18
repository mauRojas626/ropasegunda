import { CImg } from '@coreui/react';
import { CCol, CRow, CBadge } from '@coreui/react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
const FileUpload = ({modo, newPhoto, removePhoto}) => {
    const [files, setFiles] = useState([])
    const m = modo
    const onDrop = useCallback(acceptedFiles => {
      if(acceptedFiles?.length && m === 'fotos'){
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file =>
            Object.assign(file, {preview: URL.createObjectURL(file)})
          )
        ])
        newPhoto(acceptedFiles)
      }
      else if(acceptedFiles.length = 1) {
            setFiles(acceptedFiles.map(file =>
              Object.assign(file, {preview: URL.createObjectURL(file)})
            ));
      }
        
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop, accept: {'image/*': []}})

    const removeFile = (name) => {
      setFiles(files => files.filter(files => files.name !== name))
      removePhoto(name)
    }
//TO DO : Customize and Style this Drag and Drop to Upload box as you want🧑💻😊
  return (
    <CCol>
      <div {...getRootProps()}  className='dropzone mb-3'>
        <input {...getInputProps()} />
        <p>{isDragActive ? ("Arrastra aqui"): m !== 'fotos' && files.length > 0 ? ("") : ("Arrastra tu archivo o haz click para abrir el explorador.")}</p>
          {m !== 'fotos' ? files.map((file) => (
              <CImg src={file.preview} height="2rem"></CImg>
          )): <></>}
      </div>
      {m === 'fotos' ?<CRow>
        {files.map((file, index) => (
                <CCol md="3" key={index}>
                  <CBadge onClick={() => removeFile(file.name)} shape="pill" color="danger" className="float-right mr-2">X</CBadge>
                  <CImg src={file.preview} style={{maxHeight: "15rem"}}></CImg>
                  
                </CCol>
            ))
        }
      </CRow> : <></>}
    </CCol>
  );
};
export default FileUpload;