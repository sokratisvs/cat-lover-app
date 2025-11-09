import { useState } from 'react';
import { Modal } from '@shared/components';

const BreedModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        hasCloseBtn={true}
      >
        <h1>Hello World</h1>
      </Modal>
    </div>
  );
};

export default BreedModal;
