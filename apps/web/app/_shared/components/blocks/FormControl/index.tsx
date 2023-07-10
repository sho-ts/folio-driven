type Props = {
  errors?: string[];
  render?: (props: { error?: boolean }) => JSX.Element;
};

// Todo: 作成中
export const FormControl = ({ render, errors }: Props) => {
  return (
    <div className="w-full">
      <div>
        {render?.({
          error: !!errors && errors.length > 0,
        })}
      </div>
    </div>
  );
};
