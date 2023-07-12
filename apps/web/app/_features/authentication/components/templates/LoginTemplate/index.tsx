import { LoginForm, FormContainer } from '@/app/_features/authentication/components/blocks';
import { Heading } from '@/app/_shared/components/parts';

export const LoginTemplate = () => {
  return (
    <FormContainer
      renderHeading={() => (
        <Heading size='lg' className='mb-8'>
          ログイン
        </Heading>
      )}
    >
      <LoginForm />
    </FormContainer>
  );
};
