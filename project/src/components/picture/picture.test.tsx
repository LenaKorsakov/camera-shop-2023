import { render, screen } from '@testing-library/react';
import { fakeCamera } from '../../utiles/mock';
import { PictureSize } from '../../const/picture-size';
import Picture from './picture';


describe('Component: Picture', () => {
  it('should render correctly in header component', () => {
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
