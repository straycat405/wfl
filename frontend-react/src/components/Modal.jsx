import Modal from 'react-modal';

export default function TestModal( { isOpen, modalContent, onClick}) {

    return(
        <>
            <div>
                <Modal isOpen={isOpen}>
                    {modalContent}
                    <button onClick={onClick}> Close </button>
                </Modal>
            </div>
        </>
    );
}