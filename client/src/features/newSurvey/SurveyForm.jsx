import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validationSchema';
import { useSelector, useDispatch } from 'react-redux';
import { surveyFormValue } from './surveyFormSlice';

export default function SurveyForm({ onSurveySubmit }) {
  // redux
  const surveyFormData = useSelector((state) => state.surveyFormData);
  const dispatch = useDispatch();

  // use-hook-form config
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const renderError = (inputName) => {
    if (errors[inputName]?.message) {
      return (
        <div className=''>
          <div>{errors[inputName]?.message}</div>
        </div>
      );
    } else {
      return '';
    }
  };

  // separate helper for rendering email error
  const renderEmailError = () => {
    const emailErrors = [];
    if (errors.recipientList) {
      errors.recipientList.forEach((item) => {
        emailErrors.push(item.message);
      });
      return (
        <div className=''>
          <div>{emailErrors}</div>
        </div>
      );
    }
  };

  const onSubmit = (data) => {
    onSurveySubmit();
    dispatch(surveyFormValue(data));
  };
  return (
    <div className='card w-96 bg-base-100 text-neutral-content shadow-xl'>
      <div className='card-body items-center text-center'>
        <form
          className='flex flex-col w-full text-neutral'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className='card-title text-neutral'>Create a Survey</h2>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='title' className='label'>
              <span className='label-text'>Survey Title:</span>
            </label>
            <input
              id='title'
              type='text'
              placeholder='Subject Title'
              {...register('title')}
              className={`input input-bordered ${
                errors.title ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>{renderError('title')}</span>
            </label>
          </div>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='subject' className='label'>
              <span className='label-text'>Subject Line:</span>
            </label>
            <input
              id='subject'
              type='text'
              placeholder='Subject Line'
              {...register('subject')}
              className={`input input-bordered ${
                errors.subject ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>{renderError('subject')}</span>
            </label>
          </div>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='body' className='label'>
              <span className='label-text'>Survey Question:</span>
            </label>
            <input
              id='body'
              type='text'
              placeholder='Survey Question'
              {...register('body')}
              className={`input input-bordered ${
                errors.body ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>{renderError('body')}</span>
            </label>
          </div>

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='recipients' className='label'>
              <span className='label-text'>Recipient List:</span>
            </label>
            <input
              id='recipients'
              type='text'
              placeholder='Recipient List'
              {...register('recipients')}
              className={`input input-bordered ${
                errors.recipients ? 'input-error' : 'input-primary'
              } w-full max-w-xs`}
            />
            <label className='label'>
              <span className='label-text-alt'>
                {renderEmailError('recipients')}
              </span>
            </label>
          </div>
          <div className='flex gap-4 justify-center'>
            <input
              className='btn btn-outline btn-accent'
              type='reset'
              onClick={() => reset({ keepErrors: false })}
            />
            <input className='btn btn-outline btn-primary' type='submit' />
          </div>
        </form>
      </div>
    </div>
  );
}
