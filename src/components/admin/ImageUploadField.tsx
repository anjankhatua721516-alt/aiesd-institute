import React, { useRef, useState } from 'react';
import { dbService } from '../../services/db';
import { Upload, Link2, Check, RefreshCw, Eye, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  placeholder = 'https://images.unsplash.com/... or paste image URL',
  helperText,
  aspectRatio = 'auto',
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [previewError, setPreviewError] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error
    setUploadError(null);
    setIsUploading(true);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file (PNG, JPG, WebP, etc.).');
      }

      // Optimize and compress through dbService (converts to WebP, auto-scales)
      const uploadedItem = await dbService.uploadImage(file);
      onChange(uploadedItem.url);
      setPreviewError(false);
    } catch (err: any) {
      setUploadError(err.message || 'Image processing failed.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      default:
        return 'h-24';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#18181b] flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-rose-500">*</span>}
        </label>

        {!disabled && (
          <div className="flex items-center bg-[#f4f4f5] p-0.5 rounded-full border border-[#e4e4e7] text-[10px]">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-[#18181b] shadow-xs'
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-2.5 py-0.5 rounded-full font-medium transition-all ${
                activeTab === 'url'
                  ? 'bg-white text-[#18181b] shadow-xs'
                  : 'text-[#71717a] hover:text-[#18181b]'
              }`}
            >
              Direct URL
            </button>
          </div>
        )}
      </div>

      {/* Main Upload Box & Preview */}
      <div className="space-y-2">
        {/* Upload File Zone */}
        {activeTab === 'upload' && !disabled && (
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`relative rounded-[18px] border-2 border-dashed border-[#e4e4e7] hover:border-[#18181b]/50 bg-[#fafafa] hover:bg-white p-4 transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
              isUploading ? 'opacity-60 pointer-events-none' : ''
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={disabled || isUploading}
            />

            {isUploading ? (
              <div className="flex flex-col items-center gap-1.5 py-2">
                <RefreshCw className="w-5 h-5 text-[#18181b] animate-spin" />
                <span className="text-xs font-semibold text-[#18181b]">
                  Optimizing &amp; Compressing to WebP...
                </span>
                <span className="text-[10px] text-[#71717a]">
                  Resizing and storing local asset
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 py-1">
                <div className="w-8 h-8 rounded-full bg-white border border-[#e4e4e7] flex items-center justify-center text-[#18181b] group-hover:scale-105 transition-transform shadow-2xs">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-xs text-[#18181b] font-semibold mt-1">
                  Click to select photo or drag and drop
                </div>
                <div className="text-[10px] text-[#71717a]">
                  PNG, JPG, WebP, SVG • Automatically compressed
                </div>
              </div>
            )}
          </div>
        )}

        {/* Direct URL Input */}
        {(activeTab === 'url' || disabled) && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71717a]">
              <Link2 className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              disabled={disabled}
              value={value || ''}
              onChange={(e) => {
                onChange(e.target.value);
                setPreviewError(false);
              }}
              placeholder={placeholder}
              className="awesomic-input text-xs pl-8 font-mono"
            />
          </div>
        )}

        {/* Error message */}
        {uploadError && (
          <p className="text-[11px] text-rose-600 font-medium">{uploadError}</p>
        )}

        {/* Current Image Preview & Details */}
        {value ? (
          <div className="flex items-center gap-3 p-2.5 rounded-[16px] bg-[#f4f4f5]/70 border border-[#e4e4e7]">
            <div className="relative w-14 h-14 rounded-[12px] overflow-hidden bg-white border border-[#e4e4e7] shrink-0">
              {!previewError ? (
                <img
                  src={value}
                  alt={label}
                  onError={() => setPreviewError(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#71717a] bg-[#f4f4f5] p-1">
                  <ImageIcon className="w-4 h-4 text-[#a1a1aa]" />
                  <span className="text-[8px] text-center mt-0.5">Bad URL</span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-[#18181b] truncate">
                  Current Image Selected
                </span>
                {value.startsWith('data:image') && (
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                    Uploaded WebP
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#71717a] font-mono truncate max-w-xs">
                {value}
              </p>
            </div>

            {!disabled && (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setPreviewError(false);
                }}
                className="p-1.5 text-[#71717a] hover:text-rose-600 rounded-full hover:bg-white transition-colors shrink-0"
                title="Remove image"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : null}

        {/* Helper text */}
        {helperText && (
          <p className="text-[11px] text-[#71717a]">{helperText}</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploadField;
