import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export default function ZoomControls({ zoom, onZoomIn, onZoomOut, onResetZoom }: ZoomControlsProps) {
  return (
    <div 
      className="fixed top-4 right-4 lg:top-6 lg:right-6 z-20 bg-card/95 backdrop-blur-sm border border-card-border rounded-lg shadow-lg p-1.5 sm:p-2"
      data-testid="zoom-controls"
    >
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            console.log('Zoom in');
            onZoomIn();
          }}
          disabled={zoom >= 1.5}
          data-testid="button-zoom-in"
          className="h-7 w-7 sm:h-9 sm:w-9"
        >
          <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <div className="text-[10px] sm:text-xs font-mono text-center py-0.5 sm:py-1 text-muted-foreground">
          {Math.round(zoom * 100)}%
        </div>

        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            console.log('Zoom out');
            onZoomOut();
          }}
          disabled={zoom <= 0.5}
          data-testid="button-zoom-out"
          className="h-7 w-7 sm:h-9 sm:w-9"
        >
          <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <div className="w-full h-px bg-border my-0.5 sm:my-1" />

        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            console.log('Reset zoom');
            onResetZoom();
          }}
          data-testid="button-reset-zoom"
          className="h-7 w-7 sm:h-9 sm:w-9"
        >
          <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
}
