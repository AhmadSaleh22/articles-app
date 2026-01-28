"use client"

import React from "react"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  children?: React.ReactNode
}

export function PageHeader({ title, description, primaryAction, children }: PageHeaderProps) {
  return (
    <section className="pt-32 pb-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{description}</p>
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="mt-6 px-6 py-3 bg-[#C9A96E] text-[#332217] font-semibold rounded-lg hover:bg-[#D4B978] transition-colors"
            >
              {primaryAction.label}
            </button>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode
}

export function Input({ leadingIcon, className = "", ...props }: InputProps) {
  return (
    <div className="relative">
      {leadingIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {leadingIcon}
        </div>
      )}
      <input
        {...props}
        className={`w-full bg-[#1A1A1A] border-2 border-white/10 rounded-lg py-3 px-4 ${
          leadingIcon ? "pl-10" : ""
        } text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A96E]/50 transition-colors ${className}`}
      />
    </div>
  )
}

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "compact"
  children: React.ReactNode
}

export function Button({ variant = "primary", size = "default", className = "", children, ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none"
  const sizeClasses = size === "compact" ? "px-3 py-2 text-sm" : "px-6 py-3 text-base"
  const variantClasses = {
    primary: "bg-[#C9A96E] text-[#332217] shadow-[inset_0px_1px_0px_rgba(255,255,255,0.40)] hover:shadow-[inset_0px_8px_16px_rgba(255,255,255,0.40)] active:shadow-[inset_0px_-8px_16px_rgba(255,255,255,0.40)] focus:shadow-[0px_0px_0px_2px_rgba(201,169,110,0.32)] disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-[#333333] text-white border border-white/10 hover:bg-[#404040] focus:shadow-[0px_0px_0px_2px_rgba(255,255,255,0.16)]",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// LinkButton Component
interface LinkButtonProps {
  href: string
  variant?: "primary" | "secondary" | "ghost"
  className?: string
  children: React.ReactNode
}

export function LinkButton({ href, variant = "primary", className = "", children }: LinkButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200"
  const variantClasses = {
    primary: "text-gray-400 hover:text-white",
    secondary: "bg-[#333333] text-white border border-white/10 hover:bg-[#404040] px-4 py-2",
    ghost: "text-gray-400 hover:text-white"
  }

  return (
    <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  )
}

// IconButton Component
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "compact"
  children: React.ReactNode
}

export function IconButton({ variant = "ghost", size = "default", className = "", children, ...props }: IconButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none"
  const sizeClasses = size === "compact" ? "p-1" : "p-2"
  const variantClasses = {
    primary: "bg-[#C9A96E] text-[#332217] hover:bg-[#BD9352]",
    secondary: "bg-[#333333] text-white hover:bg-[#404040]",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`w-full bg-[#1A1A1A] border-2 border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A96E]/50 transition-colors resize-none ${className}`}
    />
  )
}

// Select Component
interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[]
}

export function Select({ options, className = "", ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full bg-[#1A1A1A] border-2 border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C9A96E]/50 transition-colors appearance-none cursor-pointer ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.5rem center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '1.5em 1.5em'
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

// Checkbox Component
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode
}

export function Checkbox({ label, className = "", ...props }: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        {...props}
        className="w-5 h-5 mt-0.5 bg-[#1A1A1A] border-2 border-white/20 rounded text-[#C9A96E] focus:ring-[#C9A96E] focus:ring-offset-0 cursor-pointer"
      />
      {label && <span>{label}</span>}
    </label>
  )
}

// FormField Component
interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  children?: React.ReactNode
  inputProps?: InputProps
  textareaProps?: TextareaProps
  selectProps?: SelectProps
}

export function FormField({ label, required, error, children, inputProps, textareaProps, selectProps }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-white text-sm font-medium">
        {label}
        {required && <span className="text-[#C9A96E] ml-1">*</span>}
      </label>
      {inputProps && <Input {...inputProps} />}
      {textareaProps && <Textarea {...textareaProps} />}
      {selectProps && <Select {...selectProps} />}
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
