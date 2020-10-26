import React from "react";
import { useDimensions } from "./useDimensions";
import { Canvas } from "./Canvas";
import { Hexagon } from "./Hexagon";
import { getHexagonToFillZone } from "./randomHelpers";
import "./styles.css";

const App = () => {
  const [ref, { width, height, dpr }] = useDimensions();

  return (
    <main ref={ref}>
      {width === undefined || height === undefined || dpr === undefined
        ? (<div>Error Loading Heaxgonal Background</div>)
        : (
          <Canvas width={width} height={height} dpr={dpr}>
            {getHexagonToFillZone({
              height: height * dpr,
              width: width * dpr
            }).map((hex, idx) => (
              <Hexagon key={idx} {...hex} />
            ))}
          </Canvas>
        )}
    </main>
  );
};

export default App;