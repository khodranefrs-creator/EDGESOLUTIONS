"use client";

import { useEffect, useRef, useState } from "react";
import { capabilities, company } from "@/lib/site";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirement: string;
  message: string;
};

const initialFields: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  requirement: "general",
  message: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }
  if (!fields.message.trim()) {
    errors.message = "Tell us briefly what you need.";
  }
  return errors;
}

const inputId = (field: keyof Fields) => `contact-${field}`;

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"editing" | "opening" | "opened">(
    "editing",
  );
  const formRef = useRef<HTMLFormElement>(null);

  // deep link support: /contact?capability=fiber-optic preselects the
  // requirement without suspending prerender (no useSearchParams)
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      "capability",
    );
    if (!requested) return;
    if (capabilities.some((cap) => cap.id === requested)) {
      setFields((f) => ({ ...f, requirement: requested }));
    }
  }, []);

  const setField =
    (key: keyof Fields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // honeypot: silently accept bot submissions without opening mail
    const honeypot = formRef.current?.querySelector<HTMLInputElement>(
      'input[name="company-website"]',
    );
    if (honeypot?.value) return;

    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      document.getElementById(inputId(firstInvalid as keyof Fields))?.focus();
      return;
    }

    /* ------------------------------------------------------------------
       FRONTEND INTEGRATION POINT
       No backend exists yet. The validated inquiry is handed to the
       visitor's own mail client below. To connect a real endpoint,
       replace the mailto block with a POST of `fields` to an API route.
    ------------------------------------------------------------------ */
    const subject = encodeURIComponent(
      `Quote Request — ${fields.requirement === "general" ? "General Inquiry" : fields.requirement}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${fields.name}`,
        `Company: ${fields.company || "—"}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone || "—"}`,
        `Requirement: ${fields.requirement}`,
        "",
        fields.message,
      ].join("\n"),
    );
    setStatus("opening");
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("opened"), 600);
  }

  if (status === "opened") {
    return (
      <div className="reg-corners border border-line-strong bg-surface p-8 md:p-10">
        <p className="label-mono text-accent">Inquiry prepared</p>
        <h2 className="type-display-m mt-5 !text-[1.7rem]">
          Your email draft is ready to&nbsp;send.
        </h2>
        <p className="type-body mt-5 text-fg-muted">
          We&rsquo;ve opened your email application with the details you
          entered pre-filled — review it and press send, and your inquiry will
          be on its way to our team.
        </p>
        <p className="type-body mt-4 text-fg-muted">
          If your email client didn&rsquo;t open, write to us directly at{" "}
          <a
            href={`mailto:${company.email}`}
            className="link-quiet !text-accent"
          >
            {company.email}
          </a>{" "}
          or call{" "}
          <a href={`tel:${company.phoneHref}`} className="link-quiet !text-accent">
            {company.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setFields(initialFields);
            setErrors({});
            setStatus("editing");
          }}
          className="btn btn-ghost mt-9"
        >
          Start another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="form-status"
      className="reg-corners border border-line-strong bg-surface p-6 sm:p-8 md:p-10"
    >
      {/* honeypot */}
      <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label>
          Company website
          <input type="text" name="company-website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name *"
          id={inputId("name")}
          value={fields.name}
          onChange={setField("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Company"
          id={inputId("company")}
          value={fields.company}
          onChange={setField("company")}
          autoComplete="organization"
        />
        <Field
          label="Email *"
          id={inputId("email")}
          type="email"
          value={fields.email}
          onChange={setField("email")}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone"
          id={inputId("phone")}
          type="tel"
          value={fields.phone}
          onChange={setField("phone")}
          autoComplete="tel"
        />
      </div>

      <div className="mt-6">
        <label htmlFor={inputId("requirement")} className="label-mono mb-2 block text-fg-muted">
          Project / Requirement
        </label>
        <select
          id={inputId("requirement")}
          value={fields.requirement}
          onChange={setField("requirement")}
          className="field-input"
        >
          <option value="general">General Inquiry</option>
          {capabilities.map((cap) => (
            <option key={cap.id} value={cap.id}>
              {cap.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor={inputId("message")} className="label-mono mb-2 block text-fg-muted">
          Message *
        </label>
        <textarea
          id={inputId("message")}
          rows={6}
          value={fields.message}
          onChange={setField("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${inputId("message")}-error` : undefined}
          placeholder="Describe your application, requirements, volumes, or timelines."
          className="field-input resize-y"
        />
        {errors.message ? (
          <p id={`${inputId("message")}-error`} className="mt-2 text-sm text-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <p id="form-status" role="status" aria-live="polite" className="sr-only">
        {status === "opening" ? "Opening your email application." : ""}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-5">
        <button type="submit" disabled={status === "opening"} className="btn btn-primary disabled:opacity-60">
          {status === "opening" ? "Preparing…" : "Send Inquiry"}
        </button>
        <p className="text-xs leading-relaxed text-fg-faint">
          Submitting opens a pre-filled email draft to {company.email}.
          <br />
          Your details are not stored by this website.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-mono mb-2 block text-fg-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field-input"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
