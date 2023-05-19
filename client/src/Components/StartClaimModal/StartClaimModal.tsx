import { Modal } from '@mui/material';
import React, { FunctionComponent, useContext, useState } from 'react';
import ModalContent from './ModalContent';
import {
  IClaim,
  IClaimCreatedResponse,
  INewClaimRequest
} from '../../Models/claim';
import axios from 'axios';
import { ClaimsContext } from '../../Providers/ClaimsProvider';

interface StartClaimModalProps {
  open: boolean;
  onClose?:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  closeModal: () => void;
}
const StartClaimModal = ({
  open,
  // onClose,
  closeModal
}: StartClaimModalProps) => {
  const { setClaims } = useContext(ClaimsContext);
  const startNewClaim = async (newClaim: INewClaimRequest) => {
    const response = await axios.post<IClaimCreatedResponse>(
      '/api/claims',
      newClaim
    );

    //TODO: needs to handle error responses
    const createdClaim = response.data;
    const claimListItem: IClaim = {
      ...createdClaim
    };
    setClaims((claims) => {
      return [claimListItem, ...claims];
    });
    return createdClaim;
  };
  const [saving, setSaving] = useState(false);
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
