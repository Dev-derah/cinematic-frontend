import { Prompt } from "@/lib/types/recommendations";
import React, { useState } from "react";



export const useModalWithResult = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Prompt | null>(null);

  const showModalWithResult = (data: Prompt) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return { isModalOpen, modalData, showModalWithResult, closeModal };
};
