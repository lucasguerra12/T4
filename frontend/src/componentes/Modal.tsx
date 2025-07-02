import FormularioCadastro from './formularioCadastro';

interface ModalProps {
    cliente: any;
    onClose: () => void;
    onSave: () => void;
}

const Modal: React.FC<ModalProps> = ({ cliente, onClose, onSave }) => {
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleBackgroundClick}>
            <div className="modal-content">
                <button onClick={onClose} className="modal-close-button">&times;</button>
                <FormularioCadastro cliente={cliente} onSave={onSave} onClose={onClose} />
            </div>
        </div>
    );
};

export default Modal;