import {MutableRefObject} from "react";
import {User} from "@/types/api";

export type IAction = 'create' | 'edit' | 'delete';

export interface IModalProp {
  mRef: MutableRefObject<
    { open: (type: IAction, data: any) => void } | undefined
  >,
  update: () => void
}
