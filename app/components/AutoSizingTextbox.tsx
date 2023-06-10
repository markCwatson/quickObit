import React, { useState, useEffect } from 'react';

interface AutoResizingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  forwardedRef?: React.Ref<HTMLTextAreaElement>;
}

const AutoResizingTextarea: React.FC<AutoResizingTextareaProps> = ({
  value,
  onChange,
  className,
  forwardedRef,
  ...props
}) => {
  const [height, setHeight] = useState<number | 'auto'>('auto');
  const ref = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (forwardedRef && 'current' in forwardedRef && forwardedRef.current) {
      setHeight(forwardedRef.current.scrollHeight);
    }
  }, [value, forwardedRef]);

  return (
    <textarea
      ref={forwardedRef}
      value={value}
      onChange={onChange}
      className={className}
      style={{ height: height }}
      {...props}
    />
  );
};

const ForwardedAutoResizingTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AutoResizingTextareaProps
>((props, ref) => <AutoResizingTextarea {...props} forwardedRef={ref} />);

export default ForwardedAutoResizingTextarea;
