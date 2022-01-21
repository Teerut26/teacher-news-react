import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import _ from "lodash";

const image_allow = ["image/jpeg", "image/png", "image/gif"];

export default function MyDropzone({ onDropFile }) {
  const [File, setFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    if (_.includes(image_allow, acceptedFiles[0].type)) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  useEffect(() => {
    if (File === null) return;
    onDropFile(File);
  }, [File]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="h-[5rem] border-4 p-3 rounded-lg border-dashed flex justify-center items-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>Drop the files here ...</div>
      ) : File === null ? (
        <div className="flex justify-center items-center gap-2">
          <div>
            <i class="far text-2xl fa-file-image"></i>
          </div>
          <div className="text-lg">Drop the images here.</div>
        </div>
      ) : (
        <div className="truncate">{File.name}</div>
      )}
    </div>
  );
}
