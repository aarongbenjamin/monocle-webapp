import { Modal } from '@mui/material';
import React, { useContext, useState } from 'react';
import ModalContent from './ModalContent';
import { IClaim, INewClaimRequest } from '../../models/claim';
import axios from 'axios';
import { ClaimsContext } from '../../providers/ClaimsProvider';
export enum CloseAction {
  Save,
  Cancel
}
type StartClaimModalProps = {
  open: boolean;
  closeModal: (action: CloseAction, newClaimId: string | undefined) => void;
};
const StartClaimModal = ({ open, closeModal }: StartClaimModalProps) => {
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
  const handleSave = async (newClaimRequest: INewClaimRequest) => {
    setSaving(true);
    const newClaim = await startNewClaim(newClaimRequest);
    setSaving(false);
    closeModal(CloseAction.Save, newClaim._id);
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContent saving={saving} save={handleSave} />
    </Modal>
  );
};

export default StartClaimModal;
