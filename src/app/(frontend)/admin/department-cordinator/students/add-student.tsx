'use client'
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const AddStudent = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
    maxSize: 2 * 1024 * 1024, // 2MB limit
  });

  return (
    <div>
      <h1 className="text-[2rem] font-bold text-center">Add Student</h1>
      <p className="text-neutral-500 text-center mb-8">
        Upload a CSV or Excel file with student information.
      </p>

      <div
        {...getRootProps()}
        className="border-[1px] border-dashed border-primary rounded-lg py-8 grid place-content-center text-center gap-4 cursor-pointer"
      >
        <input {...getInputProps()} />
        <Image src="/icons/upload.svg" width={50} height={40} alt="Upload Icon" className="mx-auto" />
        <p>Drag & drop your file(s) here</p>
        <p className="text-neutral-500">OR</p>
        <Button variant="outline">Browse Files</Button>
      </div>

      <p className="text-neutral-500 mt-2">Only supports .csv, .xls, and .xlsx files (2MB max).</p>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Uploaded File:</h3>
          <ul className="mt-2">
            {files.map((file) => (
              <li key={file.name} className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Button>Update Student List</Button>
        <Button variant="outline" onClick={() => setFiles([])}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddStudent;
