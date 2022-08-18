import * as yup from 'yup';

export const schema = yup.object().shape({
  surveyTitle: yup
    .string('Please use your words.')
    .required('A survey title is required.'),
  surveySubject: yup
    .string('Please use your words.')
    .required('An email subject is required.'),
  surveyQuestion: yup
    .string('You need to enter a question here.')
    .required('A survey question is required.'),
  recipientList: yup
    .array()
    .transform(function (value, originalValue) {
      if (this.isType(value) && value !== null) {
        return value.flatMap((emails) => emails.split(/[\s,]+/));
      }
      return originalValue ? originalValue.split(/[\s,]/) : [];
    })
    .of(yup.string().email(({ value }) => `${value} is not a valid email`))
    .required(''),
});
