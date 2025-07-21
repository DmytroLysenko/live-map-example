import React, { useEffect, useContext } from "react"

import { MapStateContext, SetMapStateContext } from "../../state/providers"

import { getLayoutState } from "../../state/utils"

import { IMapProps } from "../../types/map"
import { DEFAULT_MAP_STATE } from "../../state/constants"
import { ISectionDto } from "../../types/layout"

interface IProps {
  venueLayoutId: IMapProps["venueLayoutId"]
  token: IMapProps["token"]
}

const MapStateMonitor = ({ venueLayoutId, token }: IProps) => {
  const mapState = useContext(MapStateContext)
  const setMapState = useContext(SetMapStateContext)

  const getSections = async (
    venueLayoutId: Required<IMapProps>["venueLayoutId"],
  ) => {
    if (typeof setMapState !== "function") return
    try {
      if (!token) throw new Error("")
      setMapState((prev) => ({ ...prev, layout: { ...prev.layout, loading: true } }))
      const response = await fetch(
        `https://stage-api.vpc.qcue.com/venue/public/venuelayouts/${venueLayoutId}/sections?deep=true`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          method: "GET",
        },
      )
      if (!response.ok) {
        throw new Error()
      } else {
        const sections: ISectionDto[] = await response.json()
        setMapState({
          ...DEFAULT_MAP_STATE,
          layout: {
            ...getLayoutState(sections),
            loading: false,
            venueLayoutId,
          },
        })
      }
    } catch {
      setMapState((prev) => ({
        ...prev,
        layout: { ...prev.layout, loading: false },
      }))
      console.error(
        `Map Error: Error getting sections for the venueLayoutId - ${venueLayoutId}`,
      )
    }
  }

  useEffect(() => {
    if (typeof setMapState !== "function") return
    if (!venueLayoutId || !token) {
      setMapState(DEFAULT_MAP_STATE)
    } else if (venueLayoutId !== mapState.layout.venueLayoutId) {
      getSections(venueLayoutId)
    }
  }, [venueLayoutId, token])

  return null
}

export default MapStateMonitor
