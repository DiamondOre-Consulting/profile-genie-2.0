import mongoose, { Schema } from "mongoose";

const headerSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      default: "HEADER",
    },
    format: {
      type: String,
      required: true,
      enum: ["TEXT", "IMAGE", "DOCUMENT", "VIDEO", "NONE"],
      default: "NONE",
    },
    text: {
      type: String,
      required: function () {
        return this.format === "TEXT";
      },
    },
    media_id: {
      type: String,
      required: function () {
        return this.format !== "TEXT" || this.format !== "NONE";
      },
    },
    media_url: {
      type: String,
      required: function () {
        return this.format !== "TEXT" || this.format !== "NONE";
      },
    },
    example: {
      header_handle: {
        type: [String],
        required: function () {
          return this.format !== "TEXT" || this.format !== "NONE";
        },
      },
      header_text: {
        type: String,
        required: function () {
          return this.format === "TEXT";
        },
      },
      header_text_named_params: [
        {
          param_name: {
            type: String,
          },
          example: {
            type: String,
          },
        },
      ],
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const bodySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      default: "BODY",
    },
    text: {
      type: String,
    },
    add_security_recommendation: {
      type: Boolean,
    },
    example: {
      body_text: {
        type: [String],
      },
      body_handle: {
        type: [String],
      },
      body_text_named_params: [
        {
          param_name: {
            type: String,
          },
          example: {
            type: String,
          },
        },
      ],
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const footerSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      default: "FOOTER",
    },
    text: {
      type: String,
    },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const buttonsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      default: "BUTTONS",
    },
    code_expiration_minutes: {
      type: Number,
    },
    buttons: [
      {
        otp_type: {
          type: String,
          enum: ["ONE_TAP", "COPY_CODE"],
        },
        autofill_text: {
          type: String,
        },
        text: {
          type: String,
        },
        url: {
          type: String,
        },
        type: {
          type: String,
          enum: ["QUICK_REPLY", "URL", "PHONE_NUMBER", "COPY_CODE"],
        },
        phone_number: {
          type: String,
        },
        example: {
          type: String,
        },
        package_name: {
          type: String,
        },
        signature_hash: {
          type: String,
        },
      },
    ],
  },
  {
    _id: false,
    timestamps: false,
  }
);

const templateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    category: {
      type: String,
      enum: ["MARKETING", "AUTHENTICATION", "UTILITY"],
      required: true,
      minlength: 1,
    },
    language: {
      type: String,
      required: true,
      minlength: 1,
    },
    validity_period: {
      type: Number,
      min: 60,
      max: 86400,
    },
    component: {
      header: headerSchema,
      body: bodySchema,
      footer: footerSchema,
      button: buttonsSchema,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PENDING", "APPROVED", "REJECTED"],
      default: "DRAFT",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rejectionReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Template", templateSchema);
