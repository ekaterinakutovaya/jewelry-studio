import { useState } from 'react';
import { FaTimes, FaSave, FaTrash } from "react-icons/fa";

import { Button, ConfirmDialog } from '@/components';


export const QuickEditButtonsMobile = ({ cancelEditModeHandler, saveHandler, deleteHandler, saving }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex md:hidden items-center justify-evenly md:order-10">
      <Button type="icon" onClick={saveHandler}>
        {saving ? (
          <FaSave className="text-lg md:text-base animate-bounce" />
        ) : (
          <FaSave className="text-lg md:text-base xl:text-base" />
        )}
      </Button>
      <Button type="icon"
        onClick={() => setOpen(true)}
      >
        <FaTrash className="text-lg md:text-base" />
      </Button>
      <button className="text-lg text-slate-600" onClick={cancelEditModeHandler}>
        <FaTimes />
      </button>

      <ConfirmDialog open={open} setOpen={setOpen} deleteHandler={deleteHandler} />
    </div>
  );
};
