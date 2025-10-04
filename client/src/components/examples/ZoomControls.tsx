import { useState } from 'react';
import ZoomControls from '../ZoomControls';

export default function ZoomControlsExample() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="h-screen bg-background relative">
      <ZoomControls
        zoom={zoom}
        onZoomIn={() => setZoom(Math.min(1.5, zoom + 0.1))}
        onZoomOut={() => setZoom(Math.max(0.5, zoom - 0.1))}
        onResetZoom={() => setZoom(1)}
      />
    </div>
  );
}
