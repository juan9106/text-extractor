type TextAreaProps = {
    text: string
}

export const TextArea = ({ text }: TextAreaProps) => {
  return (
    <textarea readOnly className="border border-gray-400 rounded-md min-h-40 focus:ring focus:ring-blue-500" value={text}>
    </textarea>
  )
}
