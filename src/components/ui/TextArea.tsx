import { useEffect, forwardRef } from "react";

export const TextArea = forwardRef((props: any, ref: any) => {
  useEffect(() => {
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [props.value]);
  return (
    <textarea
      readOnly
      style={{ resize: "none", outline: "none" }}
      value={props.value}
      ref={ref}
    />
  );
});
TextArea.displayName = "TextArea";

// export function TextArea({ value, ref }: any) {
//   return (
//     <textarea
//       readOnly
//       style={{ resize: "none", outline: "none" }}
//       value={value}
//     />
//   );
// }
