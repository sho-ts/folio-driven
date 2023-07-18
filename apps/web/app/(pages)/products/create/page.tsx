import { CreateProductTemplate } from '@/app/_features/product/create/components/templates';
import { Header, Main } from '@/app/_shared/components/layouts';
import { Fragment } from 'react';

const CreateProduct = () => {
  return (
    <Fragment>
      <Header title='新規投稿' />
      <Main>
        <CreateProductTemplate />
      </Main>
    </Fragment>
  );
};

export default CreateProduct;
