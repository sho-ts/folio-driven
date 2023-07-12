type Props = {
  errors?: (string | undefined)[];
  render?: (props: { error?: boolean }) => JSX.Element;
};

// Todo: 作成中
export const FormControl = ({ render, errors }: Props) => {
  const hasError = (errors ?? []).filter(Boolean).length > 0;

  return (
    <div className='w-full'>
      {render?.({
        error: hasError,
      })}
      {hasError && (
        <ul className='mt-2 flex w-full gap-1'>
          {errors?.map((error, i) => (
            <li key={i} className='text-sm text-red-400'>
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
