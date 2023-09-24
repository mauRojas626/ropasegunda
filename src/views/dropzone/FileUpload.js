import { CImg } from '@coreui/react';
import { CCol, CRow, CBadge } from '@coreui/react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
const FileUpload = (modo) => {
    const [files, setFiles] = useState([])
    const m = modo.modo
    const onDrop = useCallback(acceptedFiles => {
      console.log(m)
      if(acceptedFiles?.length && m === 'fotos'){
        console.log(acceptedFiles)
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file =>
            Object.assign(file, {preview: URL.createObjectURL(file)})
          )
        ])
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
    }
//TO DO : Customize and Style this Drag and Drop to Upload box as you want🧑 💻😊
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
        {files.map((file) => (
                <CCol md="3">
                  <CBadge onClick={() => removeFile(file.name)} shape="pill" color="danger" className="float-right mr-2">X</CBadge>
                  <CImg src={file.preview} style={{maxHeight: "15rem"}} onLoad={() => {URL.revokeObjectURL(file.preview)}}></CImg>
                  
                </CCol>
            ))
        }
      </CRow> : <></>}
    </CCol>
  );
};
export default FileUpload;