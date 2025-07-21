import { createContext } from "react"

import { DEFAULT_MAP_STATE } from "./constants"

import { IMapState } from "../types/state"

export const MapStateContext = createContext(DEFAULT_MAP_STATE)
export const SetMapStateContext = createContext<
  React.Dispatch<React.SetStateAction<IMapState>> | undefined
>(undefined)
