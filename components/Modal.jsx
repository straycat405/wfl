import Modal from 'react-modal';

export default function TestModal( { isOpen, modalContent, onClick}) {

    return(
        <>
                <Modal isOpen={isOpen}>
                    <div className="w-50">
                    {modalContent}
                    <button onClick={onClick}> Close </button>
                    </div>
                </Modal>
        </>
    );
}