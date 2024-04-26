export type File = {
  name: string,
  text: string | null,
}

/**
 * Opens a file using a browser open-file dialog window.
 */
export const openFile = async (accept = '*'): Promise<File> => {
  return await new Promise<File>(resolve => {
    const element = document.createElement('div')
    element.innerHTML = `<input type="file" accept=${accept}>`
    const fileInput = element.firstChild
    // @ts-expect-error - cannot be null
    fileInput.addEventListener('change', function () {
      // @ts-expect-error - cannot be null
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      const file = fileInput.files[0]
      const reader = new FileReader()
      reader.onload = function () {
        // @ts-expect-error - result set as string
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
        resolve({ name: file.name, text: reader.result })
      }
      reader.readAsText(file)
    })
    // @ts-expect-error - cannot be null
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fileInput.click()
  })
}
