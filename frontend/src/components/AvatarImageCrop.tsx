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
import { useUpdateUserAvatar } from "@/api/userQueriesAndMutation";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

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

export default function AvatarImageCrop({
  userProfileUrl,
}: {
  userProfileUrl: string;
}) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const aspect: number | undefined = 1 / 1;

  const { toast } = useToast();

  const { mutate: updateUserAvatar, isPending } = useUpdateUserAvatar();

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
          completedCrop,
          setImgFile
        );
      }
    },
    100,
    [completedCrop]
  );

  return (
    <div className="App flex flex-col">
      <Toaster />
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
                src={userProfileUrl}
                alt="userimage"
                className="absolute top-0 left-0 w-full h-full object-fill rounded-full bg-black"
              />
              <div className="absolute inset-0 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 text-white">
                Change Avatar
              </div>
            </label>
          </div>
          <Button type="button" className="mt-4 p-0">
            <label
              htmlFor="upload-image"
              className="p-0 m-0 w-full h-full cursor-pointer text-center flex items-center justify-center"
            >
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
          <Button
            type="button"
            disabled={isPending}
            className="disabled:bg-opacity-50"
            onClick={(e) => {
              e.preventDefault();
              console.log(imgFile);

              if (!completedCrop || !imgRef.current || !imgFile) {
                return;
              }
              updateUserAvatar(imgFile as File, {
                onSuccess: () => {
                  toast({ title: "Avatar updated successfully" });
                  setCrop(undefined);
                  setCompletedCrop(undefined);
                  setImgSrc("");
                  setImgFile(null);
                },
                onError: (error) => {
                  toast({
                    title: "Avatar update failed",
                    description: error.message,
                  });
                },
              });
            }}
          >
            Save Avatar
          </Button>
        </div>
      )}
      {!!completedCrop && <canvas ref={previewCanvasRef} className="hidden" />}
    </div>
  );
}
