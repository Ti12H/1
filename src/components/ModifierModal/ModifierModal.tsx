import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ModifierForm from './ModifierForm';
import { ModifierModalPropTypes, ModifierFormValuesTypes } from './ModifierModalTypes';

function ModifierModal({
	closeModifierModal,
	requestRoll,
	showModal,
	diceSelected
}: ModifierModalPropTypes
) {
	const formName = 'modifier-form';

	const handleSubmit = (values: ModifierFormValuesTypes) => {
		const { diceType, diceAmount } = diceSelected;
		const modifier = values.modifier ? Number(values.modifier) : 0;

		requestRoll({
			diceType,
			diceAmount,
			modifier
		});

		closeModifierModal();
	};

	return (
		<Modal show={showModal} onHide={closeModifierModal}>
			<Modal.Header closeButton>
				<Modal.Title>Add Modifier</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ModifierForm
					/* @ts-ignore */
					onSubmit={(values: ModifierFormValuesTypes) => handleSubmit(values)}
					formName={formName}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModifierModal}>
					Cancel
				</Button>
				<Button variant="success" type="submit" form={formName}>
					Roll!
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModifierModal;
