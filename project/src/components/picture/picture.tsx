import { PictureSizeEnum } from '../../const/picture-size';

type PictureProps = {
  size: PictureSizeEnum;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  name: string;
}

function Picture({ name, previewImg, previewImgWebp, previewImg2x, previewImgWebp2x, size }: PictureProps): JSX.Element {
  //https://tpverstak.ru/cropping-images-css-svg/
  //тег picture не используем
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
      />
      <img
        src={`/${previewImg}`}
        srcSet={`/${previewImg2x} 2x`}
        width={size.width}
        height={size.height}
        alt={name}
      />
    </picture>
  );
}

export default Picture;
