import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './dialog';

describe('Dialog', () => {
  it('renders trigger without crashing', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens dialog on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>My Dialog</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('My Dialog')).toBeInTheDocument();
  });

  it('dialog content has data-slot attribute', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByRole('dialog')).toHaveAttribute('data-slot', 'dialog-content');
  });
});
