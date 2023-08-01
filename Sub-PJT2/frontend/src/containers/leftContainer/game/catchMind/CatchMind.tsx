import * as S from "./CatchMind.styled";
import { useRef, useState, useCallback, useEffect } from "react";
import { InGameChatStatus } from "atoms/atoms";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import { themeProps } from "@emotion/react";
import { useTheme } from "@mui/material";

interface Coordinate {
  x: number;
  y: number;
}

const CatchMind = () => {
  const theme: themeProps = useTheme();

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

  const [fillColor, setFillColor] = useState({
    backgroundColor: "",
    color: "",
  });

  const handleColorClick = (e: any) => {
    setColor(e.target.innerText);
    if (
      e.target.innerText === "black" ||
      e.target.innerText === "blue" ||
      e.target.innerText === "navy"
    ) {
      setFillColor({ backgroundColor: e.target.innerText, color: "white" });
    } else {
      setFillColor({ backgroundColor: e.target.innerText, color: "black" });
    }
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
          <S.CanvasBox theme={theme}>
            <S.Canvas
              ref={canvasRef}
              width="800"
              height="600"
              theme={theme}
            ></S.Canvas>
            <S.PaletteBody theme={theme}>
              <S.Palette>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  black
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "white" }}
                >
                  white
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleClear}
                  style={{ backgroundColor: "white" }}
                >
                  clear
                </S.PaletteColor>
                <S.PaletteColor onClick={handleFill} style={fillColor}>
                  fill
                </S.PaletteColor>
              </S.Palette>
              <S.Palette>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "red" }}
                >
                  red
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "orange" }}
                >
                  orange
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "yellow" }}
                >
                  yellow
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "green" }}
                >
                  green
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "blue" }}
                >
                  blue
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "navy" }}
                >
                  navy
                </S.PaletteColor>
                <S.PaletteColor
                  onClick={handleColorClick}
                  style={{ backgroundColor: "purple" }}
                >
                  purple
                </S.PaletteColor>
              </S.Palette>
            </S.PaletteBody>
          </S.CanvasBox>
          {/* 사람 영상 뜰 자리 */}
          <S.PlayerVidBundle>
            <S.PlayerVid></S.PlayerVid>
            <S.PlayerVid></S.PlayerVid>
            <S.PlayerVid></S.PlayerVid>
          </S.PlayerVidBundle>
        </S.Body>
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
