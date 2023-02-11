import { AppRoute } from '../../const/app-route';

type SocialItemProps = {
title: string;
icon: string;
link: string | AppRoute;
}

function SocialItem({title, icon, link}: SocialItemProps): JSX.Element{
  return(
    <li className="social__item">
      <a
        className="link"
        href={link}
        aria-label={title}
      >
        <svg width={20} height={20} aria-hidden="true">
          <use xlinkHref={icon} />
        </svg>
      </a>
    </li>
  );
}

export default SocialItem;
