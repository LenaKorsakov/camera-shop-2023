import { WarningMessage } from '../../const/warning-message';
import './empty-page.css';

function EmptyPage(): JSX.Element {
  return (
    <div className='empty-page'>
      <h1 className='title'>{WarningMessage.FilterWarning}</h1>
    </div>
  );
}

export default EmptyPage;
