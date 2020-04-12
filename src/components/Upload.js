import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { filesQuery } from "./Files";

/*
 * Code adapted from Ben Awad
 * (Source: https://github.com/benawad/apollo-server-react-file-upload/blob/1_gc/web/src/Upload.js retrieved in February 2019)
*/

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export const Upload = () => {
  const [uploadFile] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }]
  });
  const onDrop = useCallback(
    ([file]) => {
      uploadFile({ variables: { file } });
    },
    [uploadFile],
  );

  const style = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({ 
        accept: '.docx, .pdf, .txt, image/*',
        onDrop,
    });

  return (
    <div className="container">
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the file here ...</p>
            ) : (
                <p>Drag and drop file here, or click to select file</p>
            )}
        </div>
        <p>&nbsp;</p>
        <ul className="list-group mt-2">
            {acceptedFiles.map(acceptedFile => (
                <li className="list-group-item list-group-item-success">
                    Successfully Uploaded: {acceptedFile.name}
                </li>
            ))}
        </ul>
    </div>
    
  );
};