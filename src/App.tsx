import { useState } from 'react'
import { Upload, FileText, RotateCcw } from 'lucide-react'

import { TextArea } from './components/TextArea'
import { ImagePreview } from './components/ImagePreview'
import { extractText } from './extractText'


function App() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [newExtractedText, setNewExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExtractTextFromImage = async () => {
    if(!currentImage) return;
  
    setIsExtracting(true);
    const result = await extractText(currentImage);
  
    if(result.text.length > 0) {
      setNewExtractedText(result.text);
    }
    setIsExtracting(false);
  }

  const handleRestart = () => {
    setIsExtracting(false);
    setNewExtractedText('');
    setCurrentImage(null);
  }
  

  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Image Text Extractor</h1>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <label className='w-1/2 bg-black text-white rounded-md px-6 py-2 flex-row flex justify-center cursor-pointer'>
            <Upload className='mr-2 h-6 w-4' />
            Upload Image
            <input
              type='file'
              className="hidden"
              accept='image/*'
              onChange={handleImageUpload}
            />
          </label>
          <button
            className='w-1/2 bg-black text-white rounded-md px-6 py-2 flex-row flex justify-center cursor-pointer'
            onClick={handleExtractTextFromImage}
          >
            <FileText className="mr-2 h-6 w-4" />
            {isExtracting ? 'Extracting...' : 'Extract Text'}
          </button>
        </div>
        {
          currentImage && (
            <ImagePreview currentImage={currentImage} />
          )
        }
        <div className='flex flex-col'>
          <h3 className='text-black text-xl font-medium mb-6'>Extracted Text</h3>
          <TextArea text={newExtractedText} />
        </div>
        <button
            className='w-1/2 bg-black text-white rounded-md px-6 py-2 flex-row flex justify-center cursor-pointer mx-auto'
            onClick={handleRestart}
          >
            <RotateCcw  className='mr-2 h-6 w-4'/>
            Restart
          </button>
      </div>
    </main>
  )
}

export default App
