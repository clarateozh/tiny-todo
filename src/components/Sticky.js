import { useState } from "react";

export default function Sticky({ id, title, desc, complete, onAction }) {
  let stickyCN =
    "flex flex-col justify-between w-56 h-56 shadow-lg shadow-stone-500 p-2 transition-all duration-1000";
  stickyCN += complete ? " bg-indigo-700 opacity-50" : " bg-yellow-200";

  const [inEdit, setInEdit] = useState(false); // Each sticky has its own individual edit state

  function handleSave(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const dispatchInfo = Object.fromEntries(fd.entries());

    // Dispatch SAVE action if there are any changes
    if (dispatchInfo.title !== title || dispatchInfo.desc !== desc) {
      dispatchInfo.id = id;
      dispatchInfo.type = "SAVE";
      onAction(dispatchInfo);
    }

    setInEdit(false);
  }

  function handleDelete() {
    // Dispatch DELETE action
    onAction({ type: "DELETE", id: id });
  }

  function handleComplete() {
    // Dispatch COMPLETED action
    onAction({ type: "COMPLETED", id: id });
  }

  // Render a form if in edit state
  if (inEdit) {
    return (
      <form className={stickyCN} onSubmit={handleSave}>
        <input
          name="title"
          type="text"
          className="text-2xl"
          required
          defaultValue={title}
        />
        <textarea name="desc" rows="5" required defaultValue={desc} />
        <footer className="flex justify-around">
          <button
            className="pt-1 pb-1 pr-2 pl-2 rounded-md border border-slate-500"
            type="button"
            onClick={() => setInEdit(false)}>
            Cancel
          </button>
          <button
            className="pt-1 pb-1 pr-2 pl-2 rounded-md border border-slate-500  bg-lime-400"
            type="submit">
            Save
          </button>
        </footer>
      </form>
    );
  } else {
    // Render a normal sticky as list item with 3 action buttons if not in edit state
    return (
      <li className={stickyCN}>
        {
          // Rubber stamp for completed todos
          complete && (
            <aside className="absolute top-20 place-self-center z10 -rotate-45 text-stone-400 text-3xl border-2 border-stone-400 rounded-xl p-1 font-semibold opacity-50">
              COMPLETED
            </aside>
          )
        }
        <h2 className="text-2xl">{title}</h2>
        <p>{desc}</p>
        <footer className="flex justify-around">
          <button
            onClick={handleDelete}
            className="bg-red-700 text-white pt-1 pb-1 pr-2 pl-2 rounded-md">
            Delete
          </button>
          {!complete && (
            <button
              onClick={handleComplete}
              className="bg-blue-600 text-white pt-1 pb-1 pr-2 pl-2 rounded-md">
              Completed
            </button>
          )}

          {!complete && (
            <button
              onClick={() => setInEdit(true)}
              className="pt-1 pb-1 pr-2 pl-2 rounded-md border border-slate-500">
              Edit
            </button>
          )}
        </footer>
      </li>
    );
  }
}
