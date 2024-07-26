import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { RiFileCopy2Line } from "react-icons/ri";
import { toast } from "sonner";
import { Button } from "src/components/ui/button";
import {
    currentTestSpecExecutionPageURLAtom,
    currentTestSpecExecutionScreenshotAtom,
} from "src/store/test-specs/steps";

const PreviewWindow = () => {
    const [currentTestSpecExecutionScreenshot] = useAtom(
        currentTestSpecExecutionScreenshotAtom,
    );
    const [currentTestSpecExecutionPageURL] = useAtom(
        currentTestSpecExecutionPageURLAtom,
    );

    return (
        <div className="flex flex-1 flex-col h-full grow rounded-lg shadow ring-1 dark:ring-zinc-950/4 ring-zinc-200 bg-zinc-50 dark:bg-zinc-950 dark:ring-white/5 dark:text-zinc-300 overflow-y-scroll">
            <div className="flex items-center p-2 border-b ">
                <div className="flex-1">
                    <div className="flex gap-2 px-2">
                        <span className="bg-red-500 h-3 w-3 rounded-md"></span>
                        <span className="bg-yellow-500 h-3 w-3 rounded-md"></span>
                        <span className="bg-green-500 h-3 w-3 rounded-md"></span>
                    </div>
                </div>

                <div className="flex flex-1 gap-1 items-center justify-center">
                    <div className="rounded-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 px-8 py-1.5 w-80">
                        <span className="text-xs dark:text-zinc-300 truncate">
                            {currentTestSpecExecutionPageURL}
                        </span>
                    </div>
                    <div>
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className="rounded-full w-6 h-6"
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    currentTestSpecExecutionPageURL,
                                );
                                toast("Current page url copied to clipboard", {
                                    dismissible: true,
                                    closeButton: true,
                                });
                            }}
                        >
                            <RiFileCopy2Line />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-1"></div>
            </div>
            <div className="lex flex-1 bg-zinc-100 dark:bg-zinc-300 w-full h-full bg-cover overflow-y-scroll p-1">
                {currentTestSpecExecutionScreenshot && (
                    <StreamedImage
                        imageData={currentTestSpecExecutionScreenshot}
                    />
                )}
            </div>
        </div>
    );
};

export default PreviewWindow;

const StreamedImage: React.FC<{ imageData: string }> = ({ imageData }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRefs = useRef<
        [HTMLCanvasElement | null, HTMLCanvasElement | null]
    >([null, null]);
    const currentCanvasIndex = useRef(0);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const lastDrawnImageData = useRef<string | null>(null);

    const getPixelRatio = (context: any) => {
        const backingStore =
            context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            1;

        return (window.devicePixelRatio || 1) / backingStore;
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                setDimensions({ width, height: (width * 9) / 16 });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (imageData === lastDrawnImageData.current) return;

        const img = new Image();
        img.onload = () => {
            const nextCanvasIndex = 1 - currentCanvasIndex.current;
            const canvas = canvasRefs.current[nextCanvasIndex];
            if (!canvas) return;

            const ctx = canvas.getContext("2d", { alpha: false });
            if (!ctx) return;

            const pixelRatio = getPixelRatio(ctx);
            const { width, height } = dimensions;

            canvas.width = width * pixelRatio;
            canvas.height = height * pixelRatio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, width, height);

            const scale = Math.min(width / img.width, height / img.height);
            const x = (width - img.width * scale) / 2;
            const y = (height - img.height * scale) / 2;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            // Swap canvases
            canvasRefs.current[currentCanvasIndex.current]!.style.display =
                "none";
            canvas.style.display = "block";
            currentCanvasIndex.current = nextCanvasIndex;

            lastDrawnImageData.current = imageData;
        };
        img.src = `data:image/jpeg;base64,${imageData}`;
    }, [imageData, dimensions]);

    return (
        <div
            ref={containerRef}
            className="w-full relative"
            style={{ aspectRatio: "16/9" }}
        >
            {[0, 1].map((index) => (
                <canvas
                    key={index}
                    ref={(el) => (canvasRefs.current[index] = el)}
                    className="absolute top-0 left-0 border border-zinc-200 dark:border-zinc-800 rounded-lg"
                    style={{
                        display:
                            index === currentCanvasIndex.current
                                ? "block"
                                : "none",
                        width: "100%",
                        height: "100%",
                    }}
                />
            ))}
        </div>
    );
};
