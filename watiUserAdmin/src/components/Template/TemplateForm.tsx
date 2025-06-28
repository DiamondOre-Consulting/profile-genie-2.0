import {
  addTemplateSchema,
  type apiRes,
  type templateSchema,
} from "@/validations/TemplateValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { SelectNative } from "../ui/select-native";
import { Label } from "../ui/label";
import {
  HEADER_FORMAT,
  TEMPLATE_BODY_BUTTONS,
  WHATSAPP_TEMPLATE_LANGUAGES,
} from "@/constants/template.constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import TemplatePreview from "./TemplatePreview";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import {
  useCreateTemplateMutation,
  useMetaFileUploadMutation,
} from "@/Redux/API/TemplateApi";
import type { z } from "zod";

const defaultValues: z.infer<typeof addTemplateSchema> = {
  name: "",
  category: "MARKETING",
  language: "en_US",
  component: {
    header: {
      type: "HEADER",
      format: "NONE",
      example: {
        header_text: [],
        header_handle: [],
        header_text_named_params: [],
      },
    },
    body: {
      type: "BODY",
      example: {
        body_text: [],
        body_handle: [],
        body_text_named_params: [],
      },
    },
    footer: {
      type: "FOOTER",
      text: "",
    },
    button: {
      type: "BUTTONS",
      buttons: [],
    },
  },
};

