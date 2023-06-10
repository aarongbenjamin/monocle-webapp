import { Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import ModalContent from './ModalContent';
import { IClaim, INewClaimRequest } from '../../Models/claim';
import axios from 'axios';
import { ClaimsContext } from '../../Providers/ClaimsProvider';

type StartClaimModalProps = {
  open: boolean;
  onClose?:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  closeModal: () => void;
};
const StartClaimModal = ({
  open,
  // onClose,
  closeModal
}: StartClaimModalProps) => {
  const { setClaims } = useContext(ClaimsContext);
  const [saving, setSaving] = useState(false);

  const startNewClaim = async (newClaim: INewClaimRequest) => {
    const response = await axios.post<IClaim>('/api/claims', newClaim);

    //TODO: needs to handle error responses
    const createdClaim = response.data;
    setClaims((claims) => {
      return [createdClaim, ...claims];
    });
    return createdClaim;
  };
  const handleSave = async (newClaim: INewClaimRequest) => {
    setSaving(true);
    await startNewClaim(newClaim);
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
