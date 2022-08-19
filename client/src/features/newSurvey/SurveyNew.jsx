import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurveyFormReview from './SurveyFormReview';
import SurveyForm from './SurveyForm';
import { surveyFormValue } from './surveyFormSlice';

export default function SurveyNew() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  //redux
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.surveyFormData);

  useEffect(() => {
    dispatch(surveyFormValue(null));
  }, []);

  const renderContent = () => {
    if (showReviewForm) {
      return <SurveyFormReview onCancel={() => setShowReviewForm(false)} />;
    }
    return <SurveyForm onSurveySubmit={() => setShowReviewForm(true)} />;
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      {renderContent()}
    </div>
  );
}
