import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";

interface FileUploaderProps {
  files: File[] | null | undefined;
  onChange: (files: File[]) => void;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onChange,
  className = "",
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`file-upload ${className} ${
        isDragActive ? "drag-active" : ""
      }`}
    >
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        files[0].type.includes("image") ? (
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="max-h-[400px] overflow-hidden object-cover"
          />
        ) : (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/file-uploaded.svg"
              width={24}
              height={24}
              alt="file"
            />
            <p className="text-14-medium">{files[0].name}</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="text-center">
            <p className="text-14-regular">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-12-regular text-gray-500">
              PDF, SVG, PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
