import { Component, createSignal, For, onMount } from "solid-js";
import Buttons from "./components/Buttons";

export interface Emoji {
  eyes: string;
  mouth: string;
  head: string;
  eyebrows: string;
  details: string;
}

export enum EmojiKind {
  eyes = "eyes",
  mouth = "mouth",
  head = "head",
  eyebrows = "eyebrows",
  details = "details",
}

export interface AssetKind {
  [EmojiKind.eyes]: string[];
  [EmojiKind.mouth]: string[];
  [EmojiKind.head]: string[];
  [EmojiKind.details]: string[];
  [EmojiKind.eyebrows]: string[];
}

type ImportFn = () => Promise<{ default: string }>

const loadImage = async () => {
  const modules = await import.meta.glob("./assets/**/*.svg");
  const a = (
    await Promise.all(
      Object.values(modules).map(
        async (m: ImportFn) => (await m()).default
      )
    )
  ).reduce(
    (pre, cur) => {
      const kind = cur.split("/").at(-2);
      pre[kind]?.push(cur);
      return pre;
    },
    {
      [EmojiKind.eyes]: [],
      [EmojiKind.mouth]: [],
      [EmojiKind.head]: [],
      [EmojiKind.details]: [],
      [EmojiKind.eyebrows]: []
    }
  );
  return a;
};

const App: Component = () => {
  const [assets, setAssets] = createSignal<AssetKind>({ eyes: [], mouth: [], head: [], eyebrows: [], details: [] });
  const [selected, setSelected] = createSignal<Emoji>({ eyes: "", mouth: "", head: "", eyebrows: "", details: "" });

  onMount(() => loadImage().then((assets) => setAssets(assets)));

  const handleClick = ({ item, kind }: { item: string, kind: EmojiKind }) => {
    setSelected({ ...selected(), [kind]: item });
    console.log(selected());
  }

  return (
    <div flex="~ col" h="100%">
      <h1 text="2xl" font="bold">
        Fluent Emoji Maker
      </h1>
      <For each={Object.keys(EmojiKind)}>
        {(kind: EmojiKind) => (
          <Buttons
            items={assets}
            selected={selected}
            kind={kind}
            handleClick={handleClick}
          />
        )}
      </For>

      <div w="100%" flex flex-1 items-center justify-center>
        <div border="~ w-2 rounded-xl gray-400" mt-8 h-64 w-64 pos-relative>
          <img pos-absolute w="100%" h="100%" src={selected().head} />
          <img pos-absolute w="100%" h="100%" src={selected().eyes} />
          <img pos-absolute w="100%" h="100%" src={selected().mouth} />
          <img pos-absolute w="100%" h="100%" src={selected().eyebrows} />
          <img pos-absolute w="100%" h="100%" src={selected().details} />
        </div>
      </div>
    </div>
  );
};

export default App;
