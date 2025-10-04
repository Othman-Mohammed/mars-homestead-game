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
      className="absolute top-6 right-6 z-20 bg-card/95 backdrop-blur-sm border border-card-border rounded-lg shadow-lg p-2"
      data-testid="zoom-controls"
    >
      <div className="flex flex-col gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            console.log('Zoom in');
            onZoomIn();
          }}
          disabled={zoom >= 1.5}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>

        <div className="text-xs font-mono text-center py-1 text-muted-foreground">
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
        >
          <ZoomOut className="w-4 h-4" />
        </Button>

        <div className="w-full h-px bg-border my-1" />

        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            console.log('Reset zoom');
            onResetZoom();
          }}
          data-testid="button-reset-zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