const TemplateEditor = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof addTemplateSchema>>({
    resolver: zodResolver(addTemplateSchema),
    defaultValues,
  });

  console.log("");

  const {
    fields: buttonFields,
    append: buttonAppend,
    remove: buttonRemove,
  } = useFieldArray({
    control,
    name: "component.button.buttons",
  });

  const {
    fields: bodySampleFields,
    append: bodySampleAppend,
    remove: bodySampleRemove,
  } = useFieldArray({
    control,
    name: "component.body.example.body_text_named_params",
  });

  console.log(watch());

  const [metaFileUpload] = useMetaFileUploadMutation();
  const [createTemplate] = useCreateTemplateMutation();

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      const response = await metaFileUpload(formData);

      if (response?.data?.success) {
        setIsUploading(false);
        setValue(
          "component.header.media_url",
          response?.data?.data?.media_url ?? ""
        );
        setValue(
          "component.header.media_id",
          response?.data?.data?.media_id ?? ""
        );
        setValue("component.header.example.header_handle", [
          response?.data?.data?.meta_upload_id ?? "",
        ]);
      }
    }
  };

  useEffect(() => {
    const curlyMatches =
      watch("component.body.text")?.match(/\{\{(.*?)\}\}/g) || [];
    const variableNames = Array.from(
      new Set(curlyMatches.map((v) => v.slice(2, -2)))
    );
    bodySampleFields.forEach((field, idx) => {
      if (!variableNames.includes(field.param_name ?? "")) {
        bodySampleRemove(idx);
      }
    });
    variableNames.forEach((v) => {
      if (!bodySampleFields.some((f) => f.param_name === v)) {
        bodySampleAppend({ param_name: v, example: "" });
      }
    });
    setValue(
      "component.body.example.body_text_named_params",
      variableNames.map((v) => {
        const existing = bodySampleFields.find((f) => f.param_name === v);
        return existing
          ? { param_name: v, example: existing.example }
          : { param_name: v, example: "" };
      })
    );
  }, [watch("component.body.text")]);

  const bodyText = watch("component.body.text") ?? "";

  const formatSelection = (format: string) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = bodyText.substring(startPos, endPos);

    let newText = bodyText.substring(0, startPos);

    if (selectedText) {
      newText += `${format}${selectedText}${format}`;
    } else {
      newText += `${format}${format}`;
    }

    newText += bodyText.substring(endPos);

    setValue("component.body.text", newText);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = startPos + format.length;
        textareaRef.current.selectionEnd =
          startPos + format.length + (selectedText ? selectedText.length : 0);
        textareaRef.current.focus();
      }
    }, 0);
  };

  const insertVariable = (varNum: number) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const newText =
      bodyText.substring(0, startPos) +
      `{{${varNum}}}` +
      bodyText.substring(endPos);

    setValue("component.body.text", newText);

    // Move cursor after the variable
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = startPos + `{{${varNum}}}`.length;
        textareaRef.current.selectionEnd = startPos + `{{${varNum}}}`.length;
        textareaRef.current.focus();
      }
    }, 0);
  };

  const insertEmoji = (emoji: any) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const newText =
      bodyText.substring(0, startPos) +
      emoji.emoji +
      bodyText.substring(endPos);

    setValue("component.body.text", newText);

    setShowEmojiPicker(false);

    // Move cursor after the emoji
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = startPos + emoji.emoji.length;
        textareaRef.current.selectionEnd = startPos + emoji.emoji.length;
        textareaRef.current.focus();
      }
    }, 0);
  };

  // Ensure "COPY_CODE" button text is always set correctly
  useEffect(() => {
    buttonFields.forEach((button, idx) => {
      const buttonType = watch(`component.button.buttons.${idx}.type`);
      if (buttonType === "COPY_CODE") {
        setValue(`component.button.buttons.${idx}.text`, "Copy offer code");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonFields, watch("component.button.buttons"), setValue]);

  console.log(errors);

  const onSubmit = async (data: templateSchema) => {
    console.log(1);
    console.log(errors);
    const response = (await createTemplate(data)) as { data: apiRes };

    console.log(response);
  };

  return (
    <div className="flex h-screen gap-6">
      <div className="flex-1 h-full p-6 mb-6 overflow-y-scroll bg-white rounded-md shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid items-start grid-cols-1 gap-4 py-5 border-b sm:grid-cols-3">
            <div className="*:not-first:mt-2">
              <Label>Template name</Label>
              <Input
                {...register("name")}
                className="peer"
                placeholder="Template name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="*:not-first:mt-2">
              <Label>
                Category <span className="text-destructive">*</span>
              </Label>
              <SelectNative {...register("category")}>
                <option value="MARKETING">Marketing</option>
                <option value="UTILITY">Utility</option>
                <option value="AUTHENTICATION">Authentication</option>
              </SelectNative>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="*:not-first:mt-2">
              <Label>
                Language <span className="text-destructive">*</span>
              </Label>
              <SelectNative {...register("language")}>
                {WHATSAPP_TEMPLATE_LANGUAGES?.map((data) => (
                  <option key={data.code} value={data.code}>
                    {data.label}
                  </option>
                ))}
              </SelectNative>
            </div>
          </div>

          <div className="py-4 space-y-4 border-b">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium leading-none text-foreground">
                Header <span className="text-gray-500">(Optional)</span>
              </legend>
              <RadioGroup
                className="flex flex-wrap gap-2"
                value={watch("component.header.format")}
                onValueChange={(value) => {
                  setValue(
                    "component.header.format",
                    value as "NONE" | "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT"
                  );
                }}
              >
                {HEADER_FORMAT.map((item) => (
                  <div
                    key={`${item?.value}-${item.value}`}
                    className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-col items-start gap-4 rounded border p-2 px-4 bg-zinc-100 shadow-xs outline-none"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        id={`${item?.value}-${item.value}`}
                        value={item.value}
                        checked={
                          watch("component.header.format") === item.value
                        }
                        className="after:absolute after:inset-0"
                      />
                      <Label htmlFor={`${item?.value}-${item.value}`}>
                        {item.label}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>
            {watch("component.header.format") === "TEXT" && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Header Text (max 60 chars)
                </label>
                <Input
                  type="text"
                  {...register("component.header.text")}
                  placeholder="Header text"
                  maxLength={60}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {watch("component.header.text")?.length || 0}/60 characters
                </p>
                {errors.component?.header?.text && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.component?.header.text.message}
                  </p>
                )}
              </div>
            )}
            {["IMAGE", "VIDEO", "DOCUMENT"].includes(
              watch("component.header.format") || "NONE"
            ) && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">
                  {watch("component.header.format")} URL or Upload
                </label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="url"
                    value={watch("component.header.media_url") || ""}
                    placeholder={`https://example.com/${watch(
                      "component.header.format"
                    )?.toLowerCase()}`}
                    required
                  />
                  <label className="flex items-center px-3 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200">
                    <FiUpload className="mr-1" />
                    Upload
                    <Input
                      type="file"
                      className="hidden"
                      accept={
                        watch("component.header.format") === "IMAGE"
                          ? "image/*"
                          : watch("component.header.format") === "VIDEO"
                          ? "video/*"
                          : "*"
                      }
                      onChange={handleMediaUpload}
                    />
                  </label>
                </div>
                {isUploading && (
                  <p className="mt-1 text-xs text-gray-500">Uploading...</p>
                )}
                {watch("component.header.media_url") && (
                  <div className="mt-2">
                    {watch("component.header.format") === "IMAGE" ? (
                      <img
                        src={watch("component.header.media_url")}
                        alt="Header preview"
                        className="object-cover w-full h-32 mt-1 rounded-md"
                      />
                    ) : watch("component.header.format") === "VIDEO" ? (
                      <video
                        src={watch("component.header.media_url")}
                        controls
                        className="w-full h-32 mt-1 rounded-md"
                      />
                    ) : (
                      <div className="flex items-center p-2 mt-1 border border-gray-300 rounded-md">
                        <div className="p-2 mr-2 bg-gray-100 rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium truncate">
                            {(watch("component.header.media_url") || "")
                              .split("/")
                              .pop()}
                          </p>
                          <p className="text-xs text-gray-500">Document</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="py-4 space-y-2 border-b">
            <Label className="block text-sm font-medium text-gray-700">
              Message Body <span className="text-destructive">*</span>
            </Label>
            <div className="bg-zinc-100 border-[0.5px] border-gray-200 rounded">
              <div className="flex items-center gap-1 p-0.5 m-1 bg-white rounded">
                {TEMPLATE_BODY_BUTTONS.map((button) => {
                  return (
                    <button
                      key={button.onClickValue}
                      type="button"
                      onClick={
                        button.onClickValue === "emoji"
                          ? () => setShowEmojiPicker(!showEmojiPicker)
                          : () => formatSelection(button.onClickValue)
                      }
                      className="text-lg font-bold text-gray-500 rounded cursor-pointer size-8 bg-zinc-100 hover:bg-gray-200"
                    >
                      {button.label}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => insertVariable(1)}
                  className="px-2 text-xs font-medium text-gray-500 rounded cursor-pointer size-8 bg-zinc-100 hover:bg-gray-200"
                >
                  {"{1}"}
                </button>
                <button
                  type="button"
                  onClick={() => insertVariable(2)}
                  className="px-2 text-xs font-medium text-gray-500 rounded cursor-pointer size-8 bg-zinc-100 hover:bg-gray-200"
                >
                  {"{2}"}
                </button>
                {showEmojiPicker && (
                  <div className="absolute z-10 mt-8">
                    <EmojiPicker
                      onEmojiClick={insertEmoji}
                      width={300}
                      height={350}
                    />
                  </div>
                )}

                <div className="px-2 pb-1 ml-auto text-xs text-right text-gray-500 w-fit">
                  {bodyText.length}/1024
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={watch("component.body.text")}
                onChange={(e) => {
                  setValue("component.body.text", e.target.value);
                }}
                className="w-full h-32 p-2 border-none outline-none"
                placeholder="Type *bold*, _italic_, ~strike~, or {{1}}..."
                maxLength={1024}
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Use {"{{1}}"}, {"{{2}}"} for variables. Format text with *bold*,
              _italic_, or ~strikethrough~
            </p>
          </div>

          {bodySampleFields?.length > 0 && (
            <div className="py-4 space-y-2 border-b">
              {bodySampleFields.map((field, idx) => (
                <div key={idx} className="">
                  <Label className="block text-sm font-medium text-gray-700">
                    Sample Data for {field.param_name}
                  </Label>
                  <Input
                    type="text"
                    {...register(
                      `component.body.example.body_text_named_params.${idx}.example`
                    )}
                    placeholder={`Sample data for ${field.param_name}`}
                  />
                  {errors.component?.body?.example?.body_text_named_params?.[
                    idx
                  ]?.example && (
                    <p className="mt-1 text-sm text-red-500">
                      {
                        errors.component.body.example.body_text_named_params[
                          idx
                        ].example.message
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="py-4 space-y-2 border-b">
            <Label className="block text-sm font-medium text-gray-700">
              Footer Text (Optional, max 60 chars)
            </Label>
            <Input
              type="text"
              {...register("component.footer.text")}
              placeholder="Footer text"
              maxLength={60}
            />
            <p className="mt-1 text-xs text-gray-500">
              {watch("component.footer.text")?.length || 0}/60 characters
            </p>
            {errors.component?.footer?.text && (
              <p className="mt-1 text-sm text-red-500">
                {errors.component.footer.text.message}
              </p>
            )}
          </div>

          <div className="py-4 space-y-2 border-b">
            <Button
              onClick={() => buttonAppend({ type: "QUICK_REPLY", text: "" })}
              variant="outline"
              className="text-green-700 border-green-800 rounded cursor-pointer bg-green-50 aspect-square hover:bg-green-100/70 max-sm:p-0"
            >
              <PlusIcon
                className="opacity-90 sm:-ms-1"
                size={16}
                aria-hidden="true"
              />
              <span className="max-sm:sr-only">Add new</span>
            </Button>
            <div className="space-y-2">
              {buttonFields.map((_, idx) => {
                const buttonType = watch(
                  `component.button.buttons.${idx}.type`
                );
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <SelectNative
                      className="w-40"
                      {...register(`component.button.buttons.${idx}.type`)}
                    >
                      <option value="QUICK_REPLY">Custom</option>
                      <option
                        value="URL"
                        disabled={
                          buttonFields.filter(
                            (_, i) =>
                              watch(`component.button.buttons.${i}.type`) ===
                              "URL"
                          ).length >= 2 &&
                          watch(`component.button.buttons.${idx}.type`) !==
                            "URL"
                        }
                        style={
                          buttonFields.filter(
                            (_, i) =>
                              watch(`component.button.buttons.${i}.type`) ===
                              "URL"
                          ).length >= 2 &&
                          watch(`component.button.buttons.${idx}.type`) !==
                            "URL"
                            ? { pointerEvents: "none", cursor: "not-allowed" }
                            : undefined
                        }
                      >
                        Visit Website
                      </option>
                      <option
                        value="COPY_CODE"
                        disabled={
                          buttonFields.filter(
                            (_, i) =>
                              watch(`component.button.buttons.${i}.type`) ===
                                "COPY_CODE" &&
                              watch(`component.button.buttons.${idx}.type`) !==
                                "COPY_CODE"
                          ).length >= 1
                        }
                        style={
                          buttonFields.filter(
                            (btn, i) =>
                              watch(`component.button.buttons.${i}.type`) ===
                                "COPY_CODE" &&
                              watch(`component.button.buttons.${idx}.type`) !==
                                "COPY_CODE"
                          ).length >= 1
                            ? { pointerEvents: "none", cursor: "not-allowed" }
                            : undefined
                        }
                      >
                        Copy Offer Code
                      </option>
                      <option
                        value="PHONE_NUMBER"
                        disabled={
                          buttonFields.filter(
                            (_, i) =>
                              watch(`component.button.buttons.${i}.type`) ===
                                "PHONE_NUMBER" &&
                              watch(`component.button.buttons.${idx}.type`) !==
                                "PHONE_NUMBER"
                          ).length >= 1
                        }
                        style={
                          buttonFields.filter(
                            (_, i) =>
                              watch(`component.button.buttons.${i}.type`) ===
                                "PHONE_NUMBER" &&
                              watch(`component.button.buttons.${idx}.type`) !==
                                "PHONE_NUMBER"
                          ).length >= 1
                            ? { pointerEvents: "none", cursor: "not-allowed" }
                            : undefined
                        }
                      >
                        Call
                      </option>
                    </SelectNative>
                    <Input
                      type="text"
                      {...register(`component.button.buttons.${idx}.text`)}
                      placeholder="Button text"
                      className={`w-full ${
                        buttonType === "COPY_CODE" ? "cursor-not-allowed" : ""
                      }`}
                      maxLength={buttonType === "QUICK_REPLY" ? 20 : undefined}
                      value={
                        buttonType === "COPY_CODE"
                          ? "Copy offer code"
                          : watch(`component.button.buttons.${idx}.text`) ?? ""
                      }
                      readOnly={buttonType === "COPY_CODE"}
                      disabled={buttonType === "COPY_CODE"}
                    />

                    {buttonType === "URL" && (
                      <Input
                        type="url"
                        className="w-full"
                        {...register(`component.button.buttons.${idx}.url`)}
                        placeholder="https://example.com"
                        required
                      />
                    )}
                    {buttonType === "COPY_CODE" && (
                      <Input
                        type="text"
                        className="w-full"
                        {...register(`component.button.buttons.${idx}.example`)}
                        placeholder="Offer code"
                      />
                    )}
                    {buttonType === "PHONE_NUMBER" && (
                      <PhoneInput
                        country={"in"}
                        value={
                          watch(
                            `component.button.buttons.${idx}.phone_number`
                          ) ?? ""
                        }
                        onChange={(value) => {
                          setValue(
                            `component.button.buttons.${idx}.phone_number`,
                            value
                          );
                        }}
                        inputProps={{
                          name: `component.button.buttons.${idx}.phone_number`,
                        }}
                      />
                    )}

                    <button
                      onClick={() => buttonRemove(idx)}
                      className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                      type="button"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
              type="button"
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 `}
              type="submit"
            >
              <FiSave className="inline mr-1" /> Save
            </button>
          </div>
        </form>
      </div>

      {/* Preview Panel - always visible when editor is open */}
      <div className="w-[22vw] h-screen">
        <TemplatePreview template={watch("component")} />
      </div>
    </div>
  );
};

export default TemplateEditor;
