# Advanced Audio Player Components

This directory contains advanced audio player components with real-time transcript synchronization, multi-language support, and interactive features.

## Components

### 1. AudioPlayer
A feature-rich audio player with basic HTML5 audio controls and transcript synchronization.

**Features:**
- HTML5 audio playback controls
- Real-time transcript highlighting
- Multi-language transcript support
- Interactive transcript navigation
- Custom progress bar with seeking
- Volume and playback speed controls
- Share functionality

### 2. WaveformAudioPlayer
An enhanced audio player with waveform visualization using WaveSurfer.js.

**Features:**
- Waveform visualization
- All AudioPlayer features
- Enhanced audio visualization
- Better seeking experience
- Audio analysis capabilities

## Usage

### Basic AudioPlayer

```tsx
import AudioPlayer from '@/components/ui/media/AudioPlayer';
import { TranscriptLanguage } from '@/data/sampleTranscripts';

const transcripts: TranscriptLanguage[] = [
  {
    code: 'en',
    name: 'English',
    segments: [
      {
        id: '1',
        startTime: 0,
        endTime: 5.2,
        text: "Welcome to our podcast...",
        speaker: 'Host'
      }
      // ... more segments
    ]
  }
];

function MyComponent() {
  return (
    <AudioPlayer
      audioSrc="/audio/sample.mp3"
      title="Sample Audio"
      description="This is a sample audio file"
      transcripts={transcripts}
      defaultLanguage="en"
      onLanguageChange={(lang) => console.log('Language changed:', lang)}
      onTimeUpdate={(time) => console.log('Current time:', time)}
    />
  );
}
```

### WaveformAudioPlayer

```tsx
import WaveformAudioPlayer from '@/components/ui/media/WaveformAudioPlayer';

function MyComponent() {
  return (
    <WaveformAudioPlayer
      audioSrc="/audio/sample.mp3"
      title="Sample Audio"
      description="This is a sample audio file"
      transcripts={transcripts}
      defaultLanguage="en"
      waveColor="#e5e7eb"
      progressColor="#3b82f6"
      height={80}
      onLanguageChange={(lang) => console.log('Language changed:', lang)}
      onTimeUpdate={(time) => console.log('Current time:', time)}
    />
  );
}
```

## Props

### AudioPlayer Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `audioSrc` | `string` | Yes | - | URL or path to the audio file |
| `title` | `string` | Yes | - | Title of the audio content |
| `description` | `string` | No | - | Description of the audio content |
| `transcripts` | `TranscriptLanguage[]` | Yes | - | Array of transcript data for different languages |
| `defaultLanguage` | `string` | No | `'en'` | Default language code to display |
| `onLanguageChange` | `(languageCode: string) => void` | No | - | Callback when language changes |
| `onTimeUpdate` | `(currentTime: number) => void` | No | - | Callback when audio time updates |

### WaveformAudioPlayer Additional Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `waveColor` | `string` | No | `'#e5e7eb'` | Color of the waveform |
| `progressColor` | `string` | No | `'#3b82f6'` | Color of the progress indicator |
| `height` | `number` | No | `80` | Height of the waveform in pixels |

## Transcript Data Structure

### TranscriptSegment
```typescript
interface TranscriptSegment {
  id: string;           // Unique identifier for the segment
  startTime: number;    // Start time in seconds
  endTime: number;      // End time in seconds
  text: string;         // Transcript text
  speaker?: string;     // Optional speaker name
}
```

### TranscriptLanguage
```typescript
interface TranscriptLanguage {
  code: string;         // Language code (e.g., 'en', 'es', 'fr')
  name: string;         // Display name (e.g., 'English', 'Spanish')
  segments: TranscriptSegment[];  // Array of transcript segments
}
```

## Features Breakdown

### 1. Audio Controls
- **Play/Pause**: Standard audio playback control
- **Skip Forward/Backward**: 10-second skip functionality
- **Seeking**: Click on progress bar to jump to specific time
- **Volume Control**: Adjustable volume slider
- **Playback Speed**: Multiple speed options (0.5x to 2x)

### 2. Transcript Synchronization
- **Real-time Highlighting**: Currently playing segment is highlighted
- **Auto-scroll**: Transcript automatically scrolls to follow audio
- **Click to Jump**: Click any transcript segment to jump to that time
- **Multi-language Support**: Switch between different language transcripts

### 3. Interactive Features
- **Language Switching**: Dropdown to change transcript language
- **Share Functionality**: Native share API or clipboard fallback
- **Download Option**: Download button for the audio file
- **Responsive Design**: Works on desktop and mobile devices

### 4. Visual Enhancements (WaveformAudioPlayer)
- **Waveform Display**: Visual representation of audio waveform
- **Progress Visualization**: Visual progress indicator on waveform
- **Customizable Colors**: Configurable waveform and progress colors
- **Loading States**: Loading indicators during initialization

## Sample Data

See `src/data/sampleTranscripts.ts` for example transcript data with timing information in English, Spanish, and French.

## Dependencies

### Required Dependencies
- React 18+
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### Additional for WaveformAudioPlayer
- WaveSurfer.js (automatically installed)

## Browser Support

- **AudioPlayer**: All modern browsers with HTML5 audio support
- **WaveformAudioPlayer**: Modern browsers with Web Audio API support

## Performance Considerations

1. **Audio Loading**: Audio files are loaded on demand
2. **Transcript Rendering**: Large transcripts are efficiently rendered with smooth scrolling
3. **Memory Management**: WaveSurfer instances are properly cleaned up
4. **Responsive Design**: Optimized for various screen sizes

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- ARIA labels and roles
- High contrast mode support
- Focus management

## Customization

### Styling
The components use Tailwind CSS classes and can be customized by:
1. Modifying the Tailwind configuration
2. Overriding specific CSS classes
3. Using CSS custom properties

### Functionality
- Extend the component props for additional features
- Add custom event handlers
- Implement additional transcript formats
- Add custom playback controls

## Troubleshooting

### Common Issues

1. **Audio not loading**: Check audio file path and CORS settings
2. **Waveform not displaying**: Ensure WaveSurfer.js is properly installed
3. **Transcript sync issues**: Verify transcript timing data accuracy
4. **Mobile playback issues**: Check browser audio policies

### Debug Mode
Enable console logging to debug transcript synchronization and audio events.

## Future Enhancements

- Subtitle/caption file format support (SRT, VTT)
- Audio visualization spectrum
- Bookmark functionality
- Playlist support
- Offline playback
- Real-time audio transcription
- Audio enhancement filters
- Multi-track audio support

## License

This component is part of the Dr. Syed Quadri client application.
