

export default (props) => {
  return (
    <div
      bg-gray-100
      p-2
      rounded-md
      cursor-pointer
      border-2
      class={
        props.selected ? "border-red-400 bg-red-100" : "border-transparent"
      }
      {...props}
      transition-colors
      hover="bg-red-100 border-red-400"
    >
      {props.children}
    </div>
  );
};
