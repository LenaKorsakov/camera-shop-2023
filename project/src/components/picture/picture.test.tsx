import { render, screen } from '@testing-library/react';

import Picture from './picture';

import { fakeCamera } from '../../utils/mock';
import { PictureSize } from '../../const/picture-size';


describe('Component: Picture', () => {
  it('should render correctly component', () => {
    const { name, previewImg, previewImgWebp, previewImg2x, previewImgWebp2x } = fakeCamera;

    render(
      <Picture
        previewImg={previewImg}
        previewImgWebp={previewImgWebp}
        previewImgWebp2x={previewImgWebp2x}
        previewImg2x={previewImg2x}
        name={name}
        size={PictureSize.PREVIEW_PICTURE}
      />
    );

    expect(screen.getByAltText(name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
