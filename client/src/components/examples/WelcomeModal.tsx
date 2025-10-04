import { useState } from 'react';
import WelcomeModal from '../WelcomeModal';
import { Button } from '@/components/ui/button';

export default function WelcomeModalExample() {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <Button onClick={() => setOpen(true)}>Show Welcome Modal</Button>
      <WelcomeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
