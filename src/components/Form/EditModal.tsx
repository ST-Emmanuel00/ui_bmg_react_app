import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Modal from "../common/Modal";
import { Form } from "./Form";
import { Input } from "../Input/Input";
import DatePicker from "react-datepicker";
import { ApiResponse } from "../../types";
import { AxiosError } from "axios";
import { useAxios } from "../../Hooks"; // Adjust the path as needed

interface EditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  entity: T | null;
  fields: { name: keyof T; label: string; type: string; options?: string[] }[];
  onSubmit: (updatedEntity: T) => void;
  response: ApiResponse | null;
  hasError: AxiosError | null;
  isLoading: boolean;
  title: string;
  message: string;
  endpoint: string; // The endpoint to use for the update
}

interface FormData {
  [key: string]: any;
}

export const EditModal = <T,>({
  isOpen,
  onClose,
  entity,
  fields,
  onSubmit,
  response,
  hasError,
  isLoading,
  title,
  message,
  endpoint,
}: EditModalProps<T>) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const { put } = useAxios(); // Use the custom hook

  const [formData, setFormData] = useState<Partial<T>>({});
  const [date, setDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (entity) {
      setFormData(entity);
      fields.forEach(({ name, type }) => {
        if (type === "date" && entity[name]) {
          setDate(new Date(entity[name] as unknown as string));
        }
        if (type === "select" && entity[name]) {
          setStatus(entity[name] as unknown as string);
        }
        setValue(name as string, entity[name]);
      });
    }
  }, [entity, fields, setValue]);

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    setValue("birthday", date);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setValue("status", e.target.value);
  };

  const handleSubmitForm: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Form data submitted:", data); // Log form data
      await put(`${endpoint}/${(entity as any).id}`, data); // Assuming entity has _id
      onSubmit(data as T);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="flex justify-center items-center h-full"
        onClick={handleModalClick}
      >
        <Form
          title={title}
          message={message}
          onSubmit={handleSubmit(handleSubmitForm)}
          className="bg-white dark:bg-gray-800 max-w-3xl mx-auto rounded-lg overflow-hidden px-6 py-8 space-y-4"
          btnreturn={() => onClose()}
          response={response}
          hasError={hasError}
          isLoading={isLoading}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fields.map(({ name, label, type, options }) => (
              <div key={name as string} className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  {label}:
                </label>
                {type === "date" ? (
                  <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <Input
                    id={""}
                    placeholder={label}
                    type={type}
                    response={response}
                    hasError={hasError}
                    options={options}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={false}
                    required={true}
                    readonly={false}
                    register={register(name as string)}
                  />
                )}
              </div>
            ))}
          </div>
        </Form>
      </div>
    </Modal>
  );
};
