type Props = {
  errors?: (string | undefined)[];
  render?: (props: { error?: boolean }) => JSX.Element;
};

// Todo: 作成中
export const FormControl = ({ render, errors }: Props) => {
  const hasError = (errors ?? []).filter(Boolean).length > 0;

  return (
    <div className="w-full">
      {render?.({
        error: hasError,
      })}
      {hasError && (
        <ul className="flex gap-1 mt-2 w-full">
          {errors?.map((error, i) => (
            <li key={i} className="text-red-400 text-sm">
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
