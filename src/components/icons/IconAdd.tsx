// icon:add | Teeny Icons https://teenyicons.com/ | Anja van Staden
import * as React from "react";

function IconAdd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7 7V1h1v6h6v1H8v6H7V8H1V7h6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default IconAdd;
