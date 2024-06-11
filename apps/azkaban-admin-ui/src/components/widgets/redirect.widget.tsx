import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  path: string;
}

export function Redirect(props: Props) {
  const { path } = props;
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path, { replace: true });
  }, [navigate, path]);

  return null;
}
