import { LevelNum } from "content/skill";
import { nbsp } from "utils/specialchars";

export type Props = {
  name: string;
  level: LevelNum;
  barColourClass: string;
};

const Full = (props: Props) => (
  <div className="bg-gray-300 rounded-lg shadow">
    <div
      style={{ width: `${props.level * 10}%` }}
      className={`${props.barColourClass} ${
        props.level === 10 ? "rounded-lg" : "rounded-l-lg"
      } py-1 px-2`}
    >
      {props.name}
    </div>
  </div>
);

const Segmented = (props: Props) => {
  const segment = (fill: 0 | 1 | 2, id: number) => (
    <div key={id} className="w-10 bg-gray-300 rounded-full shadow">
      {fill != 0 ? (
        <div
          className={`${
            fill == 1 ? "rounded-l-full w-1/2" : "rounded-full w-full"
          } ${props.barColourClass} px-2 py-1 select-none`}
        >
          {nbsp}
        </div>
      ) : (
        ""
      )}
    </div>
  );

  const numFull = Math.floor(props.level / 2);
  const numPartial = props.level % 2;
  const numEmpty = 5 - numFull - numPartial;
  return (
    <div className="flex space-x-2">
      {[
        ...Array(numFull).fill(2),
        ...Array(numPartial).fill(1),
        ...Array(numEmpty).fill(0),
      ].map((fill, index) => segment(fill, index))}
    </div>
  );
};

export const Responsive = (props: Props) => (
  <>
    <div className="justify-between hidden lg:flex">
      <p className="flex items-center">{props.name}</p>
      <Segmented {...props} />
    </div>
    <div className="lg:hidden">
      <Full {...props} />
    </div>
  </>
);
