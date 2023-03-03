import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { OrderForm } from "@/components";
import { setEditMode } from "@/store/EditModeSlice";

export const NewOrder = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.scroll(0, 0);
        dispatch(setEditMode(true))
    }, []);


    return (
        <div className="container pb-[300px]">
            <OrderForm order={[]} images={[]} calculation={[]} />
        </div>
    );
};

