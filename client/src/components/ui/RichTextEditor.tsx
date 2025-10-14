'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, FormHelperText, Paper, IconButton, Divider } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Undo,
  Redo
} from '@mui/icons-material';

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  height?: number;
  required?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText,
  placeholder,
  height = 200,
  required = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isToolbarActive, setIsToolbarActive] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // Initialize content
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  // Handle formatting commands
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateToolbarState();
    handleInput();
  };

  // Update toolbar state based on current selection
  const updateToolbarState = () => {
    setIsToolbarActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  // Handle selection change
  const handleSelectionChange = () => {
    updateToolbarState();
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          mb: 1, 
          fontWeight: 500,
          color: error ? 'error.main' : 'text.primary'
        }}
      >
        {label} {required && <span style={{ color: '#f44336' }}>*</span>}
      </Typography>
      
      <Paper 
        variant="outlined" 
        sx={{ 
          border: error ? '1px solid #f44336' : '1px solid #e0e0e0',
          '&:hover': {
            borderColor: error ? '#f44336' : '#1976d2'
          }
        }}
      >
        {/* Toolbar */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5, 
          p: 1, 
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#f5f5f5',
          flexWrap: 'wrap'
        }}>
          <IconButton
            size="small"
            onClick={() => execCommand('bold')}
            sx={{ color: isToolbarActive.bold ? 'primary.main' : 'text.secondary' }}
          >
            <FormatBold fontSize="small" />
          </IconButton>
          
          <IconButton
            size="small"
            onClick={() => execCommand('italic')}
            sx={{ color: isToolbarActive.italic ? 'primary.main' : 'text.secondary' }}
          >
            <FormatItalic fontSize="small" />
          </IconButton>
          
          <IconButton
            size="small"
            onClick={() => execCommand('underline')}
            sx={{ color: isToolbarActive.underline ? 'primary.main' : 'text.secondary' }}
          >
            <FormatUnderlined fontSize="small" />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <IconButton
            size="small"
            onClick={() => execCommand('insertUnorderedList')}
          >
            <FormatListBulleted fontSize="small" />
          </IconButton>
          
          <IconButton
            size="small"
            onClick={() => execCommand('insertOrderedList')}
          >
            <FormatListNumbered fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => execCommand('formatBlock', 'blockquote')}
          >
            <FormatQuote fontSize="small" />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

          <IconButton
            size="small"
            onClick={() => execCommand('undo')}
          >
            <Undo fontSize="small" />
          </IconButton>
          
          <IconButton
            size="small"
            onClick={() => execCommand('redo')}
          >
            <Redo fontSize="small" />
          </IconButton>
        </Box>

        {/* Editor */}
        <Box sx={{ position: 'relative' }}>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onMouseUp={updateToolbarState}
            onKeyUp={updateToolbarState}
            style={{
              minHeight: `${height}px`,
              padding: '12px',
              outline: 'none',
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'Roboto, sans-serif',
            }}
            suppressContentEditableWarning={true}
          />
          
          {(!value || value === '') && (
            <Box
              sx={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                color: '#9e9e9e',
                fontSize: '14px',
                pointerEvents: 'none',
              }}
            >
              {placeholder || `Enter ${label.toLowerCase()}...`}
            </Box>
          )}
        </Box>
      </Paper>
      
      {helperText && (
        <FormHelperText error={error} sx={{ mt: 1, ml: 0 }}>
          {helperText}
        </FormHelperText>
      )}

      <style jsx global>{`
        div[contenteditable] p {
          margin: 0 0 8px 0;
        }
        div[contenteditable] blockquote {
          margin: 16px 0;
          padding-left: 16px;
          border-left: 4px solid #1976d2;
          background-color: #f5f5f5;
          font-style: italic;
        }
        div[contenteditable] h1 {
          font-size: 2rem;
          font-weight: 600;
          margin: 16px 0 8px 0;
          color: #1976d2;
        }
        div[contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 14px 0 6px 0;
          color: #1976d2;
        }
        div[contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 12px 0 4px 0;
          color: #1976d2;
        }
        div[contenteditable] ul,
        div[contenteditable] ol {
          margin: 8px 0;
          padding-left: 24px;
        }
        div[contenteditable] li {
          margin: 4px 0;
        }
        div[contenteditable] strong {
          font-weight: bold;
        }
        div[contenteditable] em {
          font-style: italic;
        }
        div[contenteditable] u {
          text-decoration: underline;
        }
      `}</style>
    </Box>
  );
};

export default RichTextEditor;
