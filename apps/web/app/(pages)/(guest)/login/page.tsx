import { LoginTemplate } from '@/app/_features/authentication/components/templates';
import { Header, Main } from '@/app/_shared/components/layouts';
import { Fragment } from 'react';

const Login = () => {
  return (
    <Fragment>
      <Header title='ログイン' />
      <Main>
        <LoginTemplate />
      </Main>
    </Fragment>
  );
};

export default Login;
