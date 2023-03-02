import { render, screen } from '@testing-library/react';
import { fakeReview } from '../../../utiles/mock';

import RatingPicker from './rating-picker';
import { useForm } from 'react-hook-form';
import { InputTitle } from '../../../const/review-inputs';

const rating = fakeReview.rating;


describe('Component: Rating Picker', () => {
  it('should render correctly', () => {

    // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    // jest.mock('react-hook-form', () => ({
    //   ...jest.requireActual('react-hook-form'),
    //   useFormContext: () => ({
    //     control: {
    //       register: jest.fn(),
    //     }
    //   }),
    // }));

    const Component = () => {
      const {register, formState: { errors },} = useForm();

      return (
        <RatingPicker
          rate={rating}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    expect(screen.getByText(InputTitle.Rating)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
  });

  it('should not have atribute disable and class "is-invalid" if there are not any errors', () => {

    const Component = () => {
      const {register, formState: { errors }} = useForm();

      return (
        <RatingPicker
          rate={rating}
          register={register}
          errors={errors}
          disabled={false}
        />);
    };

    render(<Component/>);

    expect(screen.getAllByTestId('star')[0]).not.toHaveAttribute('disabled');
    expect(screen.getAllByTestId('star')[4]).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('fieldset')).not.toHaveClass('is-invalid');
  });
});
