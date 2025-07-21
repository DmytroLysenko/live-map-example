import React, { useContext } from "react"

import { MapStateContext, SetMapStateContext } from "../../state"

import { IMapProps } from "../../types"

interface IProps {
  levelWrapperClassName: string | undefined
  onLevelChange: IMapProps["onLevelChange"]
}

const LevelSelection = ({ levelWrapperClassName, onLevelChange }: IProps) => {
  const {
    settings: { level },
  } = useContext(MapStateContext)
  const setMapState = useContext(SetMapStateContext)
  return (
    <div className={levelWrapperClassName}>
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (typeof setMapState === "function") {
            const newLevel = level === "row" ? "section" : "row"
            setMapState((prev) => ({
              ...prev,
              settings: {
                ...prev.settings,
                level: newLevel,
              },
            }))
            if (typeof onLevelChange === "function") {
              onLevelChange(newLevel)
            }
          }
        }}
      >
        {level === "row" ? "Sections" : "Rows"}
      </button>
    </div>
  )
}

export default LevelSelection
