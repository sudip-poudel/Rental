import { canvasPreview } from "@/utils/canvasPreview";
import { useDebounceEffect } from "@/utils/useDebounceEffect";
import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { Button } from "./ui/button";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function AvatarImageCrop() {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const aspect: number | undefined = 1 / 1;

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current &&
        previewImgRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          previewImgRef.current,
          completedCrop
        );
      }
    },
    100,
    [completedCrop]
  );

  return (
    <div className="App flex flex-col">
      <div className="Crop-Controls">
        {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}

        <div className="flex flex-col ">
          <input
            type="file"
            id="upload-image"
            data-tile="Upload Image"
            className="hidden"
            onChange={onSelectFile}
          />
          <div className="relative w-48 h-48">
            <label
              htmlFor="upload-image"
              className="cursor-pointer w-full h-full flex justify-center items-center group"
            >
              <img
                ref={previewImgRef}
                src="images/blobpic1.png"
                alt="userimage"
                className="absolute top-0 left-0 w-full h-full object-fill rounded-full bg-black"
              />
              <div className="absolute inset-0 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white">
                Change Avatar
              </div>
            </label>
          </div>
          <Button type="button" className="mt-4">
            <label htmlFor="upload-image" className="p-0 m-0">
              Choose New Avatar
            </label>
          </Button>
        </div>
      </div>
      {!!imgSrc && (
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold my-1">
            Crop the photo as you need:
          </h1>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            // minWidth={400}
            minHeight={100}
            // circularCrop
            className="mt-2"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              className="object-fill w-96 "
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <Button>Save Avatar</Button>
        </div>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas ref={previewCanvasRef} className="hidden" />
          </div>
        </>
      )}
    </div>
  );
}
