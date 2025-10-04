import { useState } from 'react';
import ControlBar from '../ControlBar';

export default function ControlBarExample() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hasSelection, setHasSelection] = useState(true);

  return (
    <div className="h-screen flex items-end justify-center bg-background p-8">
      <ControlBar 
        onSave={() => console.log('Save')}
        onClear={() => console.log('Clear')}
        onRotate={() => console.log('Rotate')}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        hasSelection={hasSelection}
      />
    </div>
  );
}
