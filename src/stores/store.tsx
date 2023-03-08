import { Accessor, createMemo, createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { DIDDocument } from "../facades/decentralizedID.facade";
// import { mockDID } from "../mocks/didJson";

export const [store, setStore] = createStore<any>({
  dids: [],
  schemas: [],
  get userDID() {
    return userDID()
  }
});

export const setDID = (DID: DIDDocument | undefined) => {
  setStore('dids', (dids: DIDDocument[]) => [...dids, DID]);
}

let userDID: Accessor<DIDDocument[]>;

createRoot(() => {
   userDID = createMemo(() => store.dids);
});

export const getUserDIDs = () => {
  return userDID();
}

export const getDIDAtPosition = (index: number) => {
  return userDID()[index];
}

// if (mockDID) setDID(mockDID);