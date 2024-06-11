import { selectSignInButtonDisabled } from './ui.selector';
import { useAppSelector } from '../store';

export function useUiState() {
  const signInButtonDisabled = useAppSelector(selectSignInButtonDisabled);

  return {
    signInButtonDisabled,
  };
}
