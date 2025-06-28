import templateModel from "../../model/waModel/template.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import AppError from "../../utils/error.utils.js";
import axios from "axios";

const createTemplate = asyncHandler(async (req, res) => {
  const { name, category, language, component } = req.body;
  if (!name) {
    throw new AppError("Template name is required", 400);
  }
  if (!category) {
    throw new AppError("Template category is required", 400);
  }
  if (!language) {
    throw new AppError("Template language is required", 400);
  }

  if (component) {
    if (component.header) {
      if (!component.header.format === "TEXT") {
        if (!component.header.text) {
          throw new AppError("Header text is required", 400);
        }
      } else if (
        !component.header.format === "IMAGE" ||
        component.header.format === "DOCUMENT" ||
        component.header.format === "VIDEO"
      ) {
        if (!component.header.media_id && !component.header.media_url) {
          throw new AppError("Header media ID or URL is required", 400);
        }
      }
    }

    if (component.body) {
      if (!component.body.text) {
        throw new AppError("Body text is required", 400);
      } else {
        const variableRegex = /{{(.*?)}}/g;
        const variables = [];
        let match;
        while ((match = variableRegex.exec(component.body.text)) !== null) {
          variables.push(match[1].trim());
        }
        if (variables.length !== 0) {
          if (!component.body.example) {
            throw new AppError(
              "Body example is required when using variables",
              400
            );
          }

          const allNumbers = variables.every((v) => !isNaN(Number(v)));
          const allStrings = variables.every((v) => isNaN(Number(v)));
          if (!allNumbers && !allStrings) {
            throw new AppError(
              "All variables must be of the same type: either all numbers or all strings",
              400
            );
          }

          if (allNumbers) {
            if (
              !Array.isArray(component.body.example.body_text) ||
              component.body.example.body_text.some((val) => isNaN(Number(val)))
            ) {
              throw new AppError(
                "Body example text must be an array of numbers (as string or number) for numeric variables",
                400
              );
            }
            if (component.body.example.body_text.length !== variables.length) {
              throw new AppError(
                "Body example text count does not match the number of variables",
                400
              );
            }
          }

          if (allStrings) {
            if (Array.isArray(component.body.example.body_text_named_params)) {
              if (
                component.body.example.body_text_named_params.length !==
                variables.length
              ) {
                throw new AppError(
                  "Body example named parameters do not match the number of variables",
                  400
                );
              }

              for (const variable of variables) {
                const paramObj =
                  component.body.example.body_text_named_params.find(
                    (p) => p.param_name === variable
                  );
                if (!paramObj) {
                  throw new AppError(
                    `Missing example for variable: ${variable}`,
                    400
                  );
                }
                if (
                  paramObj.example === undefined ||
                  paramObj.example === null ||
                  paramObj.example === ""
                ) {
                  throw new AppError(
                    `Example value is required for variable: ${variable}`,
                    400
                  );
                }
              }
            }
          }
        }
      }
    }

    if (component.button) {
      if (component.button.buttons) {
        component.button.buttons.map((btn, idx) => {
          switch (btn.type) {
            case "QUICK_REPLY":
              if (!btn.text) {
                throw new AppError(
                  `Button ${idx + 1}: Text is required for QUICK_REPLY type`,
                  400
                );
              }
              break;
            case "URL":
              if (!btn.text) {
                throw new AppError(
                  `Button ${idx + 1}: Text is required for URL type`,
                  400
                );
              }
              if (!btn.url) {
                throw new AppError(
                  `Button ${idx + 1}: URL is required for URL type`,
                  400
                );
              }
              break;
            case "PHONE_NUMBER":
              if (!btn.text) {
                throw new AppError(
                  `Button ${idx + 1}: Text is required for PHONE_NUMBER type`,
                  400
                );
              }
              if (!btn.phone_number) {
                throw new AppError(
                  `Button ${
                    idx + 1
                  }: Phone number is required for PHONE_NUMBER type`,
                  400
                );
              }
              break;
            case "COPY_CODE":
              if (!btn.text) {
                throw new AppError(
                  `Button ${idx + 1}: Text is required for COPY_CODE type`,
                  400
                );
              }
              if (!btn.example) {
                throw new AppError(
                  `Button ${idx + 1}: Example is required for COPY_CODE type`,
                  400
                );
              }
              break;
          }
        });
      }
    }
  }

  const metaTemplateComponent = [];

  if (component.header.format === "TEXT") {
    metaTemplateComponent.push({
      type: "HEADER",
      format: "TEXT",
      text: component.header.text,
    });
  } else if (
    component.header.format === "IMAGE" ||
    component.header.format === "VIDEO" ||
    component.header.format === "DOCUMENT"
  ) {
    metaTemplateComponent.push({
      type: "HEADER",
      format: component.header.format,
      media: {
        id: component.header.example.header_handle[0],
      },
      example: {
        header_handle: [component.header.media_url],
      },
    });
  }

  if (component.body.text) {
    let replacedText = component.body.text;
    let varIndex = 1;
    replacedText = replacedText.replace(
      /{{(.*?)}}/g,
      () => `{{${varIndex++}}}`
    );

    metaTemplateComponent.push({
      type: "BODY",
      text: replacedText,
      example: {
        body_text: [
          Array.isArray(component.body.example.body_text_named_params)
            ? component.body.example.body_text_named_params.map(
                (param) => param.example
              )
            : [],
        ],
      },
    });
  }

  if (component.footer.text) {
    metaTemplateComponent.push({
      type: "FOOTER",
      text: component.footer.text,
    });
  }

  if (component.button.buttons.length > 0) {
    metaTemplateComponent.push({
      type: "BUTTONS",
      buttons: component.button.buttons.map((btn) => {
        const buttonObj = {
          type: btn.type,
          text: btn.text,
        };
        if (btn.type === "URL") {
          buttonObj.url = btn.url;
        }
        if (btn.type === "PHONE_NUMBER") {
          buttonObj.phone_number = btn.phone_number;
        }
        if (btn.type === "COPY_CODE") {
          buttonObj.example = btn.example;
        }
        return buttonObj;
      }),
    });
  }

  console.log(metaTemplateComponent);

  // const templateData = {
  //   name,
  //   category,
  //   language,
  //   component,
  //   status: "DRAFT",
  //   createdBy: req.user?._id,
  //   updatedBy: req.user?._id,
  // };

  console.log(metaTemplateComponent);

  const accessToken = process.env.WA_ACCESS_TOKEN; // Replace with your system user token
  const wabaId = process.env.WABA_ID;

  const url = `https://graph.facebook.com/v22.0/${wabaId}/message_templates`;

  const payload = {
    name: name, // Must be lowercase, underscores allowed
    category: category, // or TRANSACTIONAL, or OTP
    language: language,
    components: metaTemplateComponent,
  };

  try {
    console.log(11);

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Template created:", response.data);
  } catch (error) {
    console.error("Error creating template:", error);
    throw new AppError("Failed to create template", 500);
  }

  // const template = await templateModel.create(templateData);

  res.status(201).json({
    success: true,
    message: "Template created successfully",
    data: template,
  });
});

const deleteTemplate = asyncHandler(async (req, res) => {});

const getAllTemplates = asyncHandler(async (req, res) => {});

const getTemplateById = asyncHandler(async (req, res) => {});

export { createTemplate, deleteTemplate, getAllTemplates, getTemplateById };
