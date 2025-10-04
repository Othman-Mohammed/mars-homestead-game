import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ open, onClose }: WelcomeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl" data-testid="welcome-modal">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-3xl font-heading">
              Welcome to Mars Habitat Builder
            </DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Design and build your own sustainable Mars base! Place habitat modules strategically
            to maintain a healthy balance of oxygen, power, water, and food for your colony.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-foreground text-sm">How to Play:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Select an item from the inventory panel</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Click on the Mars surface to place it</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Drag items to reposition them</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Select an item and press R to rotate or Delete to remove</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">5.</span>
                <span>Watch your resources - keep them balanced!</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            Your progress is automatically saved. Have fun building your Mars habitat!
          </p>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            size="lg"
            onClick={onClose}
            data-testid="button-start-building"
          >
            Start Building
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
