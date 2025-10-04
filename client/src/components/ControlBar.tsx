import { Button } from '@/components/ui/button';
import { Save, RotateCw, Trash2, Volume2, VolumeX, Undo2, Redo2, Grid3x3 } from 'lucide-react';

interface ControlBarProps {
  onSave: () => void;
  onClear: () => void;
  onRotate: () => void;
  onUndo: () => void;
  onRedo: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  gridSnap: boolean;
  onToggleGrid: () => void;
  hasSelection: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export default function ControlBar({ 
  onSave, 
  onClear, 
  onRotate,
  onUndo,
  onRedo,
  soundEnabled, 
  onToggleSound,
  gridSnap,
  onToggleGrid,
  hasSelection,
  canUndo,
  canRedo,
}: ControlBarProps) {
  return (
    <div 
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      data-testid="control-bar"
    >
      <div className="bg-card/95 backdrop-blur-sm border border-card-border rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              console.log('Undo clicked');
              onUndo();
            }}
            disabled={!canUndo}
            data-testid="button-undo"
          >
            <Undo2 className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              console.log('Redo clicked');
              onRedo();
            }}
            disabled={!canRedo}
            data-testid="button-redo"
          >
            <Redo2 className="w-4 h-4" />
          </Button>

          <div className="w-px h-8 bg-border" />

          <Button
            size="sm"
            variant="default"
            onClick={() => {
              console.log('Save clicked');
              onSave();
            }}
            data-testid="button-save"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>

          <div className="w-px h-8 bg-border" />

          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              console.log('Rotate clicked');
              onRotate();
            }}
            disabled={!hasSelection}
            data-testid="button-rotate"
          >
            <RotateCw className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant={gridSnap ? 'default' : 'outline'}
            onClick={() => {
              console.log('Toggle grid clicked');
              onToggleGrid();
            }}
            data-testid="button-grid"
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              console.log('Toggle sound clicked');
              onToggleSound();
            }}
            data-testid="button-sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>

          <div className="w-px h-8 bg-border" />

          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              console.log('Clear all clicked');
              if (confirm('Clear all placed items? This cannot be undone.')) {
                onClear();
              }
            }}
            data-testid="button-clear"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
