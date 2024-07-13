import { useRef } from 'react';
import html2canvas from 'html2canvas';

const EditPage = () => {
  const areaRef = useRef<HTMLDivElement>(null);

  const copyAreaToClipboard = async () => {
    if (areaRef.current) {
      try {
        const canvas = await html2canvas(areaRef.current);
        canvas.toBlob(async (blob) => {
          if (blob) {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            alert('Image copied to clipboard!');
          }
        });
      } catch (error) {
        console.error('Failed to copy: ', error);
      }
    }
  };

  return (
    <div>
      <div
        ref={areaRef}
        style={{
          padding: '10px',
          border: '1px solid black',
          marginBottom: '10px',
        }}
      >
        <h1>This is the area to capture</h1>
        <p>Click the button to copy this area as an image to the clipboard.</p>
      </div>
      <button onClick={copyAreaToClipboard}>Copy Area to Clipboard</button>
    </div>
  );
};

export default EditPage;
