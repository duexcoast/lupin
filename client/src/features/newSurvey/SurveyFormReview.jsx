// SurveyFormReview shows users thier form inputs for review
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitSurvey } from './surveyFormSlice';

export default function SurveyFormReview({ onCancel }) {
  const { formValues } = useSelector((state) => state.surveyFormData);
  console.log(formValues);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    submitSurvey(formValues);
  };

  return (
    <div className='card w-96 bg-base-100 text-neutral-content shadow-xl'>
      <div className='card-body items-center text-center'>
        <form
          className='flex flex-col w-full text-neutra gap-4'
          onSubmit={onSubmitHandler}
        >
          <h2 className='card-title text-neutral'>
            Please Confirm Your Survey
          </h2>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='surveyTitle' className='label'>
              <span className='label-text'>Survey Title:</span>
            </label>
            <p
              id='surveyTitle'
              type='text'
              className='w-full max-w-xs text-neutral text-left'
            >
              {formValues.surveyTitle}
            </p>
          </div>
          <div className='form-control w-full max-w-xs'>
            <label htmlFor='surveySubject' className='label'>
              <span className='label-text'>Subject Line:</span>
            </label>
            <p
              id='surveySubject'
              type='text'
              className='w-full max-w-xs text-neutral text-left'
            >
              {formValues.surveySubject}
            </p>
          </div>
          <div className='form-control w-full max-w-xs'>
            <label htmlFor='surveyQuestion' className='label'>
              <span className='label-text'>Survey Question:</span>
            </label>
            <p
              id='surveyQuestion'
              type='text'
              className='w-full max-w-xs text-neutral text-left'
            >
              {formValues.surveyQuestion}
            </p>
          </div>
          <div className='form-control w-full max-w-xs'>
            <label htmlFor='recipientList' className='label'>
              <span className='label-text'>Recipient List</span>
            </label>
            <p
              id='recipientList'
              type='text'
              className='w-full max-w-xs text-neutral text-left'
            >
              {formValues.recipientList}
            </p>
          </div>

          <div className='flex gap-4 justify-center'>
            <input
              value='back'
              className='btn btn-outline btn-accent'
              type='button'
              onClick={onCancel}
            />
            <input
              value='confirm'
              className='btn btn-outline btn-primary'
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  );
}
