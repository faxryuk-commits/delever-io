import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, ExternalLink } from 'lucide-react'

interface DocumentViewerProps {
  isOpen: boolean
  onClose: () => void
  documentUrl: string
  title: string
}

export function DocumentViewer({ isOpen, onClose, documentUrl, title }: DocumentViewerProps) {
  // Используем Google Docs Viewer для отображения docx файлов
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + documentUrl)}&embedded=true`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 sm:inset-8 lg:inset-16 z-50 flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-lightBlue flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-darkBlue" />
                </div>
                <h2 className="text-lg font-semibold text-brand-darkBlue">{title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-brand-darkBlue/70 hover:text-brand-darkBlue hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Открыть в новой вкладке
                </a>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Document Content */}
            <div className="flex-1 bg-gray-100">
              <iframe
                src={viewerUrl}
                className="w-full h-full border-0"
                title={title}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Хук для управления просмотром документов
export function useDocumentViewer() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDoc, setCurrentDoc] = useState({ url: '', title: '' })

  const openDocument = (url: string, title: string) => {
    setCurrentDoc({ url, title })
    setIsOpen(true)
  }

  const closeDocument = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    currentDoc,
    openDocument,
    closeDocument
  }
}

