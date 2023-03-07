import { MemoryRouter } from 'react-router-dom';
//import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ReviewModal from './review-modal';

import { fakeCamera, mockStore } from '../../utiles/mock';

describe('Component: Review Modal', () => {

  it('should render correctly', () => {
    const setStateMock = jest.fn() as React.Dispatch<React.SetStateAction<boolean>>;

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ReviewModal cameraId={fakeCamera.id} setIsOpen={setStateMock}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('success')).not.toBeInTheDocument();
    expect(screen.getByTestId('reviewForm')).toBeInTheDocument();
  });

  // it('should call handler when user click on the link', async () => {

  //   const setStateMock = jest.fn() as React.Dispatch<React.SetStateAction<boolean>>;

  //   render(
  //     <Provider store={mockStore}>
  //       <MemoryRouter>
  //         <ReviewModal cameraId={fakeCamera.id} setIsOpen={setStateMock}/>
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const button = screen.getByLabelText('Закрыть попап');
  //   await userEvent.click(button);
  //   expect(setStateMock).toBeCalled();
  // });
});
