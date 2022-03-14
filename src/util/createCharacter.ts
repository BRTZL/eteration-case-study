import React, { Dispatch, SetStateAction } from 'react';

type ErrorType = {
  name?: string;
  job?: string;
  bio?: string;
  imageLink?: string;
};

export const useCreateCharacter = () => {
  const [name, setName] = React.useState('');
  const [job, setJob] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [imageLink, setImageLink] = React.useState('');
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (name.length === 0) {
      nextErrors.name = 'This field is required.';
    }
    if (job.length === 0) {
      nextErrors.job = 'This field is required.';
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return false;
    }

    return true;
  };

  return {
    submit,
    errors,
    name,
    setName,
    job,
    setJob,
    bio,
    setBio,
    imageLink,
    setImageLink,
  };
};
