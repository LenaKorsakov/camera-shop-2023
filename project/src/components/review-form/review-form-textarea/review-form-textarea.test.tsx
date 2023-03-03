import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

import ReviewFormTextArea from './review-form-textarea';

import { InputTitle, InputErrorText } from '../../../const/review-inputs';


describe('Component: Review Form Textarea', () => {
  const handleTextareaChange = jest.fn();

  it('should render correctly', () => {

    const Component = () => {
      const {register, formState: { errors },} = useForm();

      return (
        <ReviewFormTextArea
          onChange={handleTextareaChange}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    expect(screen.getByText(InputTitle.Review)).toBeInTheDocument();
  });

  it('should not have atribute disable, not display errors text and class "is-invalid" if there are not any errors', () => {

    const Component = () => {
      const {register, formState: { errors }} = useForm();

      return (
        <ReviewFormTextArea
          onChange={handleTextareaChange}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    expect(screen.getByTestId('review')).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('wrapper')).not.toHaveClass('is-invalid');
    expect(screen.queryByDisplayValue(InputErrorText.Review)).not.toBeInTheDocument();
  });

  it('should call handleTextareaChange when user type review', async () => {

    const Component = () => {
      const {register, formState: { errors }} = useForm();

      return (
        <ReviewFormTextArea
          onChange={handleTextareaChange}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    await userEvent.type(screen.getByTestId('review'), 'lena');
    expect(screen.getByDisplayValue(/lena/i)).toBeInTheDocument();
    expect(handleTextareaChange).toBeCalled();
  });
});
