'use client';

import { Form, FormControl } from '@/app/_shared/components/blocks';
import { Modal } from '@/app/_shared/components/blocks/Modal';
import { Button, TextField } from '@/app/_shared/components/parts';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useModal } from '@/app/_shared/hooks';
import { toast } from 'react-hot-toast';
import { useMutation, graphql } from 'react-relay';

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

const CREATE_PRODUCT = graphql`
  mutation CreateProductFormMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      productId
    }
  }
`;

export const CreateProductForm = () => {
  const router = useRouter();
  const [mutate] = useMutation(CREATE_PRODUCT);
  const [loading, setLoading] = useState(false);
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
    (_data: Schema) => {
      handleModalOpen();
    },
    [handleModalOpen],
  );

  const onSubmit = useCallback(
    async (data: Schema) => {
      setLoading(true);
      mutate({
        variables: {
          input: {
            title: data.title,
            description: data.description,
          },
        },
        onCompleted: () => {
          toast.success('新規投稿に成功しました');
          router.push('/');
        },
        onError: () => {
          toast.error('投稿に失敗しました');
          handleModalClose();
          setLoading(false);
        },
      });
    },
    [mutate, handleModalClose, router],
  );

  const onError = useCallback(() => {
    toast.error('入力内容を修正してください');
    handleModalClose();
  }, [handleModalClose]);

  return (
    <Form onSubmit={handleSubmit(onConfirm, onError)}>
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
            <Button disabled={loading} fill onClick={handleSubmit(onSubmit, onError)}>
              新規投稿
            </Button>
            <Button fill outline onClick={handleModalClose}>
              修正
            </Button>
          </div>
        </div>
      </Modal>
    </Form>
  );
};
