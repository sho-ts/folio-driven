'use client';

import { Form, FormControl } from '@/app/_shared/components/blocks';
import { Modal } from '@/app/_shared/components/blocks/Modal';
import { Button, TextField } from '@/app/_shared/components/parts';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useModal } from '@/app/_shared/hooks';
import { toast } from 'react-hot-toast';

const schema = z.object({
  title: z
    .string()
    .nonempty('タイトルは必須です')
    .max(150, 'タイトルは150文字以内で入力してください'),
  overview: z.string().max(500, '概要は500文字以内で入力してください').optional(),
  description: z
    .string()
    .nonempty('詳細は必須です')
    .max(20000, '詳細は20000文字以内で入力してください'),
});

type Schema = z.infer<typeof schema>;

export const CreateProductForm = () => {
  const [isOpen, handleModalOpen, handleModalClose] = useModal();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onConfirm = useCallback(
    (data: Schema) => {
      console.log(data);
      handleModalOpen();
    },
    [handleModalOpen],
  );

  return (
    <Form
      onSubmit={handleSubmit(onConfirm, () => {
        toast.error('入力内容を修正してください');
      })}
    >
      <FormControl
        errors={[errors.title?.message]}
        render={(props) => (
          <TextField {...register('title')} {...props} placeholder='タイトル' fill />
        )}
      />
      <FormControl
        errors={[errors.overview?.message]}
        render={(props) => (
          <TextField {...register('overview')} {...props} placeholder='概要' fill />
        )}
      />
      <FormControl
        errors={[errors.description?.message]}
        render={(props) => (
          <TextField {...register('description')} {...props} placeholder='詳細説明' fill rows={5} />
        )}
      />
      <Button type='submit' fill>
        確認
      </Button>
      <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
        <div className='flex flex-col gap-4'>
          <p>{watch('title')}</p>
          <p>{watch('overview')}</p>
          <p>{watch('description')}</p>
          <div className='flex flex-col gap-4 md:flex-row'>
            <Button fill>新規投稿</Button>
            <Button fill outline onClick={handleModalClose}>
              修正
            </Button>
          </div>
        </div>
      </Modal>
    </Form>
  );
};
