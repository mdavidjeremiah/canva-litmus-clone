import { Stage, Layer, Rect, Circle, Text, Image as KonvaImage, Transformer } from "react-konva";
import { useRef, useEffect, useState } from "react";
import { useEditorStore } from "../store/useEditorStore";
import type { Design, DesignElement } from "@canva-clone/shared";
import Konva from "konva";

interface CanvasProps {
  design: Design;
}

export default function Canvas({ design }: CanvasProps) {
  const { elements, selectedElementId, selectElement, updateElement } = useEditorStore();
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    const newImages: Record<string, HTMLImageElement> = {};

    elements.forEach((element) => {
      if (element.type === "image" && element.src && !images[element.id]) {
        const img = new window.Image();
        img.src = element.src;
        img.onload = () => {
          setImages((prev) => ({ ...prev, [element.id]: img }));
        };
      }
    });

    setImages((prev) => ({ ...prev, ...newImages }));
  }, [elements]);

  useEffect(() => {
    if (transformerRef.current) {
      const selectedNode = elements.find((el) => el.id === selectedElementId);
      if (selectedNode) {
        const stage = transformerRef.current.getStage();
        if (stage) {
          const node = stage.findOne(`#${selectedElementId}`);
          if (node) {
            transformerRef.current.nodes([node]);
          } else {
            transformerRef.current.nodes([]);
          }
        }
      } else {
        transformerRef.current.nodes([]);
      }
    }
  }, [selectedElementId, elements]);

  const renderElement = (element: DesignElement) => {
    const commonProps = {
      id: element.id,
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height,
      rotation: element.rotation,
      opacity: element.opacity,
      draggable: !element.locked,
      visible: element.visible,
      onClick: () => selectElement(element.id),
      onTap: () => selectElement(element.id),
      onDragEnd: (e: any) => {
        updateElement(element.id, {
          x: e.target.x(),
          y: e.target.y(),
        });
      },
      onTransformEnd: (e: any) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        updateElement(element.id, {
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
          rotation: node.rotation(),
        });
        node.scaleX(1);
        node.scaleY(1);
      },
    };

    switch (element.type) {
      case "rectangle":
        return (
          <Rect
            {...commonProps}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            cornerRadius={element.cornerRadius}
          />
        );
      case "circle":
        return (
          <Circle
            {...commonProps}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
          />
        );
      case "triangle":
        return (
          <Rect
            {...commonProps}
            fill={element.fill}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            width={element.width}
            height={element.height}
            rotation={element.rotation}
            transform={[
              `rotate(${element.rotation}, ${element.x + element.width / 2}, ${element.y + element.height / 2})`,
            ]}
          />
        );
      case "text":
        return (
          <Text
            {...commonProps}
            text={element.text}
            fontSize={element.fontSize}
            fontFamily={element.fontFamily}
            fontStyle={`${element.fontStyle} ${element.fontWeight}`.trim()}
            fill={element.fill}
            align={element.align}
            lineHeight={element.lineHeight}
            width={element.width}
            height={element.height}
            onDblClick={() => {
              const newText = prompt("Edit text:", element.text);
              if (newText !== null) {
                updateElement(element.id, { text: newText });
              }
            }}
          />
        );
      case "image":
        const img = images[element.id];
        return img ? (
          <KonvaImage
            {...commonProps}
            image={img}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-gray-700 flex items-center justify-center overflow-auto">
      <Stage
        width={design.width}
        height={design.height}
        onClick={(e) => {
          if (e.target === e.target.getStage()) {
            selectElement(null);
          }
        }}
        onTap={(e) => {
          if (e.target === e.target.getStage()) {
            selectElement(null);
          }
        }}
      >
        <Layer>
          {elements.map((element) => (
            <div key={element.id}>{renderElement(element)}</div>
          ))}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
}
