import * as S from "./CatchMind.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import { InGameChatStatus } from "atoms/atoms";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

interface Coordinate {
  x: number;
  y: number;
}

const CatchMind = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("black");
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );
  const [isPainting, setIsPainting] = useState(false);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      context.strokeStyle = color;
      context.lineJoin = "round";
      context.lineWidth = 3;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener("mousedown", startPaint);
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);

    return () => {
      canvas.removeEventListener("mousedown", startPaint);
      canvas.removeEventListener("mousemove", paint);
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  const handleColorClick = (e: any) => {
    setColor(e.target.innerText);
  };

  const handleClear = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, 800, 600);
  };

  const handleFill = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    context.fillStyle = color;
    context?.fillRect(0, 0, 800, 600);
  };

  const [hoverStyle, setHoverStyle] = useState({ cursor: "" });

  const handleHover = (e: any) => {
    setHoverStyle({ cursor: "pointer" });
    console.log(e.target.style = 'border: solid black 2px');
  };

  return (
    <Container>
      <S.Container>
        <S.Body>
          {/* 사람 영상 뜰 자리 */}
          <S.PlayerVidBundle>
            <S.PlayerVid></S.PlayerVid>
            <S.PlayerVid></S.PlayerVid>
            <S.PlayerVid></S.PlayerVid>
          </S.PlayerVidBundle>
          {/* 그림판 */}
          <S.Canvas
            ref={canvasRef}
            style={hoverStyle}
            onMouseOver={handleHover}
            width="700"
            height="600"
          ></S.Canvas>
          {/* 사람 영상 뜰 자리 */}
          <S.PlayerVidBundle>
            <S.PlayerVid></S.PlayerVid>
            <S.PlayerVid></S.PlayerVid>
            <S.PlayerVid></S.PlayerVid>
          </S.PlayerVidBundle>
        </S.Body>
        <S.Palette>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={(e) => handleHover(e)}
          >
            red
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            orange
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            yellow
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            green
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            blue
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            navy
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            purple
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            black
          </S.PaletteColor>
          <S.PaletteColor
            onClick={(e) => handleColorClick(e)}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            white
          </S.PaletteColor>
          <S.PaletteColor
            onClick={handleClear}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            clear
          </S.PaletteColor>
          <S.PaletteColor
            onClick={handleFill}
            style={hoverStyle}
            onMouseOver={handleHover}
          >
            fill
          </S.PaletteColor>
        </S.Palette>
      </S.Container>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export default CatchMind;
