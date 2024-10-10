export default function AddNewSticky({ onAction }) {
  function handleAdd(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const dispatchInfo = Object.fromEntries(fd.entries());
    dispatchInfo.type = "ADD_NEW"; // just adding type to title and desc
    onAction(dispatchInfo);

    event.target.reset();
  }

  const stickyCN =
    "flex flex-col justify-between w-56 h-56 shadow-xl shadow-stone-500 p-2 bg-white border-2 border-zinc-500";
  return (
    <form className={stickyCN} onSubmit={handleAdd}>
      <input
        name="title"
        type="text"
        className="text-2xl border-2 border-stone-300"
        placeholder="Title"
        maxLength="30"
        required
        autoFocus
      />

      <textarea
        name="desc"
        className="border-2 border-stone-300"
        rows="5"
        placeholder="Description"
        required></textarea>

      <footer className="flex justify-around">
        <button className="pt-1 pb-1 pr-2 pl-2 rounded-md border border-slate-500 bg-lime-400">
          Add New
        </button>
      </footer>
    </form>
  );
}
