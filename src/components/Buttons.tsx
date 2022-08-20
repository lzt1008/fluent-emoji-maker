import { Accessor, Component, createSignal, For } from "solid-js";
import { AssetKind, Emoji, EmojiKind } from "../App";
import SelectButton from "./SelectButton";

export interface ButtonsProps {
  items: Accessor<AssetKind>;
  selected: Accessor<Emoji>;
  kind: EmojiKind;
  handleClick: Function;
}

const Buttons: Component<ButtonsProps> = ({
  items,
  selected,
  kind,
  handleClick,
}: ButtonsProps) => {
  console.log(items);
  
  return (
    <div mt-4 flex="~ row" gap-2>
      <For each={items()[kind]}>
        {(item: string) => (
          <SelectButton
            selected={selected()[kind] === item}
            onClick={[handleClick, { item, kind }]}
          >
            <img src={item} alt="" />
          </SelectButton>
        )}
      </For>
    </div>
  );
};

export default Buttons;
