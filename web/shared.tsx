import { nbsp } from "utils/specialchars";

export const Anchor = ({ id }: { id: string }) => (
  <div id={id} className="navbar-anchor xl:no-navbar-anchor">
    {nbsp}
  </div>
);
