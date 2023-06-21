import React, { useState } from 'react'
import { Modal } from 'antd'

const ModalCampaign = (props) => {
    const { isModalOpen, setIsModalOpen } = props

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Modal
                title="Basic Modal"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                body
            </Modal>
        </>
    )
}

export default ModalCampaign