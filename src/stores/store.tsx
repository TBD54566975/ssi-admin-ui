import { Accessor, createMemo, createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { DIDDocument } from "../facades/decentralizedID.facade";
import { ManifestOptions } from "../facades/manifest.facade";

export const [store, setStore] = createStore<any>({
  dids: [],
  schemas: [],
  manifests: [],
  get userDIDs() {
    return userDIDs()
  },
  get userCredentials() {
    return userManifests()
  }
});


// dids

export const setStoreDIDs = (DIDs: Partial<DIDDocument>[]) => {
  setStore('dids', (prevDIDs: DIDDocument[]) => [...prevDIDs, ...DIDs]);
}

let userDIDs: Accessor<DIDDocument[]>;

createRoot(() => {
   userDIDs = createMemo(() => store.dids);
});

export const getStoreDIDs = () => {
  return userDIDs();
}

export const getIDsFromStoreDIDs = () => {
  return userDIDs().map((document) => document.id);
}

export const getDIDAtPosition = (index: number) => {
  return userDIDs()[index];
}

// manifests

export const setStoreManifests = (manifests: ManifestOptions[]) => {
  let manifestSet: any[] = [];
  if (manifests?.length) {
    manifestSet = [...manifestSet, ...manifests]
  }
  setStore('manifests', (prevManifests: ManifestOptions[]) => [...prevManifests, ...manifestSet]);
}

let userManifests: Accessor<ManifestOptions[]>;

createRoot(() => {
   userManifests = createMemo(() => store.manifests);
});

export const getStoreManifests = () => {
  return userManifests();
}