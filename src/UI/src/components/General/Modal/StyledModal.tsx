import { Box, Modal } from '@mui/material';
import React from 'react';
export type StyledModalProps = {
  open: boolean;
  children: React.ReactNode;
  enableBackdrop?: boolean;
};
const StyledModal: React.FC<StyledModalProps> = ({
  open,
  children,
  enableBackdrop
}) => {
  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: {
          sx: {
            pointerEvents: enableBackdrop ? 'auto' : 'none'
          }
        }
      }}
      sx={{
        display: 'flex',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      }}
    >
      <Box bgcolor="white" m={3} p={3} borderRadius={3} maxWidth={400}>
        {children}
      </Box>
    </Modal>
  );
};

export default StyledModal;
