import { Box, Modal, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
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
  onClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
}
const StartClaimModal: FunctionComponent<StartClaimModalProps> = ({
  open,
  onClose
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent />
    </Modal>
  );
};

export default StartClaimModal;
