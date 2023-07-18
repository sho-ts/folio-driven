import { FormControl } from '@/app/_shared/components/blocks';
import { Button, TextField } from '@/app/_shared/components/parts';

type Props = {};

export const CreateProductForm = ({}: Props) => {
  return (
    <div className='flex flex-col gap-6'>
      <FormControl render={() => <TextField placeholder='タイトル' fill />} />
      <FormControl render={() => <TextField placeholder='概要' fill />} />
      <FormControl render={() => <TextField placeholder='詳細説明' fill rows={5} />} />
      <Button>確認</Button>
    </div>
  );
};
