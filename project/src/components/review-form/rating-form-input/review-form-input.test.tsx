import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { InputTitle, InputName, InputPlaceholder, InputErrorText } from '../../../const/review-inputs';
import ReviewFormInput from './review-form-input';


describe('Component: Review Form Tnput', () => {
  it('should render correctly', () => {

    const Component = () => {
      const {register, formState: { errors },} = useForm();

      return (
        <ReviewFormInput
          name={InputName.Name}
          title={InputTitle.Name}
          placeholder={InputPlaceholder.Name}
          errorText={InputErrorText.Name}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    expect(screen.getByText(InputTitle.Name)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(InputPlaceholder.Name)).toBeInTheDocument();
  });

  it('should not have atribute disable, not display errors text and class "is-invalid" if there are not any errors', () => {

    const Component = () => {
      const {register, formState: { errors }} = useForm();

      return (
        <ReviewFormInput
          name={InputName.Name}
          title={InputTitle.Name}
          placeholder={InputPlaceholder.Name}
          errorText={InputErrorText.Name}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    expect(screen.getByTestId('text')).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('wrapper')).not.toHaveClass('is-invalid');
    expect(screen.queryByDisplayValue(InputErrorText.Name)).not.toBeInTheDocument();
  });

  it('should show what user is typing correctly', async () => {

    const Component = () => {
      const {register, formState: { errors },} = useForm();

      return (
        <ReviewFormInput
          name={InputName.Name}
          title={InputTitle.Name}
          placeholder={InputPlaceholder.Name}
          errorText={InputErrorText.Name}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    await userEvent.type(screen.getByTestId('text'), 'userLena');
    expect(screen.getByDisplayValue(/userLena/i)).toBeInTheDocument();
  });
});
