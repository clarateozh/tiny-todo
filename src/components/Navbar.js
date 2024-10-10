import { useRef } from "react";

export default function Navbar({ onAction, todoNum }) {
  const isOnline = navigator.onLine;
  const dialog = useRef();

  function handleClearBoard() {
    dialog.current.close();

    onAction({ type: "CLEAR_ALL" });
  }

  function handlePopulateBoard() {
    onAction({ type: "POPULATE_SAMPLE" });
  }

  function reqConfirm() {
    dialog.current.showModal();
  }

  return (
    <>
      <div>
        <header className="w-full bg-zinc-600 text-4xl text-white p-5 tracking-wider rounded-t-lg">
          {isOnline ? (
            <span className="text-green-500">Online</span>
          ) : (
            <span className="text-red-400">Offline</span>
          )}{" "}
          Tiny To-Dos
        </header>

        {todoNum > 0 && (
          <button
            onClick={reqConfirm}
            className="bg-white text-black text-sm p-2 rounded-lg place-self-end absolute top-12 right-24 font-semibold">
            Clear Board
          </button>
        )}

        {todoNum === 0 && (
          <button
            onClick={handlePopulateBoard}
            className="bg-white text-black text-sm p-2 rounded-lg place-self-end absolute top-12 right-24 font-semibold">
            Populate with Sample Set
          </button>
        )}
      </div>

      {!isOnline && (
        <aside className="bg-red-400 text-white">
          Please check your internet connection. Changes will be lost when page
          refreshes.
        </aside>
      )}
      {isOnline && (
        <aside className="bg-green-500 text-white">
          Powered by Firestore Database
        </aside>
      )}

      <dialog
        ref={dialog}
        className="backdrop:bg-black/50 backdrop:backdrop-grayscale h-fit w-fit p-5 ">
        <div className="flex flex-col gap-4">
          <div>
            <p>
              Do you really want to <strong>delete ALL</strong> To-Dos?
            </p>
            <p>
              This step is <strong>irreversible</strong>.
            </p>{" "}
          </div>
          <div className="flex justify-around">
            <button
              onClick={handleClearBoard}
              className="pt-1 pb-1 pr-2 pl-2 rounded-md border  text-white bg-red-700 ">
              Yes, Delete All
            </button>
            <button
              onClick={() => dialog.current.close()}
              className="  bg-lime-400  border-slate-500 pt-1 pb-1 pr-2 pl-2 rounded-md">
              No, Keep All
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
