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
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-[95vw]"
      data-testid="control-bar"
    >
      <div className="bg-card/95 backdrop-blur-sm border border-card-border rounded-lg shadow-lg p-2 sm:p-3">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                console.log('Undo clicked');
                onUndo();
              }}
              disabled={!canUndo}
              data-testid="button-undo"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <Undo2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <Redo2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          <div className="w-px h-6 sm:h-8 bg-border" />

          <Button
            size="sm"
            variant="default"
            onClick={() => {
              console.log('Save clicked');
              onSave();
            }}
            data-testid="button-save"
            className="h-8 sm:h-9"
          >
            <Save className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Save</span>
          </Button>

          <div className="w-px h-6 sm:h-8 bg-border" />

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                console.log('Rotate clicked');
                onRotate();
              }}
              disabled={!hasSelection}
              data-testid="button-rotate"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <RotateCw className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>

            <Button
              size="icon"
              variant={gridSnap ? 'default' : 'outline'}
              onClick={() => {
                console.log('Toggle grid clicked');
                onToggleGrid();
              }}
              data-testid="button-grid"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <Grid3x3 className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                console.log('Toggle sound clicked');
                onToggleSound();
              }}
              data-testid="button-sound"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              {soundEnabled ? (
                <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </Button>
          </div>

          <div className="w-px h-6 sm:h-8 bg-border" />

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
            className="h-8 sm:h-9"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
