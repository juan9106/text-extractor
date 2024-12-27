type ImagePreviewProps = {
    currentImage: string,
}

export const ImagePreview = ({ currentImage }: ImagePreviewProps) => {
  return (
    <div className="p-4">
        <img src={currentImage} alt="new image" className="max-w-full h-auto" />
    </div>
  )
}
