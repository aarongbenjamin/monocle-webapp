import { Box, Modal, Typography } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import ModalContent from './ModalContent';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};
interface StartClaimModalProps {
  open: boolean;
  onClose?:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  closeModal: () => void;
}
const StartClaimModal: FunctionComponent<StartClaimModalProps> = ({
  open,
  // onClose,
  closeModal
}) => {
  const startNewClaim = async () => {
    const waitFor = (delay: number) =>
      new Promise((resolve) => setTimeout(resolve, delay));

    await waitFor(1000);
    return 'Yay';
  };
  const [saving, setSaving] = useState(false);
  const handleSave = async (newClaim: any) => {
    setSaving(true);
    await startNewClaim();
    setSaving(false);
    closeModal();
  };
  return (
    <Modal
      open={open}
      // onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent saving={saving} save={handleSave} />
    </Modal>
  );
};

export default StartClaimModal;
