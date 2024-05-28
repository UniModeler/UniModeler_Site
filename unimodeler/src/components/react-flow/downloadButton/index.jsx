import { useReactFlow, getNodesBounds, getViewportForBounds } from 'reactflow';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
  const a = document.createElement('a');

  a.setAttribute('download', 'schema.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 3072;
const imageHeight = 2304;

function DownloadButton({ children }) {
  const { getNodes } = useReactFlow();

  async function onClick() {
    try {
      const nodesBounds = getNodesBounds(getNodes());
      const transform = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

      let url = await toPng(document.querySelector('.react-flow__viewport'), {
        backgroundColor: '#333333',
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth,
          height: imageHeight,
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
        },
      })

      downloadImage(url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button className="download-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default DownloadButton;