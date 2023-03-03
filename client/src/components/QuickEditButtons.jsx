import { useState } from 'react';
import { FaTimes, FaSave, FaTrash } from "react-icons/fa";

import { Button, ConfirmDialog } from '@/components';


export const QuickEditButtons = ({ cancelEditModeHandler, saveHandler, deleteHandler, saving }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden w-full md:flex items-center justify-evenly col-span-2 md:order-10">
      <Button type="icon" onClick={saveHandler}>
        {saving ? (
          <FaSave className="text-base lg:text-sm xl:text-base animate-bounce" />
        ) : (
          <FaSave className="text-base lg:text-sm xl:text-base" />
        )}

      </Button>
      <Button type="icon"
        onClick={() => setOpen(true)}
      >
        <FaTrash className="text-base lg:text-sm xl:text-base" />
      </Button>
      <button className="text-sm xl:text-base text-slate-800 hover:text-slate-600" onClick={cancelEditModeHandler}>
        <FaTimes />
      </button>

      <ConfirmDialog open={open} setOpen={setOpen} deleteHandler={deleteHandler} />
    </div>
  );
};
