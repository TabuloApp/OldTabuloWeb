import React, { useContext, useState, useEffect } from "react";
import { CompactPicker as SketchPicker } from "react-color";
import SocketContext from "../contexts/socket";
import CanvasContext from "../contexts/canvas";
import { canvasRef } from "./TheDrawingCanvas";
import { Button } from "@material-ui/core";

export default function TheSidebarColorPicker() {
  const { lineColorRef } = useContext(CanvasContext);
  const { socket } = useContext(SocketContext);

  const [lineColor, setColor] = useState(lineColorRef.current);

  useEffect(() => {
    lineColorRef.current = lineColor;
  });

  function setLineColor(lineColor) {
    setColor(lineColor);
    canvasRef.current.getContext("2d").strokeStyle = lineColor;
    socket.emit("setColor", lineColor);
  }

  return (
    <div>
    <SketchPicker
      color={lineColor}
      onChangeComplete={(e) => setLineColor(e.hex)}
    />
    <label htmlFor="fileItem" style={{ display: "flex", flexGrow: 1, margin: 10 }}>
          <Button
            onClick={(e) => setLineColor("#000000")}
            variant="contained"
            color="secondary"
            style={{ flexGrow: 1, margin: 10 }}
          >
            Erase
          </Button>
        </label>
        </div>
  );
}
