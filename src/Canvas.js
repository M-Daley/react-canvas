import * as React from 'react';

// Context to be passed to "<Hexagon />" component so it may draw itself.
const CanvasContext = React.createContext(null);

export const Canvas = ({ height, width, dpr, isAnimating, children }) => {
  const canvasRef = React.useRef(null);
  const actualWidth = width * dpr;
  const actualHeight = height * dpr;
  
  // The context canvas is stored once it is created
  const [context, setContext] = React.useState(null);

  React.useEffect(() => {
    if (canvasRef.current !== null) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext !== null) {
        canvasContext.scale(dpr, dpr);
        canvasContext.globalCompositeOperation = "soft-light";
        setContext(canvasContext)
      }
    }
  }, [dpr]);

  // Clearing the canvas before drawing
  if (context !== null) {
    context.clearRect(0, 0, actualWidth, actualHeight);
  }

  return (
    <CanvasContext.Provider value={context}>
      <canvas
        ref={canvasRef}
        height={actualHeight}
        width={actualWidth}
        style={{ width, height }}
      />
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
    const renderingContext = React.useContext(CanvasContext);
    return renderingContext
}